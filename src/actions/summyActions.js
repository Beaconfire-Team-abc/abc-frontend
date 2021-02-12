
export const LOAD_USER_IN_PROGRESS = 'LOAD_USER_IN_PROGRESS';
export const loadUserInProgress = () => ({
    type: LOAD_USER_IN_PROGRESS,
});

export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const loadUserSuccess = user => ({
    type: LOAD_USER_SUCCESS,
    payload: { user },
});

export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
export const loadUserFailure = () => ({
    type: LOAD_USER_FAILURE,
});