import React, { Component } from 'react';
import './GuestViewFooter.css';

import axios from 'axios';
import GuestViewOrder from './GuestViewOrder';


import { connect } from 'react-redux';

class GuestViewFooter extends Component {
    constructor(props){
      super(props);
      this.state = {
        showOrders: false,
        payment: false,
      }
    }
  
  
// DECODES TOKEN AND TRIGGERS REQUEST PAYMENT FUNCTION !
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

          this.requestPayment(response.data.decoded.userid)
        })
        .catch(err => {
          if (err)
            console.log(err)
        })
    }
  }


  requestPayment(userid){

    axios({
      method: 'patch',
      url: 'http://localhost:5000/order/requestpayment/' + userid,
      header: { 'Content-Type': 'application/json ' },
    })
      .then(response => {
        console.log(response.data)
        this.setState({payment: true})
      })
      .catch(err => {
        if (err)
          console.log(err)
      })



  }







  
  toggleOrders(){
   
    if(this.state.showOrders === false){
      this.setState({showOrders: true})
    }
    else if(this.state.showOrders === true){
      this.setState({showOrders: false})
    }
  }
  

  showOrders(){
    if (this.state.showOrders){
      return <GuestViewOrder />
    }
    else if (!this.state.showOrders){
      return null
    }
    else if(this.state.payment && this.state.showOrders){
      return (
      <div>
      
      <div><p>Payment Requested</p></div>
      </div>
    )
    }

  }
  
  




  
  render() {
    return (
      <div className='col-md-12 guestviewfooter'>
        <div className='container footercontainer'>
          {this.showOrders()}
          <div className='footeramount'>
            <p>{this.props.item.total.toFixed(2)}€</p>
          </div>

          <div className='footerbutton'>
            <button onClick={this.checkToken.bind(this)}>Pay</button>
          </div>

          <div className='extendfooterbutton'>
            <button onClick={this.toggleOrders.bind(this)}>Extend</button>
          </div>
        
        </div>
      
        
      </div>
    )
  }
}




// REDUX
const mapStateToProps = (state) => {
  return {
   item: state.item
  }
};

const mapDispatchToProps = (dispatch) => {

  return {

    setTotal: (amount) => {
      dispatch({
        type: 'SET_TOTAL',
        payload: amount
      });
    }
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(GuestViewFooter);

