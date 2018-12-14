import React, { Component } from 'react'

import GuestLogin from './Login/GuestLogin';
import StoreLogin from './Login/StoreLogin';
import StoreView from './StoreView/StoreView';
import GuestView from './GuestView/GuestView';

import './LoginContainer.css';

class LoginContainer extends Component {
 constructor(props){
     super(props);
     this.state = {
         show: 'GuestLogin',
     }
 
    }
 

    // Dicides which Components have to be rendered. Either GuestLogin or StoreLogin and afterwards GuestView, StoreView or SetupView

toRender(){
    if(this.state.show === 'GuestLogin'){
        return <GuestLogin/>;
    }
    else if(this.state.show === 'StoreLogin'){
        return <StoreLogin/>
    }
    else if (this.state.show === 'GuestView'){
        return <GuestView/>
    }

    else if (this.state.show === 'StoreView'){
        return <StoreView/>
    }

    else if(this.state.show === 'SetupView'){
        return null;
    }

    else {
        return null;
    }
}




render() {
    return (
      <div>
        {this.toRender()}
      </div>
    )
  }
}



export default LoginContainer;