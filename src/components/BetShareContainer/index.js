import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import ShareType from '../BetCard/ShareType';
import styles from './styles.module.scss';
import { FacebookIcon } from 'react-share';
import { TwitterIcon } from 'react-share';
import { WhatsappIcon } from 'react-share';
import { FacebookShareButton } from 'react-share';
import { TwitterShareButton } from 'react-share';
import { WhatsappShareButton } from 'react-share';

const BetShareContainer = ({ className, url, shareIconTypes }) => {
  const renderShareIcon = shareIconType => {
    const parsedUrl = url.replace('localhost', 'wallfair.io');

    switch (shareIconType) {
      // @formatter:off
      case ShareType.facebook:
        return (
          <FacebookShareButton url={parsedUrl}>
            <FacebookIcon />
          </FacebookShareButton>
        );
      case ShareType.twitter:
        return (
          <TwitterShareButton url={parsedUrl}>
            <TwitterIcon />
          </TwitterShareButton>
        );
      case ShareType.whatsapp:
        return (
          <WhatsappShareButton url={parsedUrl}>
            <WhatsappIcon />
          </WhatsappShareButton>
        );
      // @formatter:on
    }
  };

  const renderShareIcons = () => {
    return _.map(shareIconTypes, (shareIconType, index) => (
      <div className={styles.shareIcon} key={index}>
        {renderShareIcon(shareIconType)}
      </div>
    ));
  };

  return (
    <div className={classNames(styles.betShareContainer, className)}>
      <div className={styles.betShareButtons}>{renderShareIcons()}</div>
      <span className={styles.betShareText}>Share</span>
    </div>
  );
};

export default BetShareContainer;
