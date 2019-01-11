import React, { Component } from 'react';

import axios from 'axios';






class StoreViewTable extends Component {
  
  
  
  
  
  render() {
    return (
      <div className='col-md-3 storeviewtablewrapper'>
        <h1>Table: {this.props.data.tableid}</h1>
        <p>{this.props.data.itemname}</p>
        <p>{this.props.data.itemprice}</p>
      </div>
    )
  }
}





export default StoreViewTable