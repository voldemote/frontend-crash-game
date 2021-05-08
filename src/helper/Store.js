import _ from 'lodash';

/**
 *
 * @param type
 * @param props
 * @returns {function(...[*]): {type: *}}
 */
export const makeActionCreator = (type, props = {}) => {
    const action = { type, ...props };

    return function (args) {
        _.forOwn(props, (value, key) => {
            if (args[key] !== undefined) {
                action[key] = args[key];
            }
        });

        return action;
    };
};
