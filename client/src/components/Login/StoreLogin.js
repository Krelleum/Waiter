import React, { Component } from 'react'
import './StoreLogin.css';


import axios from 'axios';

import { connect } from 'react-redux';

import { changeGuestLogin } from '../actions/loginActions';

class StoreLogin extends Component {
  constructor(props){
      super(props);
      this.state = {
          storeid: 'init',
          useremail: 'init',
          userpassword: 'init',
      }
  }
  

    handleInput(e) {
        e.preventDefault();

        var property = e.target.name;
        var value = e.target.value;

        this.setState({
            [property]: value
        });
        
        
    }

   checkLogin(e){
    
       e.preventDefault();

    if(this.state.storeid != 'init' && this.state.useremail != 'init' && this.state.userpassword != 'init'){
        var body = {
            storeid: this.state.storeid,
            useremail: this.state.useremail,
            userpassword: this.state.userpassword
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/store/getstoretoken/',
            data: body,
            header: { ' Content-Type': 'application/json ' } 
        })
        .then(response => {
            localStorage.setItem('token', response.data.token);
        })
        .catch(err => {
            console.log(err),
            console.log('Something went wrong while trying to login to store account!')
        })
    }
    else{
        alert('Please fill all fields of the Login form!')
    }
    
   
    }
  
  
  
    render() {
    return (
      <div>
        
            <div className='storelogincontainer container'>

                <div className='col-md-4 storelogincontainerleft'>
                    <div className='storelogininfo'>
                        <h1><span>W</span>aiter Mangager</h1>
                        <h2>The best Way to serve!</h2>
                        <p>Login into to your Store Account to manage Orders.</p>
                    </div>
                </div>

                <div className='col-md-4 storelogincontainerright'>
                    <div className='storeloginform'>
                        <form>
                            <input type='text' name='storeid' placeholder='Store ID' onChange={this.handleInput.bind(this)}></input>
                            <input type='text' name='useremail' placeholder='Email' onChange={this.handleInput.bind(this)}></input>
                            <input type='text' name='userpassword' placeholder='Password' onChange={this.handleInput.bind(this)}></input>
                            
                            <p onClick={this.checkLogin.bind(this)}>Send</p>
                        </form>
                    </div>

                    <button onClick={() => this.props.showGuestLogin()}>Log me in as Guest!</button>
                </div>



            </div>


      </div>
    )
  }
}


// REDUX 

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        showGuestLogin: () => {
            dispatch(changeGuestLogin())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoreLogin);