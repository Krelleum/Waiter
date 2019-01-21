import React, { Component } from 'react'
import axios from 'axios';

import GuestViewInvoice from './GuestViewInvoice';

import './GuestViewInvoice.css';

class GuestViewPayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            showInvoice: false,
        }
    }



    componentWillMount() {
      this.checkToken();
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

                    this.setState({
                        userid: response.data.decoded.userid,
                        storeid: response.data.decoded.storeid,
                        tableid: response.data.decoded.tableid,

                    })
                    
                    localStorage.setItem('userid', this.state.userid)
                    this.getUserTotal()

                })
                .catch(err => {
                    if (err)
                        console.log(err)
                })
        }
    }


    getUserTotal(){
        
        if(this.state.userid)
        
        axios({
            method: 'get',
            url: 'http://localhost:5000/user/getuser/' + this.state.userid,
            header: { 'Content-Type': 'application/json ' },
        })
            .then(response => {

                this.setState({
                    orderid: response.data.orderid,
                    total: response.data.total
               })


            })
            .catch(err => {
                if (err)
                    console.log(err)
            })
    }
    







checkInvoice(){


    var userid = localStorage.getItem('userid')
   
        axios({
            method: 'get',
            url: 'http://localhost:5000/archive/getorderbyuser/' + userid,
            header: { 'Content-Type': 'application/json ' },
        })
            .then(response => {
              console.log(response.data)
                if (response.data.length > 0){
                  this.setState({
                      data: response.data,
                      showInvoice: true
                  })

                localStorage.removeItem('token');
              }
              else{
                  this.setState({
                      showInvoice: false
                  })
              }
            })
            .catch(err => {
                console.log(err)
            })
   

 
}


renderInvoice(){
    if(this.state.showInvoice){
        return <GuestViewInvoice data={this.state.data} />
    }

    else{
        return (
            <div className='col-md-2 invoicenotconfirmed'>
                <p>If your Invoice has not been confirmed yet. Please try again in 2-3 Minutes!</p>
            </div>

        )
        
    }
}




handleLogout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    window.location.reload();
}







    render() {
        return (
            <div className='container userpaymentcontainer'>
                <div className='col-md-3 col-md-offset-3 userpaymentleft'>
                    <h2>Thank you for ordering with Waiter!</h2>
                    <p>Your Payment request was sent and a Waiter is on its way.</p>
                    <p>Total Payment : {this.state.total && this.state.total.toFixed(2)}</p>
                    <button onClick={this.checkInvoice.bind(this)}>Request Invoice</button>
                    <button onClick={this.handleLogout.bind(this)}>Logout</button>
                </div>

                
                   
                

                {this.renderInvoice()}
            </div>
        )
    }
}

export default GuestViewPayment;