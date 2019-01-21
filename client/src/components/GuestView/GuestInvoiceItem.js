import React, { Component } from 'react'

import './GuestViewInvoice.css';






class GuestInvoiceItem extends Component {
  
  
  
  render() {
    return (
      <div className='guestinvoiceitem'>
            <p id='guestinvoiceitemname'>{this.props.data.itemname}</p>
            <p id='guestinvoiceitemprice'>{this.props.data.itemprice} €</p>
      </div>
    )
  }
}

export default GuestInvoiceItem;