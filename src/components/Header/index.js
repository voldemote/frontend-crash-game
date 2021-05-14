import React  from 'react';
import styles from './styles.module.scss';

const Header = ({ backgroundImage }) => {
    const getContainerStyle = () => {
        return {
            backgroundImage: 'url("' + backgroundImage + '")',
        };
    };

    return (
        <div
            className={styles.header}
            style={getContainerStyle()}
        >
            <div className={styles.headerOverlay}>
            </div>
        </div>
    );
};

export default Header;