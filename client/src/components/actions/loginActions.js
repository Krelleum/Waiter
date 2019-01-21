export function changeStoreLogin(){
    return{
        type:'CHANGE_TO_STORELOGIN',
        
    };
}

export function changeGuestLogin() {
    return {
        type: 'CHANGE_TO_GUESTLOGIN',
        
    };
}

export function changeStoreView() {
    return {
        type: 'CHANGE_TO_STOREVIEW',
        
    };
}

export function changeGuestView() {
    return {
        type: 'CHANGE_TO_GUESTVIEW',
        

    };
}

export function changePaymentView(){
    return {
        type: 'CHANGE_TO_PAYMENTVIEW'
    }
}


export function changeArchiveView(){
    return {
        type: 'CHANGE_TO_STOREARCHIVEVIEW'
    }
}