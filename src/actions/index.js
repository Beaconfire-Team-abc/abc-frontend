import JsonPlaceHolder from "../apis/JsonPlaceHolder";

export const fetchProfiles = () => async dispatch => {
    const response = await JsonPlaceHolder.get('/hr/profile/');
    // console.log(response);
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_PROFILES',
            payload: response.data.profileSummaryRequests
        }); 
    }
};