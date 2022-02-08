import React from 'react';
import styles from './styles.module.scss';
import HotBetBadgeTheme from './HotBetBadgeTheme';
import classNames from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';

const HotBetBadge = ({ className, theme = HotBetBadgeTheme.opacity01, children }) => {
  return (
    <div
      className={classNames(
        styles.hotBetBadge,
        SelectionHelper.get(theme, {
          [HotBetBadgeTheme.opacity01]: styles.hotBetBadge01,
          [HotBetBadgeTheme.opacity04]: styles.hotBetBadge04,
          [HotBetBadgeTheme.opacity05]: styles.hotBetBadge05,
        }),
        className
      )}
    >
      🔥 {children ?? <>Hot Trade</>}
    </div>
  );
};

export default HotBetBadge;
