import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Provider } from 'react-redux';

import store from './redux/store/store';


import LoginCotainer from './components/LoginContainer';



class App extends Component {




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
      <Provider store={store}>
        <LoginCotainer />
      </Provider>
        
      
      

    );
  }
}

export default App;
