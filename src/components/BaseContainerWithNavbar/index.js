import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import ContentFooter from 'components/ContentFooter';
import ContentFooter from 'components/ContentFooterV2';

const BaseContainerWithNavbar = ({
  children,
  withPaddingTop,
  contentPadding,
  withoutPaddingBottom,
  loggedIn,
  home = false,
  user,
  carouselType=null,
  backgroundVideo = true,
}) => {
  return (
    <>
    <div
      className={classNames(
        styles.baseContainer,
        withPaddingTop ? styles.baseContainerWithPaddingTop : null,
        contentPadding ? styles.baseContainerWithContentPadding : null,
        withoutPaddingBottom ? styles.baseContainerWithPaddingBottomZero : null
      )}
    >
      <div className={classNames(styles.headerBackground, loggedIn || !home ? styles.withTransparent : null,
        carouselType && styles.withHalfTransparent,
        carouselType === 'landingpage' && styles.solid,
        carouselType && styles.zIndexheaderBackground
        )}>
      </div>
      {children}
    </div>
    <ContentFooter className={styles.betFooter} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

export default connect(mapStateToProps, null)(BaseContainerWithNavbar);
