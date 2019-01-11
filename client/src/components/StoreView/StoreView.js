import React, { Component } from 'react'
import StoreViewHeader from './StoreViewHeader';
import axios from 'axios';

import StoreViewTable from './StoreViewTable';

class StoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'init'
    }
  }


componentDidMount () { 
  this.checkToken()
  
  this.interval = setInterval(() => {this.checkToken()}, 10000)
}



  checkToken(){

    var token = localStorage.getItem('token');

    if (token) {

      var body = {
        token
      }

      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/checktoken',
        data: body,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {
          console.log(response)
          this.continiousfetch(response.data.decoded.storeid)
        })
        .catch(err => {
          console.log(err);
          console.log('Error while trying to check token')
        })
    }
  }



  continiousfetch(storeid) {


    axios({
      method: 'get',
      url: 'http://localhost:5000/order/getorderbystore/' + storeid,
      header: { 'Content-Type': 'application/json ' },
    })
      .then(response => {
        console.log(response.data)
        this.setState({ data: response.data });
        console.log('Orders successfully fetched from server!')
      })
      .catch(err => {
        console.log(err);
        console.log('error while fetching orders from server')
      })

  }


  componentWillUnmount(){
    clearInterval(this.interval);
  }


  renderOrders(){
    var data = this.state.data;
    
    if(this.state.data !== 'init'){
      var datareverse = data.reverse();
      return datareverse.map((orderdata, i) => <StoreViewTable key={i} data={orderdata}/>)
    }
  }


  render() {
    return (
      <div>
        <StoreViewHeader />
        {this.renderOrders()}
      </div>
    )
  }
}


export default StoreView;