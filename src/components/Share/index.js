import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Popup from './popup';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { useIsMount } from '../hoc/useIsMount';
import { shortenerTinyUrl } from '../../api';
import { useHistory, useLocation } from 'react-router';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import { useOutsideClick } from 'hooks/useOutsideClick';

const Share = props => {
  const {
    className,
    shareIconTypes,
    authentication,
    popupPosition,
    directUrl,
  } = props;

  const defaultSharing = ['facebook', 'twitter', 'telegram', 'reddit'];

  const [shortUrl, setShortUrl] = useState();
  const [showPopover, setShowPopover] = useState(false);
  const isMounted = useIsMount();
  const location = useLocation();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');

  let realUrl = new URL(urlOrigin + urlPath);

  if (directUrl) {
    realUrl = new URL(directUrl);
  }

  realUrl.searchParams.set('ref', userId);

  const closeOutside = useOutsideClick(() => {
    setShowPopover(false);
  });

  useEffect(() => {
    (async () => {
      if (isMounted) {
        const shorterUrl = await shortenerTinyUrl(realUrl.toString()).catch(
          err => {
            console.error('[Share shortenerTinyUrl]', err);
          }
        );

        setShortUrl(_.get(shorterUrl, 'response.data', null));
      }
    })();

    return function cleanup() {
      setShortUrl(undefined);
    };
  }, [isMounted]);

  return (
    <div
      ref={closeOutside}
      className={classNames(styles.shareTrigger, className)}
    >
      <div className={styles.ShareButtonContainer}>
        <div
          className={styles.shareButton}
          onClick={e => {
            setShowPopover(show => !show);
          }}
        >
          <div className={styles.shareIcon}>
            <Icon iconType={IconType.shareLink} iconTheme={IconTheme.primary} />
          </div>{' '}
          Share
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            style={{ opacity: showPopover ? 1 : 0 }}
            className={classNames(
              styles.sharePopover,
              styles[`popup-position-${popupPosition}`]
            )}
          >
            <Popup
              shareIconTypes={shareIconTypes || defaultSharing}
              realUrl={realUrl.toString()}
              shortUrl={shortUrl}
              popupPosition={popupPosition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
