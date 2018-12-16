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
    constructor(props){
        super(props);
        this.state = {
            loggedin: false
        }
    }



componentWillMount(){
    this.checkToken();
}

checkToken(){
    
 var token = localStorage.getItem('token');
console.log(token)
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
         if (response){
             this.setState({
                 loggedin:true
             })
         }
         else{
             this.setState({
                 loggedin: false
             })
         }
     })
     .catch(err => {
         if(err)
             this.setState({
                 loggedin: false
             })
     })
 }
}



    // Dicides which Components have to be rendered. Either GuestLogin or StoreLogin and afterwards GuestView, StoreView or SetupView

toRender(){
    
   if(this.state.loggedin === true){
       return <GuestView/>
   }
   else{

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
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);