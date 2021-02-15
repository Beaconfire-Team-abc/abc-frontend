export default (state = [], action) => {
    switch (action.type) {
        case 'FECTH_ALL_TIMESHEETS':
            return action.payload;
        default:
            return state;
    }
};