import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import timesheetReducer from './timesheetReducer';

export default combineReducers({
    profile: profileReducer,
    timesheets: timesheetReducer
});
