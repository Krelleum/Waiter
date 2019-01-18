import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuestCartSmall from './GuestCartSmall';

import './GuestViewFooter.css'

import axios from 'axios';






class GuestViewCart extends Component {
  constructor(props){
    super(props);
    
  }
  
  
  

  
  componentWillMount(){
    this.checkToken()
  }
  

  
  // Checks if token is valid and decodes it into state 
  checkToken() {

    var token = localStorage.getItem('token');

    if (token) {

      var body = { token }

      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/checktoken',
        data: body,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {

          this.setState({
            userid: response.data.decoded.userid,
            storeid: response.data.decoded.storeid,
            tableid: response.data.decoded.tableid,

          })


        })
        .catch(err => {
          if (err)
            console.log(err)
        })
    }
  }




  // Creates a new Orders - Iterates over shopping Cart Items in Store, creates a new order for each Element
  //  and adds that new order to the user account.  
  
  sendOrders(store) {
   
    for(var i = 0; i < store.length; i++){ 
      
    let itemname = store[i].itemname;
    let itemprice = store[i].itemprice;

    var userid = this.state.userid;
    var storeid = this.state.storeid;
    var tableid = this.state.tableid;

    var body = {
      userid,
      storeid,
      tableid,
      itemname,
      itemprice,
      status: 'open'
    }


    axios({
      method: 'post',
      url: 'http://localhost:5000/order/createorder',
      data: body,
      header: { 'Content-Type': 'application/json ' },
    })
      .then(response => {
        this.addOrderToUser(response.data.userid, response.data.orderid, itemprice);
        
        console.log('Order Created - Trying to add order to user account')
      })
      .catch(err => {
        if (err)
        console.log(err)
        console.log('Unable to create order')
      })


    }
  }


  // Adds the created order to user session account
  addOrderToUser(userid, orderid, itemprice) {

    var body = {
      userid: userid,
      orderid: orderid,
      itemprice: itemprice,
    }

    axios({
      method: 'patch',
      url: 'http://localhost:5000/user/addordertouser',
      data: body,
      header: { 'Content-Type': 'application/json ' },
    })
      .then(response => {
        this.updateStateOfTotal(itemprice);
        console.log('Order Added to User Account ')
        

      })
      .catch(err => {
        if (err)
          console.log(err)
        console.log('Unable to add Order to User Account')
      })
  }




  updateStateOfTotal(amount) {
    this.props.setTotal(amount)
  }

 



handleClick(){
  if(this.props.item.cart.length > 0){
    this.sendOrders(this.props.item.cart);
    this.handleCartReset()
  }
  
  else{
    alert('no Items in Cart')
  }
}

handleCartReset(){
  this.props.resetCart()
}  
  
  render() {
    
   
    
    return (
      <div>
        <h1>Cart</h1>  
        {this.props.item.cart && this.props.item.cart.map((cartitem, i) => <GuestCartSmall key={i} index={i} data={cartitem}/>)}

        <div className='cartbuttons'>
        
        <button id='sendcartorderbtn' onClick={this.handleClick.bind(this)}>Send Order</button>
        
        <button id='resetcartorderbtn' onClick={this.handleCartReset.bind(this)}>Reset</button>
        </div>
      </div>
    )
  }
}






const mapStateToProps = (state) => {
    return {
        item: state.item
    }
};

const mapDispatchToProps = (dispatch) => {

  return {

    removeFromCart: (index) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: index
      });
    },

    resetCart: () => {
      dispatch({
        type: 'RESET_CART'
      })
    },

    setTotal: (amount) => {
      dispatch({
        type: 'SET_TOTAL',
        payload: amount
      });
    }
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(GuestViewCart);



