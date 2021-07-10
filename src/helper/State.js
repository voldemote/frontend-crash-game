import _ from 'lodash';

class State {
    static getUser (userId, users) {
        const user = _.get(
            users,
            userId,
        );

        return user;
    }
}

export default State;