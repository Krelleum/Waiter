import React, { Component } from 'react'




class GuestOrderSmall extends Component {
  constructor(props){
      super(props)
  }
  
  
    render() {
    return (
      <div>
            <p>{this.props.data.itemname}</p>
            <p>{this.props.data.itemprice.toFixed(2)}</p>
      </div>
    )
  }
}


export default GuestOrderSmall 