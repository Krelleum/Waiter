import React, { Component } from 'react'

import './GuestViewFooter.css'


class GuestOrderSmall extends Component {
  constructor(props){
      super(props)
  }
  
  

  showStatus(){
    if(this.props.data.status === 'awaitpayment'){
      return (
      <div className='guestordersmallstatus guestordersmallstatuspaid'>
        <p>Payment</p>
      </div>
      )
    }
    else if(this.props.data.status === 'confirmed'){
      return (
        <div className='guestordersmallstatus guestordersmallstatusconfirmed'>
          <p>Confirmed</p>
        </div>
      )
    }
    else {
      return (
        <div className='guestordersmallstatus guestordersmallstatusopen'>
          <p>Sent</p>
        </div>
      )
    }
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
          

        {this.showStatus()}


      </div>
    )
  }
}


export default GuestOrderSmall 