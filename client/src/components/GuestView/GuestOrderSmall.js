import React, { Component } from 'react'

import './GuestViewFooter.css'


class GuestOrderSmall extends Component {
  constructor(props){
      super(props)
  }
  
  
    render() {
    return (
      <div className='col-md-9 guestordersmallwrapper'>
        <div className='guestordersmallname'>
          <p>{this.props.data.itemname}</p>
        </div>
        <div className='guestordersmallprice'>
          <p>{this.props.data.itemprice.toFixed(2)} €</p>
        </div>
          
      </div>
    )
  }
}


export default GuestOrderSmall 