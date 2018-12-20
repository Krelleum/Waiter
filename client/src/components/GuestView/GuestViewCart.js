import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuestOrderSmall from './GuestOrderSmall';

class GuestViewCart extends Component {
  
  
  
  
  
  
  render() {
    return (
      <div className='col-md-3'>
        <h1>Cart</h1>  
        {this.props.item.cart && this.props.item.cart.map((cartitem, i) => <GuestOrderSmall key={i} data={cartitem}/>)}
      </div>
    )
  }
}






const mapStateToProps = (state) => {
    return {
        item: state.item
    }
};

const mapDispatchToProps = (dispatch) => {

    return null
};




export default connect(mapStateToProps, mapDispatchToProps)(GuestViewCart);



