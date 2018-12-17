import React, { Component } from 'react';
import './GuestViewFooter.css';



class GuestViewFooter extends Component {
  constructor(props){
    super(props);
    this.state = {
      total: 15.20
    }
  }
  
  
  
  
  
  
  
  render() {
    return (
      <div className='col-md-12 guestviewfooter'>
        <div className='container footercontainer'>
          <div className='footeramount'>
            <p>{this.state.total} €</p>
          </div>

          <div className='footerbutton'>
            <button>Pay</button>
          </div>
        
        
        </div>
      
        
      </div>
    )
  }
}


export default GuestViewFooter;