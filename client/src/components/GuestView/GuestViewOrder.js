import React, { Component } from 'react';
import GuestViewOrdered from './GuestViewOrdered';
import GuestViewCart from './GuestViewCart';


import './GuestViewFooter.css';

 class GuestViewOrder extends Component {
  render() {
    return (
      <div>
        <div className='col-md-5 footerextended'>
            <GuestViewOrdered/>
            
        </div>
        <div className='col-md-5'>
          <GuestViewCart />
        </div>
      </div>
    )
  }
}


export default GuestViewOrder;