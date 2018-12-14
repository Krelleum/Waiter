
const loginReducer = (state = {
    show:'GuestLogin'
}, action) => {
    
    switch( action.type) {
        case 'CHANGE_TO_GUESTLOGIN':
           return state = {
                ...state,
                show: 'GuestLogin'
            };
            break;
        case 'CHANGE_TO_STORELOGIN':
            return state = {
                ...state,
                show: 'StoreLogin'
            };
            break;
        case 'CHANGE_TO_GUESTVIEW':
           return state = {
                ...state,
                show: 'GuestView'
            };
            break;
        case 'CHANGE_TO_STOREVIEW':
           return state = {
                ...state,
                show: 'StoreView'
            };
            break;
        case 'CHANGE_TO_SETUPVIEW':
            return state = {
                ...state,
                show: 'SetupView'
            };
            break;

        default:
            return state;

    }
    
};


export default loginReducer;