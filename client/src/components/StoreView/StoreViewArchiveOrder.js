import React, { Component } from 'react'


import './StoreViewArchive.css';

 class StoreViewArchiveOrder extends Component {
  render() {
    return (
      <div className='col-md-10 storeviewarchiveorderwrapper'>
            <div className='storeviewarchiveorder archvieorderuserid'>
                <p><span>User: </span> {this.props.data.userid}</p>
            </div>

            <div className='storeviewarchiveorder archvieorderitemname'>
                <p><span>Item: </span> {this.props.data.itemname}</p>
            </div>

            <div className='storeviewarchiveorder archvieorderitemprice'>
                <p><span>Price: </span> {this.props.data.itemprice}</p>
            </div>

            <div className='storeviewarchiveorder archvieordertime'>
                <p><span>Time: </span> {this.props.data.timecreated}</p>
            </div>
    
           
      </div>
    )
  }
}

export default StoreViewArchiveOrder;