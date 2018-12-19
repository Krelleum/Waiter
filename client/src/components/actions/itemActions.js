export function showItemList() {
    return {
        type: 'SHOW_ITEM_LIST',

    };
}

export function showItemBig(itemname) {
    return {
        type: 'SHOW_ITEM_BIG',
        payload: itemname
    };
}

export function setTotal(amount){
    return {
        type: 'SET_TOTAL',
        payload: amount
    }
}

export function setInitialTotal(amount) {
    return {
        type: 'SET_INITIAL_TOTAL',
        payload: amount
    }
}