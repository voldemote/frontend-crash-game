import alertReducer          from '../reducer/alert';
import popupReducer          from '../reducer/popup';
import authenticationReducer from '../reducer/authentication';
import { combineReducers }   from 'redux';
import { connectRouter }     from 'connected-react-router';

export default (history) => combineReducers({
    alert:          alertReducer,
    popup:          popupReducer,
    authentication: authenticationReducer,
    router:         connectRouter(history),
})
