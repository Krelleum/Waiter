import React, { Component } from 'react';
import './GuestViewFooter.css';

import GuestViewOrder from './GuestViewOrder';


import { connect } from 'react-redux';

class GuestViewFooter extends Component {
    constructor(props){
      super(props);
      this.state = {
        showOrders: false
      }
    }
  
  
  
  toggleOrders(){
   
    if(this.state.showOrders === false){
      this.setState({showOrders: true})
    }
    else if(this.state.showOrders === true){
      this.setState({showOrders: false})
    }
  }
  

  showOrders(){
    if (this.state.showOrders){
      return <GuestViewOrder />
    }
    else if (!this.state.showOrders){
      return null
    }
  }
  
  
  
  render() {
    return (
      <div className='col-md-12 guestviewfooter'>
        <div className='container footercontainer'>
          {this.showOrders()}
          <div className='footeramount'>
            <p>{this.props.item.total.toFixed(2)}€</p>
          </div>

          <div className='footerbutton'>
            <button>Pay</button>
          </div>

          <div className='extendfooterbutton'>
            <button onClick={this.toggleOrders.bind(this)}>Extend</button>
          </div>
        
        </div>
      
        
      </div>
    )
  }
}




// REDUX
const mapStateToProps = (state) => {
  return {
   item: state.item
  }
};

const mapDispatchToProps = (dispatch) => {

  return {

    setTotal: (amount) => {
      dispatch({
        type: 'SET_TOTAL',
        payload: amount
      });
    }
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(GuestViewFooter);

