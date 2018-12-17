import React, { Component } from 'react'
import './itemSmall.css'


import axios from 'axios'

class ItemSmall extends Component {
  constructor(props){
    super(props)
  }
  


  componentDidMount(){
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

          console.log(this.state)
        })
        .catch(err => {
          if (err)
            console.log(err)
        })
    }
  }


sendOrder(){
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


addOrderToUser(userid, orderid, itemprice){
  
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
      console.log(response)
      console.log('Order Added to User Account ')


    })
    .catch(err => {
      if (err)
        console.log(err)
      console.log('Unable to add Order to User Account')
    })




}



  render() {
    
    let path =  this.props.data.itemimagepath;
    
    return (
      <div className='col-md-3 itemsmallwrapper'>

        <div className='itemsmallimage'>
          <img src={path} ></img>
        </div>
        
        <div className='itemsmalltitle'>
          <p>{this.props.data.itemname}</p>
        </div>



        <p className='price'>{this.props.data.itemprice} €</p>

        <button className='itemsmallbutton' onClick={this.sendOrder.bind(this)}>Order Now</button>
        
      </div>
    )
  }
}

export default ItemSmall;