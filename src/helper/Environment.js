class Environment {
    static isDevelopment = () => {
        const href = window.location.href;

        return (
            href.indexOf('staging') > -1 ||
            href.indexOf('localhost') > -1
        );
    };
}

export default Environment;