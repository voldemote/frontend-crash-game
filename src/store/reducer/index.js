import { combineReducers }  from 'redux';
import { connectRouter }    from 'connected-react-router';
import authorizationReducer from '../reducer/authorization';

export default (history) => combineReducers({
    authorization: authorizationReducer,
    router:        connectRouter(history),
})
