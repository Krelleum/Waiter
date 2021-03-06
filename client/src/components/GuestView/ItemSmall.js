import React, { Component } from 'react'
import './itemSmall.css'
import { connect } from 'react-redux';

import axios from 'axios'

class ItemSmall extends Component {
  constructor(props) {
    super(props)

  }



  componentWillMount() {

    this.checkToken()
  }




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

// Creates a new Order
  sendOrder() {
    var itemlistid = this.props.itemlistid;
    var itemname = this.props.data.itemname;
    var itemprice = this.props.data.itemprice;

    var userid = this.state.userid;
    var storeid = this.state.storeid;
    var tableid = this.state.tableid;

    var body = {
      userid,
      storeid,
      tableid,
      itemlistid,
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

        console.log('Order Added to User Account ')
        this.updateStateOfTotal(itemprice)

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


  addItemToCart() {
    var item = {
      itemname: this.props.data.itemname,
      itemprice: this.props.data.itemprice,
    }

    this.props.addToCart(item);

  }


  render() {

    let path = this.props.data.itemimagepath;

    return (
      <div className='col-md-3 itemsmallwrapper'>

        <div className='itemsmallimage'>
          <img src={path} ></img>
        </div>

        <div className='itemsmalltitle'>
          <p>{this.props.data.itemname}</p>
        </div>



        <div className='itemdescription'>
          <p>Our {this.props.data.itemname} is very delicious. All ingredients are from local markets. Order now and get your {this.props.data.itemname} served directly!</p>
        </div>

        <div className='itemprice'>
          <p className='price'>{this.props.data.itemprice.toFixed(2)} €</p>
        </div>


        <div className='itembuttons'>
          <button className='itemsmallbutton' onClick={this.sendOrder.bind(this)}>Order Now</button>
          <button className='itemcartbutton' onClick={this.addItemToCart.bind(this)}>Add to Cart</button>
        </div>


      </div>
    )
  }
}








// REDUX
const mapStateToProps = (state) => {
  return {
    total: state.total
  }
};

const mapDispatchToProps = (dispatch) => {

  return {

    setTotal: (amount) => {
      dispatch({
        type: 'SET_TOTAL',
        payload: amount
      });
    },
    addToCart: (item) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: item,
      });
    }
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ItemSmall);