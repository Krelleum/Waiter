
const loginReducer = (state = {
    show:'GuestLogin'
}, action) => {
    
    switch( action.type) {
        case 'CHANGE_TO_GUESTLOGIN':
            state = {
                ...state,
                show: 'GuestLogin'
            };
            break;
        case 'CHANGE_TO_STORELOGIN':
            state = {
                ...state,
                show: 'StoreLogin'
            };
            break;
        case 'CHANGE_TO_GUESTVIEW':
            state = {
                ...state,
                show: 'GuestView'
            };
            break;
        case 'CHANGE_TO_STOREVIEW':
            state = {
                ...state,
                show: 'StoreView'
            };
            break;
        case 'CHANGE_TO_SETUPVIEW':
            state = {
                ...state,
                show: 'SetupView'
            };
            break;

        default:
            return state;

    }
    
};


export default loginReducer;