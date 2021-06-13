import _ from 'lodash';

export const makeActionCreator = (type, props = {}) => {
    const action = { type, ...props };

    return function (args) {
        if (args) {
            _.forOwn(props, (value, key) => {
                if (args[key] !== undefined) {
                    action[key] = args[key];
                }
            });
        }

        return action;
    };
};
