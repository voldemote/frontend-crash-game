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

const Share = props => {
  const { className, shareIconTypes, showPopup, authentication } = props;

  const [shortUrl, setShortUrl] = useState();
  const isMounted = useIsMount();
  const location = useLocation();

  const urlOrigin = window.location.origin;
  const urlPath = location.pathname;

  const userId = _.get(authentication, 'userId');
  const username = _.get(authentication, 'username');

  const realUrl = urlOrigin + urlPath;

  useEffect(() => {
    (async () => {
      if (isMounted) {
        const shorterUrl = await shortenerTinyUrl(realUrl).catch(err => {
          console.error('[Share shortenerTinyUrl]', err);
        });

        setShortUrl(_.get(shorterUrl, 'response.data', null));
      }
    })();

    return function cleanup() {
      setShortUrl(undefined);
    };
  }, [isMounted]);

  return (
    <div className={classNames(styles.shareTrigger, className)}>
      <div className={styles.ShareButtonContainer}>
        <div data-for="coming-soon-tooltip" data-tip={'Coming soon'}>
          <div
            className={styles.shareButton}
            onClick={() => {
              showPopup(PopupTheme.share, {
                shareIconTypes,
                realUrl,
                shortUrl,
              });
            }}
          >
            <div className={styles.shareIcon}>
              <Icon
                iconType={IconType.shareLink}
                iconTheme={IconTheme.primary}
              />
            </div>{' '}
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state', state);
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
