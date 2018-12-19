const itemReducer = (state = {
    show: 'itemlist',
    itemname: 'init',
    total: 0,
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

        default:
            return state;

    }

};


export default itemReducer;