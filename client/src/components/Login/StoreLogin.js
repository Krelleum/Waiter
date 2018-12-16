import React, { Component } from 'react'
import './StoreLogin.css';

import { connect } from 'react-redux';

import { changeGuestLogin } from '../actions/loginActions';

class StoreLogin extends Component {
  
  

  
  
  
  
    render() {
    return (
      <div>
        
            <div className='storelogincontainer container'>

                <div className='col-md-6 storelogincontainerleft'>
                    <div className='storelogininfo'>
                        <h1>Waiter - Admin</h1>
                        <h2>The best Way to serve!</h2>
                        <p>Login into to your Store Account to manage Orders.</p>
                    </div>
                </div>

                <div className='col-md-6 storelogincontainerright'>
                    <div className='storeloginform'>
                        <form>
                            <input type='text' placeholder='Store ID'></input>
                            <input type='text' placeholder='Username'></input>
                            <input type='text' placeholder='Password'></input>
                            
                            <button>Send</button>
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