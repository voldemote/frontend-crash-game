import CryptoLogo from '../../data/images/ethereum.svg';
import WfairTokenLogo from '../../data/images/logo.png';
import MastercardLogo from '../../data/images/mastercard.png';
import PaymentAction from '../../constants/PaymentAction';
import PaymentProvider from '../../constants/PaymentProvider';
import PayPalLogo from '../../data/images/paypal.svg';
import VisaLogo from '../../data/images/visa.svg';
import WalletCard from '../WalletCard';
import { TOKEN_NAME } from '../../constants/Token';

const WalletPaymentCard = ({ provider, action, onClick }) => {
  const getLogo = () => {
    switch (provider) {
      case PaymentProvider.paypal:
        return (
          <img
            src={PayPalLogo}
            style={{ width: '100%', maxWidth: '25px' }}
            alt={'PayPal'}
          />
        );

      case PaymentProvider.debitCreditCard:
        return (
          <>
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
          </>
        );

      case PaymentProvider.crypto:
        return (
          <img
            src={CryptoLogo}
            style={{ width: '100%', maxWidth: '20px' }}
            alt={'Crypto'}
          />
        );

      case PaymentProvider.wfairToken:
        return (
          <img
            src={WfairTokenLogo}
            style={{ width: '100%', maxWidth: '30px' }}
            alt={`${TOKEN_NAME} Token`}
          />
        );
    }

    return null;
  };

  const getTitle = () => {
    switch (provider) {
      case PaymentProvider.paypal:
        return `Buy ${TOKEN_NAME} tokens with PayPal`;

      case PaymentProvider.debitCreditCard:
        return `Buy ${TOKEN_NAME} tokens with Debit or Credit Card`;

      case PaymentProvider.crypto:
        return `Buy ${TOKEN_NAME} tokens with Cryptocurrencies`;

      case PaymentProvider.wfairToken:
        if (action === PaymentAction.deposit) {
          return `Free ${TOKEN_NAME} Tokens`;
        }

        return `${TOKEN_NAME} Token`;
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

        case PaymentProvider.wfairToken:
          return `Pay with ${TOKEN_NAME} Tokens`;
      }
    } else {
      switch (provider) {
        case PaymentProvider.paypal:
          return 'Withdraw to PayPal';

        case PaymentProvider.debitCreditCard:
          return 'Withdraw to your debit or credit card';

        case PaymentProvider.crypto:
          return 'Withdraw to other cryptocurrencies';

        case PaymentProvider.wfairToken:
          return `Withdraw in ${TOKEN_NAME} Tokens`;
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

        case PaymentProvider.wfairToken:
          return `Pay with ${TOKEN_NAME} Tokens`;
      }
    } else {
      switch (provider) {
        case PaymentProvider.paypal:
          return 'Withdraw to PayPal';

        case PaymentProvider.debitCreditCard:
          return 'Withdraw to your debit or credit card';

        case PaymentProvider.crypto:
          return 'Withdraw to other cryptocurrencies';

        case PaymentProvider.wfairToken:
          return `Withdraw in ${TOKEN_NAME} Tokens`;
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
    return true;
  };

  return (
    <WalletCard
      logo={getLogo()}
      title={getTitle()}
      subtitle={getSubtitle()}
      text={getText()}
      buttonText={getButtonText()}
      buttonDisabled={isButtonDisabled()}
      onClick={onClick}
    />
  );
};
export default WalletPaymentCard;
