import alertReducer         from '../reducer/alert';
import authorizationReducer from '../reducer/authorization';
import { combineReducers }  from 'redux';
import { connectRouter }    from 'connected-react-router';

export default (history) => combineReducers({
    alert:         alertReducer,
    authorization: authorizationReducer,
    router:        connectRouter(history),
})
