import styles from './styles.module.scss';

const WalletCard = ({ logo, title, subtitle, text, buttonText, buttonDisabled, onClick }) => {
    return (
        <div className={styles.walletCard}>
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