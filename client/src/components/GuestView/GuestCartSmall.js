import React, { Component } from 'react';
import { connect } from 'react-redux';

import './GuestViewFooter.css';


class GuestCartSmall extends Component {
    constructor(props) {
        super(props)
    }


    handleRemoval(){
        
        var index = this.props.index;

        this.props.removeFromCart(index)
    }


    render() {
        return (
            <div className='col-md-12 guestcartsmallwrapper'>
               
                <div className='guestcartsmallremovebtn'>
                    <button onClick={this.handleRemoval.bind(this)}>delete</button>
                </div>
               
               
               
                <div className='guestcartsmallname'>
                    <p>{this.props.data.itemname}</p>
                </div>
                

                <div className='guestcartsmallprice'>
                    <p>{this.props.data.itemprice.toFixed(2)}</p>
                </div>
               

                
                
                
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

    return {

        removeFromCart: (i) => {
            dispatch({
                type: 'REMOVE_FROM_CART',
                payload: i
            });
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(GuestCartSmall);