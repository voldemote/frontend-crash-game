import alertReducer          from '../reducer/alert';
import authenticationReducer from '../reducer/authentication';
import { combineReducers }   from 'redux';
import { connectRouter }     from 'connected-react-router';

export default (history) => combineReducers({
    alert:          alertReducer,
    authentication: authenticationReducer,
    router:         connectRouter(history),
})
