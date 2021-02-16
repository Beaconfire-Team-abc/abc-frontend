
export default (state = [], action) => {
    switch (action.type) {
        case 'FECTH_PROFILE':
            return action.payload;
        default:
            return state;
    }
};