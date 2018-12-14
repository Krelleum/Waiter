import React, { Component } from 'react'
import './GuestLogin.css';


class GuestLogin extends Component {
  render() {
    return (
      <div>
            
            <div className='guestlogincontainer container'>

                <div className='col-md-6 guestlogincontainerleft'>
                    <div className='guestlogininfo'>
                        <h1>Waiter</h1>
                        <h2>The best Way to serve!</h2>
                        <p>Waiter lets you order your Dishes and Drinks Online. Try it Now!</p>
                    </div>
                </div>

                <div className='col-md-6 guestlogincontainerright'>
                    <div className='guestloginform'>
                        <form>
                            <input type='text' placeholder='Store ID'></input>
                            <input type='text' placeholder='Table ID'></input>
                            <button>Send</button>
                        </form>
                    </div>

                    <button>Log Me in As Admin</button>
                </div>


                
            </div>


      </div>
    )
  }
}


export default GuestLogin;