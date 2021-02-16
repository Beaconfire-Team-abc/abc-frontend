import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import timesheetReducer from './timesheetReducer';
import profileIsLoading from './profileIsLoading';

export default combineReducers({
    profile: profileReducer,
    timesheets: timesheetReducer,
    profileIsLoading: profileIsLoading,
});
