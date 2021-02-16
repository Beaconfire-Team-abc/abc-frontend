export default (state = true, action) => {
    const { type } = action;
    switch (type) {
    case 'FECTH_PROFILE':
        return false;
    default:
        return state;
    }
}