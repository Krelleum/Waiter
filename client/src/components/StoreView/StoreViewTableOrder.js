import React, { Component } from 'react';

import axios from 'axios';

import './StoreView.css';




class StoreViewTableOrder extends Component {



renderStatus(){
    if(this.props.data.status === 'open'){
        return (
        <div className='col-md-11 storevieworder storevieworderstatusopen'>
            <p>{this.props.data.itemname}</p>
            <p>{this.props.data.itemprice}</p>
        </div>)
    }
    else{
        return (
            <div className='col-md-11 storevieworder storevieworderstatusclosed'>
                <p>{this.props.data.itemname}</p>
                <p>{this.props.data.itemprice}</p>
            </div>)
    }
}






    render() {
        return (
            <div>{this.renderStatus()}</div>
            
        )
    }
}





export default StoreViewTableOrder