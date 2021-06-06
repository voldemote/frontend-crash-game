import Icon      from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType  from '../Icon/IconType';
import Link      from '../Link';
import React     from 'react';
import styles    from './styles.module.scss';

const ScreenWithHeader = ({ title, returnRoute, children }) => {
    return (
        <div className={styles.screenWithHeaderContainer}>
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
                        iconType={IconType.wallet2}
                    />
                    {title}
                </h1>
            </div>
            {children}
        </div>
    );
};

export default ScreenWithHeader;
