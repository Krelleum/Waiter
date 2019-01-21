import React, { Component } from 'react'

import axios from 'axios'; 

import StoreViewHeader from './StoreViewHeader';
import StoreViewArchiveOrder from './StoreViewArchiveOrder';

import './StoreViewArchive.css';

class StoreViewArchive extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
  
  
  
componentDidMount() {
  this.checkToken()
}


    checkToken() {

        var token = localStorage.getItem('token');

        if (token) {

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
                    this.getLastOrders(response.data.decoded.storeid)
                    
                })
                .catch(err => {
                    console.log(err);
                    console.log('Error while trying to check token')
                })
        }
    }


    getLastOrders(storeid) {
        axios({
            method: 'get',
            url: 'http://localhost:5000/archive/getlastorders/' + storeid,
            header: { 'Content-Type': 'application/json ' },
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    storeid: storeid
                });
                console.log(this.state.data);
            })
            .catch(err => {
                console.log(err);
                console.log('error while getting store by id')
            })
    }


    getOrdersByDate(){
        axios({
            method: 'get',
            url: 'http://localhost:5000/archive/getordersbydate/' + this.state.storeid + '/' + this.state.startDate + '/' +this.state.endDate,
            header: { 'Content-Type': 'application/json ' },
        })
            .then(response => {
                this.setState({ data: response.data });
                console.log(this.state.data);
            })
            .catch(err => {
                console.log(err);
                console.log('error while getting store by id')
            })
    }
  
  

    handleStartDateChange(e){
        
        
        e.preventDefault();
        var startDate = e.target.value ;



        this.setState({
            startDate: startDate
        })

        console.log(this.state.startDate)
    }



    handleEndDateChange(e) {

        var endDate = e.target.value;

        this.setState({
            endDate: endDate
        })

        console.log(this.state.endDate);
    }



    renderOrders(){
        var data = this.state.data;
        if (data){
            
            return this.state.data.map((order, i) => <StoreViewArchiveOrder key={i} data={order} />)
        
        } 
        
        
    }


    render() {

        

    return (
      <div>
        <StoreViewHeader/>
        <div className='container archivecontainer'>
                <div className='col-md-12 filterwrapper'>
                    <p>Filter</p>
                    <label htmlFor='startdate'>By Date</label>
                    <input type='date' id='startdate' onChange={this.handleStartDateChange.bind(this)} ></input>
                    <input type='date' id='enddate' onChange={this.handleEndDateChange.bind(this)} ></input>
                    <button onClick={this.getOrdersByDate.bind(this)}>Filter</button>


                    <label htmlFor='userfilter'>By User</label>
                    <input type='text' id='userfilter' placeholder='user'></input>
                    <button >Filter</button>

                    <label htmlFor='tablefilter'>By Table</label>
                    <input type='text' id='tablefilter' placeholder='table'></input>
                    <button>Filter</button>
                </div>
        </div>
        <div className='container archiveordercontainer'>
            {this.renderOrders()}
        
        </div>
        

        
      </div>
    )
  }
}


export default StoreViewArchive;