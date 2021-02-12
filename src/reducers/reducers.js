import { LOAD_USER_SUCCESS } from "../actions/summyActions";

export const user = (state = [], action) =>{
	const {type, payload} = action;
	switch(type){
    case LOAD_USER_SUCCESS:{
        const {user} = payload;
        return user;
    }
    default:
        return state;
	}
}