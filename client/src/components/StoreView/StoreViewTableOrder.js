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
                <button id='confirmpaymentbtn' onClick={this.handleClick.bind(this)}>Confirm Payment</button>
        </div>)
    }
    else{
        return (
            <div className='col-md-11 storevieworder storevieworderstatusclosed'>
                <p className='storevieworderitemname' >{this.props.data.itemname}</p>
                <p className='storevieworderitemprice' >{this.props.data.itemprice.toFixed(2)} €</p>
                <button id='confirmpaymentbtn' onClick={this.handleClick.bind(this)}>Confirm Payment</button>
            </div>)
    }
}




handleClick(){
    this.confirmPayment()
}


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







    render() {
        return (
            <div>{this.renderStatus()}</div>
            
        )
    }
}





export default StoreViewTableOrder