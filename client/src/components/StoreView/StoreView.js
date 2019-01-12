import React, { Component } from 'react'
import StoreViewHeader from './StoreViewHeader';
import axios from 'axios';

import StoreViewTable from './StoreViewTable';

class StoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'init',
    }
  }


componentDidMount () { 
  this.checkToken()
  
  
}



  checkToken(){

    var token = localStorage.getItem('token');

    if (token) {

      var body = {
        token
      }

      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/checktoken',
        data: body,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {
          
          
          this.getStore(response.data.decoded.storeid)
          
          console.log('Trying to fetch data - 10 second interval running');
        })
        .catch(err => {
          console.log(err);
          console.log('Error while trying to check token')
        })
    }
  }

  
  // Gets the Store Information by StoreId from Checktoken
  
  getStore(storeid){
    axios({
      method: 'get',
      url: 'http://localhost:5000/store/getstore/' + storeid,
      header: { 'Content-Type': 'application/json ' },
    })
    .then(response => {
      this.setState({ storeid: response.data.storeid, tables: response.data.tables });
    })
    .catch(err => {
      console.log(err);
      console.log('error while getting store by id')
    })
  }


  







 





  renderTables(){
   
    var tables = this.state.tables;
    
    

    
    
    
    if (tables){
      return tables.map((table, i) =>  <StoreViewTable key={i} tableid={table} storeid={this.state.storeid} ></StoreViewTable> )
    }
  
    
    
    
    
    
   
  }













  render() {
    return (
      <div>
        <StoreViewHeader />
        {this.renderTables()}
      </div>
    )
  }
}


export default StoreView;