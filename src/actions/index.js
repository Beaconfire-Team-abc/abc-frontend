import JsonPlaceHolder from "../apis/JsonPlaceHolder";
// todo: change the url later
export const fetchAllTimesheets = () => async dispatch => {
    // console.log(userid)
    const response = await JsonPlaceHolder.get('/timesheet/1');
    dispatch({
        type: 'FECTH_ALL_TIMESHEETS',
        payload: response.data 
    }); 
    
};

// todo: change the url later
export const fetchProfile = () => async dispatch => {
    const response = await JsonPlaceHolder.get('/profile/1');
    if (response.data.serviceStatus.success) {
        dispatch({
            type: 'FECTH_PROFILE',
            payload: response.data.person
        }); 
    }
};

// todo: change the url later
export const postProfile = profile => async dispatch => {

    const body = {
        name: profile.name,
        address: profile.address,
        cellphone: profile.phoneNumber,
        email: profile.email,
        emergencyContacts: [{emergencyContact: true, name: profile.contact1Name, phone: profile.contact1Phone},{emergencyContact: true, name: profile.contact2Name, phone: profile.contact2Phone}]
    }
    const headers = {'Content-Type': 'application/json'};
    await JsonPlaceHolder.post('/profile/update-person/1', body, {headers: headers})

};

