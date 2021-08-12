import classNames from 'classnames';
import styles from './styles.module.scss';

const WalletCard = ({ logo, title, subtitle, text, buttonText, buttonDisabled, onClick, children }) => {
    return (
        <div className={classNames(styles.walletCard, buttonDisabled && styles.walletCardTransparentized)}>
            <div className={styles.content}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {logo}
                </div>
                <strong>
                    {title}
                </strong>
                <small>
                    {subtitle}
                </small>
                <p>
                    {text}
                </p>
                {children}
                <button
                    onClick={onClick}
                    disabled={buttonDisabled}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default WalletCard;