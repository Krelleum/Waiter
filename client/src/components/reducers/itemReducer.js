const itemReducer = (state = {
    show: 'itemlist',
    itemname: 'init',
    total: 0,
    cart:[],
}, action) => {

    switch (action.type) {
        case 'SHOW_ITEM_LIST':
            return state = {
                ...state,
                show: 'itemlist'
            };
            break;
        case 'SHOW_ITEM_BIG':
            return state = {
                ...state,
                show: 'itembig',
                itemname: action.payload
            };
            break;
        case 'SET_TOTAL':
            return state = {
                ...state,
                
                total: state.total + action.payload
            };
            break;
        case 'SET_INITIAL_TOTAL':
            return state = {
                ...state,
                total: action.payload
            };
            break;
        case 'ADD_TO_CART':
            return state = {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'REMOVE_FROM_CART':
            return state = {
                ...state,
                cart: state.cart.pull(action.payload)
            }    

        default:
            return state;

    }

};


export default itemReducer;