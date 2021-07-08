const getRouteWithParameters = function (route, parameterValues) {
    for (const [parameterKey, parameterValue] of Object.entries(parameterValues)) {
        const routeParameterKey = ':' + parameterKey;

        if (route.endsWith(parameterKey) || route.endsWith(parameterKey + '?')) {
            route = route.replace(new RegExp(routeParameterKey + '[\?]?$'), parameterValue);
        }
        route = route.replace(new RegExp(routeParameterKey + '[\?]?\/'), parameterValue + '/');

    }

    return route;
};

export default {
    getRouteWithParameters,
    bet:                '/trade/:eventId?/:betId?',
    betOverview:        '/my-trades',
    home:               '/home',
    logout:             '/logout',
    privacyPolicy:      '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
    wallet:             '/wallet',
    walletConfirmation: '/wallet/:paymentAction/:paymentProvider/success',
    walletDeposit:      '/wallet/deposit/:paymentProvider',
    walletWithdrawal:   '/wallet/withdraw/:paymentProvider',
    welcome:            '/',
};