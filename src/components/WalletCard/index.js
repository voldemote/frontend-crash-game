import styles         from './styles.module.scss';
import CryptoLogo     from '../../data/images/ethereum.svg';
import PayPalLogo     from '../../data/images/paypal.svg';
import VisaLogo       from '../../data/images/visa.svg';
import MastercardLogo from '../../data/images/mastercard.png';

const WalletCard = ({ provider, action }) => {
    return (
        <div className={styles.walletCard}>
            {provider === 'token' &&
            <div className={styles.content}>
                <img
                    src={CryptoLogo}
                    style={{ width: '100%', maxWidth: '20px' }}
                    alt="EVNT Token"
                />
                {action === 'deposit' &&
                <strong>Free EVNT Token</strong>
                }

                {action === 'withdrawal' &&
                <strong>EVNT Token</strong>
                }
                <small>Free</small>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <button onClick={() => alert('Selected')}>Select</button>
            </div>
            }
            {provider === 'crypto' &&
            <div className={styles.content}>
                <img
                    src={CryptoLogo}
                    style={{ width: '100%', maxWidth: '20px' }}
                    alt="Crypto"
                />
                <strong>Crypto Payment</strong>
                <small>Lorem ipsum</small>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <button
                    onClick={() => alert('Selected')}
                    disabled
                >Coming soon
                </button>
            </div>
            }
            {provider === 'paypal' &&
            <div className={styles.content}>
                <img
                    src={PayPalLogo}
                    style={{ width: '100%', maxWidth: '25px' }}
                    alt="PayPal"
                />
                <strong>PayPal</strong>
                <small>Lorem ipsum</small>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <button
                    onClick={() => alert('Selected')}
                    disabled
                >Coming soon
                </button>
            </div>
            }
            {provider === 'card' &&
            <div className={styles.content}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={MastercardLogo}
                        style={{ width: '100%', maxWidth: '30px', marginRight: '0.5rem' }}
                        alt="Mastercard"
                    />
                    <img
                        src={VisaLogo}
                        style={{ width: '100%', maxWidth: '35px' }}
                        alt="Visa"
                    />
                </div>
                {action === 'deposit' &&
                <strong>Debit or Credit Card</strong>
                }

                {action === 'withdrawal' &&
                <strong>Bank Transfer</strong>
                }
                <small>Lorem ipsum</small>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <button
                    onClick={() => alert('Selected')}
                    disabled
                >Coming soon
                </button>
            </div>
            }
        </div>
    );
};

export default WalletCard;