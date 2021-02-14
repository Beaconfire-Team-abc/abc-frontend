export default (state = [], action) => {
    switch (action.type) {
        case 'FECTH_PROFILES':
            return action.payload;
        default:
            return state;
    }
};