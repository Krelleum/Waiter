import React, { Component } from 'react'

import './StoreViewHeader.css';

import { connect } from 'react-redux';


class StoreViewHeader extends Component {





    handleLogout() {
        localStorage.removeItem('token');
        window.location.reload()
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <h1 className="navbar-brand" id='navbarbrand'><span>W</span></h1>
                        </div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li onClick={this.props.changeArchiveView.bind(this)}><a>Archive</a></li>
                                <li onClick={this.props.changeStoreView.bind(this)}><a>Dashboard</a></li>

                            </ul>


                        </div>

                        <button id='logoutbutton' onClick={this.handleLogout.bind(this)}>Logout</button>
                    </div>
                    
                </nav>
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
        changeArchiveView: () => {
            dispatch({
                type: 'CHANGE_TO_STOREARCHIVEVIEW'
            })
        },

        changeStoreView: () =>{
            dispatch({
                type: 'CHANGE_TO_STOREVIEW'
            })
        }
}
}


export default connect(mapStateToProps, mapDispatchToProps)(StoreViewHeader);