import React, { Component } from 'react';
import axios from 'axios';

import GuestOrderSmall from './GuestOrderSmall';

class GuestViewOrdered extends Component {
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

            var body = { token }

            axios({
                method: 'post',
                url: 'http://localhost:5000/auth/checktoken',
                data: body,
                header: { 'Content-Type': 'application/json ' },
            })
            .then(response => {

                this.getOrders(response.data.decoded.userid)    
            })
            .catch(err => {
                if (err)
                    console.log(err)
                })
        }
    }


    getOrders(userid){
        axios({
            method: 'get',
            url: 'http://localhost:5000/order/getorder/' + userid,
            header: { 'Content-Type': 'application/json ' }
        })
        .then(response => {
            this.setState({
                data: response.data
            })
            console.log(this.state.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    




    render() {
        return (
            <div>
                <h1>Orders</h1>
                {this.state.data && this.state.data.map((order, i) => <GuestOrderSmall key={i} data={order} />)}
                
            
            </div>
        )
    }
}

export default GuestViewOrdered;
