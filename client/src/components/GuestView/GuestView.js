import React, { Component } from 'react'
import axios from 'axios';

import GuestViewHeader from './GuestViewHeader';
import ItemContainer from './ItemContainer';
import GuestViewFooter from './GuestViewFooter';



class GuestView extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid: 'init',
      storeid: 'init',
      tableid: 'init',
    }
  }
  
  
  
  componentDidMount(){
    this.checkToken()
  }
  
  
  checkToken() {

    var token = localStorage.getItem('token');

    if (token) {
      
      var body = {token}

      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/checktoken',
        data: body,
        header: { 'Content-Type': 'application/json ' },
      })
        .then(response => {
          
          this.setState({
            userid: response.data.decoded.userid,
            storeid: response.data.decoded.storeid,
            tableid: response.data.decoded.tableid,
            
          })
            
          console.log(this.state)
        })
        .catch(err => {
          if (err)
            console.log(err)
        })
    }
  }

  
  
  showItemContainer(){
    if(this.state.userid != 'init' && this.state.storeid != 'init' && this.state.tableid != 'init')
    {
      return <ItemContainer userid={this.state.userid} storeid={this.state.storeid} tableid={this.state.tableid}/>
    }else{
      return null
    }
    
  }
  
  
  
  
  
  
  
  render() {
    return (
      <div>
        <GuestViewHeader/>
        {this.showItemContainer()}
        <GuestViewFooter/>
      </div>
    )
  }
}


export default GuestView;