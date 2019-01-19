import React, { Component } from 'react';

import axios from 'axios';

import './StoreView.css';




class StoreViewTableOrder extends Component {






renderStatus(){
    if(this.props.data.status === 'open'){
        return (
        <div className='col-md-11 storevieworder storevieworderstatusopen'>
            <p className='storevieworderitemname'>{this.props.data.itemname}</p>
            <p className='storevieworderitemprice'>{this.props.data.itemprice.toFixed(2)} €</p>
                <button id='confirmorderbtn' onClick={this.handleConfirmation.bind(this)}>Confirm Order</button>
        </div>)
    }
    else if(this.props.data.status === 'awaitpayment'){
        return (
            <div className='col-md-11 storevieworder storevieworderstatuspayment'>
                <p className='storevieworderitemname' >{this.props.data.itemname}</p>
                <p className='storevieworderitemprice' >{this.props.data.itemprice.toFixed(2)} €</p>
                <button id='confirmpaymentbtn' onClick={this.handleClick.bind(this)}>Confirm Payment</button>
            </div>)
    }
    else{
        return (
            <div className='col-md-11 storevieworder storevieworderstatusclosed'>
                <p className='storevieworderitemname' >{this.props.data.itemname}</p>
                <p className='storevieworderitemprice' >{this.props.data.itemprice.toFixed(2)} €</p>
                <p id='ordersconfirmed'>confirmed</p>
                <button id='confirmpaymentbtn' onClick={this.handleClick.bind(this)}>Payment</button>
                
            </div>)
    }
}







// COPYS ORDER FROM ORDER DB COLLECTION TO ARCHIVE DB COLLECTION

confirmPayment(){
    const userid = this.props.data.userid;
    const orderid = this.props.data.orderid;
    const storeid = this.props.data.storeid;
    const tableid =  this.props.data.tableid;
    const itemname = this.props.data.itemname;
    const itemprice = this.props.data.itemprice;
    
    const body = {
        userid,
        orderid,
        storeid,
        tableid,
        itemname,
        itemprice
    }

    axios({
        method: 'post',
        url: 'http://localhost:5000/archive/sendtoarchive',
        data: body,
        header: { 'Content-Type': 'application/json ' }
    })
    .then(response => {
        
        this.deleteUserOrder(userid, orderid);
        
        console.log('Created Archive Order - Trying to delete Order from User');
    })
    .catch(err => {
        console.log(err)
        console.log('Could not create Order in Archive')
    })

}

// DELTES ORDER FROM USER ACCOUNT ORDER ARRAY
deleteUserOrder(userid, orderid){


    const data = {
        userid,
        orderid
    }

    axios({
        method: 'patch',
        url: 'http://localhost:5000/archive/removeuserorder',
        data: data,
        header: { 'Content-Type': 'application/json ' }
    })
        .then(response => {
            
            this.deleteOrder(orderid, userid)
            console.log('Deleted Order From User  - Trying to delete Order Completely')
        })
        .catch(err => {
            console.log(err)
            console.log('Could not delete Order from User')
        })


}

// DELETES ORDER COMPLETLY

deleteOrder(orderid, userid){
    const body = {
        orderid,
        userid
    }

    axios({
        method: 'patch',
        url: 'http://localhost:5000/archive/deleteorder',
        data: body,
        header: { 'Content-Type': 'application/json ' }
    })
        .then(response => {
            console.log(response)
            console.log('Deleted Order Completely  - Payment process finished')
        })
        .catch(err => {
            console.log(err)
            console.log('Could not Delete Order')
        })
}



// CONFIRMS THAT THE ORDER WAS RECEIVED BY KITCHEN OR WAITER







confirmOrder(){
    var orderid = this.props.data.orderid;

    axios({
        method: 'patch',
        url: 'http://localhost:5000/order/confirmorder/' + orderid,
        header: { 'Content-Type': 'application/json ' }
    })
        .then(response => {
            console.log(response)
            console.log('Changed Orderstatus to confirmed')
        })
        .catch(err => {
            console.log(err)
            console.log('Could not change Orderstatus')
        })

}

    handleClick() {
        this.confirmPayment()
    }


    handleConfirmation() {
        this.confirmOrder()
    }

    render() {
        return (
            <div>{this.renderStatus()}</div>
            
        )
    }
}





export default StoreViewTableOrder