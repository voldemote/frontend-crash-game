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
    home:               '/home',
    logout:             '/logout',
    bet:                '/bet/:eventId?/:betId?',
    privacyPolicy:      '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
    welcome:            '/',
};