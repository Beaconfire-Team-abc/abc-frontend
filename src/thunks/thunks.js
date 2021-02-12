import { loadUserFailure,
         loadUserSuccess,
         loadUserInProgress,
 } from "../actions/summyActions";



export const loadUser = (userId) => async (dispatch) =>{
    try{
        dispatch(loadUserInProgress());
        const response = await fetch(`http://localhost:8080/user-sheets/${userId}`);
        const user = await response.json();
        dispatch(loadUserSuccess(user));
    }
    catch(e){
        dispatch(loadUserFailure());
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};