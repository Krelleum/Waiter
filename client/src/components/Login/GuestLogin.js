import React, { Component } from 'react'
import './GuestLogin.css';
import axios from 'axios';


import { changeStoreLogin } from '../actions/loginActions';

import { connect } from 'react-redux';



class GuestLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            storeid: 'init',
            tableid: 'init',

        }
    }
  
  
  
  handleInput(e){
      e.preventDefault();

      var property = e.target.name;
      var value = e.target.value;

      this.setState({
          [property]: value
      });

      
  }
  
  
// CHECKS IF STORE EXISTS and passes data to checkTable  

getStore(){
    
    var storeid = this.state.storeid;
    var tableid = this.state.tableid;

    

    if(storeid, tableid != 'init'){
        axios({
            method: 'get',
            url: 'http://localhost:5000/store/getstore/' + storeid,
            header: {' Content-Type' : 'application/json '},
        })
        .then(response => {
            this.checkTable(response.data)
            
        })
        .catch(err => {
            console.log(err)
            alert(err)
        })
    }
    else{
        alert('no input')
    }
}


// Checks if table is available in store and creates a new User
checkTable(data){
    
    
    var tableid = this.state.tableid;
   
    console.log(data);

    console.log(data.tables)

    console.log(tableid)

    if(data.tables.includes(Number(tableid))){
        
        console.log('table is included')

        var body = {
            tableid,
            storeid: data.storeid,
        }
        
        axios({
            method: 'post',
            url:'http://localhost:5000/user/createuser',
            data: body,
            header: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            this.getToken(data.storeid, tableid, response.data.usermongoid) 
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong! Try Again (c:guestLogin fn: checkLogin)')
        })
       
    }
    else{
        console.log('table is not included');
        alert('Something went wrong! Try Again (c:guestLogin fn: checkLogin)')
    }
    
    
}


// If Table is available and store was found getToken tries to get a 3 hour token from server

getToken(storeid, tableid, userid){

    var body = {
        storeid,
        tableid,
        userid
    }
    
    axios({
        method: 'post',
        url: 'http://localhost:5000/store/gettoken',
        data: body,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response =>{
        localStorage.setItem('token', response.data.token)
        
    })
    .catch(err => {
        console.log(err)
        alert('Something went wrong! Try Again (c:guestLogin fn: getToken)')
    })

}








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
                            <input type='text' placeholder='Store ID' name='storeid' onChange={this.handleInput.bind(this)}></input>
                            <input type='text' placeholder='Table ID' name='tableid' onChange={this.handleInput.bind(this)}></input>
                            
                            
                        </form>
                    </div>

                    <button onClick={this.getStore.bind(this)}>Send</button>

                    <button onClick={() => this.props.showStoreLogin()}>Log Me in As Admin</button>
                </div>


                
            </div>


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
        showStoreLogin: () =>{
            dispatch(changeStoreLogin())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (GuestLogin);