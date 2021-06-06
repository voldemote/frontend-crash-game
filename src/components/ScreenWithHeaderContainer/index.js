import Icon       from '../Icon';
import IconTheme  from '../Icon/IconTheme';
import IconType   from '../Icon/IconType';
import Link       from '../Link';
import React      from 'react';
import styles     from './styles.module.scss';
import classNames from 'classnames';

const ScreenWithHeader = ({ title, subtitle, returnRoute, iconType = IconType.wallet2, fixHeight = true, children }) => {
    return (
        <div
            className={classNames(
                styles.screenWithHeaderContainer,
                fixHeight ? styles.fixHeight : null,
            )}
        >
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <Link
                        to={returnRoute}
                        className={styles.arrowBack}
                    >
                        <span>
                        </span>
                    </Link>
                    <h1 className={styles.headline}>
                        <Icon
                            width={'auto'}
                            iconTheme={IconTheme.primary}
                            iconType={iconType}
                        />
                        {title}
                    </h1>
                </div>
                <span className={styles.subtitle}>
                    {subtitle}
                </span>
            </div>
            {children}
        </div>
    );
};

export default ScreenWithHeader;
