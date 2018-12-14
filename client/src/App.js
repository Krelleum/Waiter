import React, { Component } from 'react';
import './App.css';
import axios from 'axios';




class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      init: 'init',
    }
  }


 componentDidMount(){
   axios({
     method: 'get',
     url: 'http://localhost:5000/testroute/getpost',
     header: {
       'Content-Type': 'application/json',
       }
   })
   .then(result => {
     this.setState({init: result.data});
     console.log(result);
   })
   .catch(err => {
     console.log(err);
   })
 }
 


  render() {

    return (
      <div>
        <h1>Hello World!</h1>
        <p>How Are You?</p>
        <p>{this.state.init.name}</p>
        <p>{this.state.init.age}</p>
      </div>
      

    );
  }
}

export default App;
