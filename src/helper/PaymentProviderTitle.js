import PaymentProvider from '../constants/PaymentProvider';

export const getPaymentProviderTitle = (paymentProvider) => {
    switch (paymentProvider) {
        case PaymentProvider.evntToken:
            return 'EVNT';
            
        case PaymentProvider.crypto:
            return 'Crypto';

        case PaymentProvider.debitCreditCard:
            return 'Debit-/Credit-Card';

        case PaymentProvider.paypal:
            return 'PayPal';
    }

    return null;
};
