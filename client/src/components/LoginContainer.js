import React, { Component } from 'react';
import axios from 'axios';



import GuestLogin from './Login/GuestLogin';
import StoreLogin from './Login/StoreLogin';
import StoreView from './StoreView/StoreView';
import GuestView from './GuestView/GuestView';

import loginReducer from './reducers/loginReducer';

import { connect } from 'react-redux';


import './LoginContainer.css';



class LoginContainer extends Component {
   



componentDidMount(){
    this.checkToken();
}

checkToken(){
    
 var token = localStorage.getItem('token');

 if(token){
     
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
         if (response)
            this.props.guestView()
         
     })
     .catch(err => {
         if(err)
             console.log(err)
     })
 }
}



    // Dicides which Components have to be rendered. Either GuestLogin or StoreLogin and afterwards GuestView, StoreView or SetupView

toRender(){
    
   
   

       if (this.props.login.show === 'GuestLogin') {
           return <GuestLogin />;
       }
       else if (this.props.login.show === 'StoreLogin') {
           return <StoreLogin />
       }
       else if (this.props.login.show === 'GuestView') {
           return <GuestView />
       }

       else if (this.props.login.show === 'StoreView') {
           return <StoreView />
       }

       else if (this.props.login.show === 'SetupView') {
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








const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

const mapDispatchToProps = (dispatch) => {
    
    return {
        storeLogin: () => {
            dispatch({
                type: 'CHANGE_TO_STORELOGIN'
            });
        },
        guestView: () => {
            dispatch({
                type: 'CHANGE_TO_GUESTVIEW'
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);