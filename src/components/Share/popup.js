import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useIsMount } from '../hoc/useIsMount';
import _ from 'lodash';
import classNames from 'classnames';
import ShareType from './ShareType';
import { FacebookIcon } from 'react-share';
import { TwitterIcon } from 'react-share';
import { TelegramIcon } from 'react-share';
import { RedditIcon } from 'react-share';
import { FacebookShareButton } from 'react-share';
import { TwitterShareButton } from 'react-share';
import { TelegramShareButton } from 'react-share';
import { RedditShareButton } from 'react-share';
import { PopupActions } from '../../store/actions/popup';

import InputBox from '../InputBox';
import InputBoxTheme from '../InputBox/InputBoxTheme';

const SharePopup = props => {
  const { className, shareIconTypes, hidePopup, visible, shortUrl, realUrl } =
    props;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) {
    }
  }, [visible]);

  const renderShareIcon = shareIconType => {
    // const parsedUrl = url.replace('localhost', 'wallfair.io');
    const iconSize = 26;

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton url={realUrl}>
            <FacebookIcon size={iconSize} round={true} />
          </FacebookShareButton>
        );
      case ShareType.twitter:
        return (
          <TwitterShareButton url={realUrl}>
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        );
      case ShareType.telegram:
        return (
          <TelegramShareButton url={realUrl}>
            <TelegramIcon size={iconSize} round={true} />
          </TelegramShareButton>
        );
      case ShareType.reddit:
        return (
          <RedditShareButton url={realUrl}>
            <RedditIcon size={iconSize} round={true} />
          </RedditShareButton>
        );
    }
  };

  const renderShareIcons = () => {
    return _.map(shareIconTypes, (shareIconType, index) => (
      <div className={styles.shareIcon}>{renderShareIcon(shareIconType)}</div>
    ));
  };

  return (
    <div className={classNames(styles.sharePopupContainer, className)}>
      <h3 className={styles.headline}>Share With Your Friends</h3>
      <div className={styles.shareButtons}>
        <div className={styles.shareButtons}>{renderShareIcons()}</div>
      </div>
      <div className={styles.separator}></div>
      <div
        className={copied ? styles.inputContainerCopied : styles.inputContainer}
      >
        <InputBox
          type={'text'}
          value={shortUrl}
          onClick={(e, val) => {
            setCopied(true);
            document.getSelection().removeAllRanges();
          }}
          theme={InputBoxTheme.copyToClipboardInput}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    type: state.popup.popupType,
    visible: state.popup.visible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePopup);
