import alertReducer          from '../reducer/alert';
import betReducer            from '../reducer/bet';
import eventReducer          from '../reducer/event';
import popupReducer          from '../reducer/popup';
import userReducer           from '../reducer/user';
import authenticationReducer from '../reducer/authentication';
import { combineReducers }   from 'redux';
import { connectRouter }     from 'connected-react-router';

export default (history) => combineReducers({
    alert:          alertReducer,
    authentication: authenticationReducer,
    bet:            betReducer,
    event:          eventReducer,
    popup:          popupReducer,
    user:           userReducer,
    router:         connectRouter(history),
})
