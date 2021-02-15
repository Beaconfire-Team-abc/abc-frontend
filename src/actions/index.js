import JsonPlaceHolder from "../apis/JsonPlaceHolder";

// todo: change the url later
export const fetchAllTimesheets = () => async dispatch => {
    const response = await JsonPlaceHolder.get('/hr/profile/');
    // console.log(response.data);
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_ALL_TIMESHEETS',
            payload: response.data.profileSummaryRequests 
        }); 
    }
};

// todo: change the url later
export const fetchProfile = () => async dispatch => {
    const response = await JsonPlaceHolder.get('/employee/profile/2');
    // console.log(response.data);
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_PROFILE',
            payload: response.data.person
        }); 
    }
};