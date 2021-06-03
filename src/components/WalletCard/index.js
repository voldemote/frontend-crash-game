import styles          from './styles.module.scss';
import CryptoLogo      from '../../data/images/ethereum.svg';
import PayPalLogo      from '../../data/images/paypal.svg';
import VisaLogo        from '../../data/images/visa.svg';
import MastercardLogo  from '../../data/images/mastercard.png';
import EvntTokenLogo   from '../../data/images/logo.png';
import PaymentProvider from '../../constants/PaymentProvider';
import PaymentAction   from '../../constants/PaymentAction';

const WalletCard = ({ provider, action, onClick }) => {
          const getLogo = () => {
              switch (provider) {
                  case PaymentProvider.paypal:
                      return <img
                          src={PayPalLogo}
                          style={{ width: '100%', maxWidth: '25px' }}
                          alt={'PayPal'}
                      />;

                  case PaymentProvider.debitCreditCard:
                      return <>
                          <img
                              src={MastercardLogo}
                              style={{ width: '100%', maxWidth: '30px', marginRight: '0.5rem' }}
                              alt={'Mastercard'}
                          />
                          <img
                              src={VisaLogo}
                              style={{ width: '100%', maxWidth: '35px' }}
                              alt={'Visa'}
                          />
                      </>;

                  case PaymentProvider.crypto:
                      return <img
                          src={CryptoLogo}
                          style={{ width: '100%', maxWidth: '20px' }}
                          alt={'Crypto'}
                      />;

                  case PaymentProvider.evntToken:
                      return <img
                          src={EvntTokenLogo}
                          style={{ width: '100%', maxWidth: '30px' }}
                          alt={'EVNT Token'}
                      />;
              }

              return null;
          };

          const getTitle = () => {
              switch (provider) {
                  case PaymentProvider.paypal:
                      return 'PayPal';

                  case PaymentProvider.debitCreditCard:
                      return 'Debit or Credit Card';

                  case PaymentProvider.crypto:
                      return 'Crypto Payment';

                  case PaymentProvider.evntToken:
                      return 'EVNT Token';
              }

              return null;
          };

          const getSubtitle = () => {
              if (action === PaymentAction.deposit) {
                  switch (provider) {
                      case PaymentProvider.paypal:
                          return 'Pay via PayPal';

                      case PaymentProvider.debitCreditCard:
                          return 'Pay with your debit or credit card';

                      case PaymentProvider.crypto:
                          return 'Pay with other cryptocurrencies';

                      case PaymentProvider.evntToken:
                          return 'Pay with EVNT Tokens';
                  }
              } else {
                  switch (provider) {
                      case PaymentProvider.paypal:
                          return 'Withdraw to PayPal';

                      case PaymentProvider.debitCreditCard:
                          return 'Withdraw to your debit or credit card';

                      case PaymentProvider.crypto:
                          return 'Withdraw to other cryptocurrencies';

                      case PaymentProvider.evntToken:
                          return 'Withdraw in EVNT Tokens';
                  }
              }

              return null;
          };

          const getText = () => {
              if (action === PaymentAction.deposit) {
                  switch (provider) {
                      case PaymentProvider.paypal:
                          return 'Pay via PayPal';

                      case PaymentProvider.debitCreditCard:
                          return 'Pay with your debit or credit card';

                      case PaymentProvider.crypto:
                          return 'Pay with other cryptocurrencies';

                      case PaymentProvider.evntToken:
                          return 'Pay with EVNT Tokens';
                  }
              } else {
                  switch (provider) {
                      case PaymentProvider.paypal:
                          return 'Withdraw to PayPal';

                      case PaymentProvider.debitCreditCard:
                          return 'Withdraw to your debit or credit card';

                      case PaymentProvider.crypto:
                          return 'Withdraw to other cryptocurrencies';

                      case PaymentProvider.evntToken:
                          return 'Withdraw in EVNT Tokens';
                  }
              }

              return null;
          };

          const getButtonText = () => {
              if (isButtonDisabled()) {
                  return 'Coming soon';
              }

              return 'Select';
          };

          const isButtonDisabled = () => {
              return provider !== PaymentProvider.evntToken;
          };

          return (
              <div className={styles.walletCard}>
                  <div className={styles.content}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          {getLogo()}
                      </div>
                      <strong>
                          {getTitle()}
                      </strong>
                      <small>
                          {getSubtitle()}
                      </small>
                      <p>
                          {getText()}
                      </p>
                      <button
                          onClick={onClick}
                          disabled={isButtonDisabled()}
                      >
                          {getButtonText()}
                      </button>
                  </div>
              </div>
          );
      }
;

export default WalletCard;