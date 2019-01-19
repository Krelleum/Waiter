import React, { Component } from 'react';

import axios from 'axios';


import './StoreView.css';
import StoreViewTableOrder from  './StoreViewTableOrder';




class StoreViewTable extends Component {
    constructor(props){
      super(props);
      this.state = {
       data: [],
       payment: false,
      }
    }
  
 
  

componentDidMount(){
  this.getOrdersByTable(this.props.storeid, this.props.tableid)
  this.interval = setInterval(() => {this.getOrdersByTable(this.props.storeid, this.props.tableid) }, 200)
  
}

  





  getOrdersByTable(storeid, tableid) {
   

      axios({
        method: 'get',
        url: 'http://localhost:5000/order/getorderbytable/' + storeid + '/' + tableid,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {
          this.setState({ data: response.data });
          

        })
        .catch(err => {
          console.log(err);
          console.log('error while getting store by id')
        })
  

  }


// ITERATES OVER this.state.data TO CREATE ARRAY WITH ALL ORDER STATUSES

createStatusArray(){
  let data =  this.state.data;

  let status = [];

  for (var i = 0; i < this.state.data.length; i++) {
    status.push(data[i].status);
    
  }
  
  return status
}








  // CHECKS THE ORDERSTATUS ARRAY AND RENDERS CONDITIONALLY 
  checkStatus(){
    
    let statusarray = this.createStatusArray();
    
    
      
    if (statusarray.includes('open')) {
      return (
        <div className='tablestatus tablestatusopen'>
          <p>Waiting for Preparation</p>
        </div>
      )
    }    
      else if (statusarray.includes('awaitpayment')) {
        return (
          <div className='tablestatus tablestatuspayment'>
            <p>Waiting for Payment</p>
          </div>
        )
      }
     
      else if (statusarray.includes('confirmed')){
        return(
        <div className='tablestatus tablestatusconfirmed'>
          <p>All Orders Confirmed</p>
        </div>
        )
      } 
    }
    

  




  calculateTotal(){
       
    const data =  this.state.data;
    
    var counter = 0;

    data.forEach(element => {
      counter = counter+ element.itemprice
     
    })
    
    return counter.toFixed(2);
  }



  renderTable(){
    var data = this.state.data
    var reverseddata = data.reverse()

    if(data.length > 0){
      return reverseddata.map((order, i) => {
        return <StoreViewTableOrder key={i} data={order} />
      })
    }
    else{
      return (
      <div className='storeviewtablenoorders'>
        <p>No Orders available </p>
      </div>
    )
    }
     

    
   
    

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
          <h2>Table {this.props.tableid}</h2>
          {this.checkStatus()}
        </div>

        

        <div className='storeviewtableinfo'>
          <p className='storeviewtableinfocount'><span>Order Count </span>{this.state.data.length}</p>
          <p className='storeviewtableinfototal'><span>Total</span> {this.calculateTotal()} €</p>
        </div>
       
        <div className='storeviewtableorderwrapper'>
          {this.renderTable()}
        </div>
        
       
      </div>
    )
  }
}





export default StoreViewTable