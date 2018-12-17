import React, { Component } from 'react';
import axios from 'axios';

import ItemSmall from './ItemSmall';


import { connect } from 'react-redux';

import itemReducer from '../reducers/itemReducer';



class ItemContainer extends Component {
    constructor(props){
      super(props);
      this.state = {
        
      }
    }
  
  

  


  componentDidMount(){
    this.getItemList()
  }
  


  getItemList(){
    axios({
      method: 'get',
      url: 'http://localhost:5000/store/getstore/' + this.props.storeid,
      header: { 'Content-Type': 'application/json ' },
    })
      .then(response => {

        axios({
          method: 'get',
          url: 'http://localhost:5000/itemlist/getitemlist/' + response.data.itemlistid,
          header: { 'Content-Type': 'application/json ' },
        })
          .then(response => {
            
           this.setState({
             data: response.data
           })

            
          })
          .catch(err => {
            if (err)
              console.log(err)
          })

        
      })
      .catch(err => {
        if (err)
          console.log(err)
      })
  }


  toShow(){
    
  }

  




render() {
    return (
      <div className='container'>
        
              {this.state.data && this.state.data.items.map((item, i) => <ItemSmall key={i} data={item} itemlistid={this.state.data.itemlistmongoid} />)}
      </div>
    )
  }
}





const mapStateToProps = (state) => {
  return {
    show: state.show,
    itemname: state.itemname
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    showItemList: () => {
      dispatch({
        type: 'SHOW_ITEM_LIST'
      });
    },
    showItemBig: (itemname) => {
      dispatch({
        type: 'SHOW_ITEM_BIG',
        payload: itemname
      });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);