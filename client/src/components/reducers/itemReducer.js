const itemReducer = (state = {
    show: 'itemlist',
    itemname: 'init',
    
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
       

        default:
            return state;

    }

};


export default itemReducer;