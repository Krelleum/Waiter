import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import LoginCotainer from './components/LoginContainer';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      init: 'init',
    }
  }


//  componentDidMount(){
//    axios({
//      method: 'get',
//      url: 'http://localhost:5000/testroute/getpost',
//      header: {
//        'Content-Type': 'application/json',
//        }
//    })
//    .then(result => {
//      this.setState({init: result.data});
//      console.log(result);
//    })
//    .catch(err => {
//      console.log(err);
//    })
//  }
 


  render() {

    return (
      <div>
        <LoginCotainer/>
      </div>
      

    );
  }
}

export default App;
