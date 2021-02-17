import JsonPlaceHolder from "../apis/JsonPlaceHolder";

// todo: change the url later
export const fetchAllTimesheets = () => async dispatch => {
    const response = await JsonPlaceHolder.get('/hr/profile/');
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_ALL_TIMESHEETS',
            payload: response.data.profileSummaryRequests 
        }); 
    }
};

// todo: change the url later
export const fetchProfile = (userId) => async dispatch => {
    const response = await JsonPlaceHolder.get('/profile/'+userId);
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_PROFILE',
            payload: response.data.person
        }); 
    }
};

// todo: change the url later
export const postProfile = (profile, userId) => async dispatch => {

    const body = {
        name: profile.name,
        address: profile.address,
        cellphone: profile.phoneNumber,
        email: profile.email,
        emergencyContacts: [{emergencyContact: true, name: profile.contact1Name, phone: profile.contact1Phone},{emergencyContact: true, name: profile.contact2Name, phone: profile.contact2Phone}]
    }
    const headers = {'Content-Type': 'application/json'};
    await JsonPlaceHolder.post('/profile/update-person/' + userId, body, {headers: headers})

};

