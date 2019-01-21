import React, { Component } from 'react'

import GuestInvoiceItem from './GuestInvoiceItem';

import './GuestViewInvoice.css';

class GuestViewInvoice extends Component {
  


  
  render() {
    

    const data = this.props.data
    
    if(data)
    
    return (
        <div className='col-md-3  guestviewinvoicewrapper'>
        <h1>Invoice</h1>
        
        <p>{data[0].timecreated}</p>
        <p>Store: {data[0].storeid}</p>
        <p>Table: {data[0].tableid}</p>
        <p>User: {data[0].userid}</p>

        {data.map((item, i) => <GuestInvoiceItem key={i} data={item}/>)}

      </div>
    )
  }
}


export default GuestViewInvoice;