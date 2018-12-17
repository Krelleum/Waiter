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

