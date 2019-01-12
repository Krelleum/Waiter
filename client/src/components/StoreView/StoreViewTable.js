import React, { Component } from 'react';

import axios from 'axios';


import './StoreView.css';
import StoreViewTableOrder from  './StoreViewTableOrder';




class StoreViewTable extends Component {
    constructor(props){
      super(props);
      this.state = {
       data: []
      }
    }
  
 
  

componentDidMount(){
  this.getOrdersByTable(this.props.storeid, this.props.tableid)
  this.interval = setInterval(() => {this.getOrdersByTable(this.props.storeid, this.props.tableid) }, 10000)
}

  





  getOrdersByTable(storeid, tableid) {
   

      axios({
        method: 'get',
        url: 'http://localhost:5000/order/getorderbytable/' + storeid + '/' + tableid,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {
          this.setState({ data: response.data });
          console.log(this.state.data)

        })
        .catch(err => {
          console.log(err);
          console.log('error while getting store by id')
        })
  

  }




  calculateTotal(){
       
    const data =  this.state.data;

    
    var counter = 0;

    data.forEach(element => {
      counter = counter+ element.itemprice
     
    })
    
    return counter.toFixed(2);
  }



  componentWillUnmount(){
    clearInterval(this.interval);
  }



  
  
  
  
  render() {

    
    var data = this.state.data
    var reverseddata = data.reverse()
    
    
    return (
      <div className='col-md-3 storeviewtablewrapper'>
        <div className='storeviewtableheader'>
          <h2>Table: {this.props.tableid}</h2>
          <p>Order Count: {this.state.data.length}</p>
          <p>Total: {this.calculateTotal()} €</p>
        </div>
       
        <div className='storeviewtableorderwrapper'>
          {reverseddata.map((order, i) => { return <StoreViewTableOrder key={i} data={order} /> })}
        </div>
        
       
      </div>
    )
  }
}





export default StoreViewTable