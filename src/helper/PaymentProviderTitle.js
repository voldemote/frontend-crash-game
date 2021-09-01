import PaymentProvider from '../constants/PaymentProvider';
import { TOKEN_NAME } from '../constants/Token';

export const getPaymentProviderTitle = paymentProvider => {
  switch (paymentProvider) {
    case PaymentProvider.wfairToken:
      return TOKEN_NAME;

    case PaymentProvider.crypto:
      return 'Crypto';

    case PaymentProvider.debitCreditCard:
      return 'Debit-/Credit-Card';

    case PaymentProvider.paypal:
      return 'PayPal';
  }

  return null;
};
