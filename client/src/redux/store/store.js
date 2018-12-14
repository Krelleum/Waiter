import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';


import loginReducer from '../reducers/loginReducer';


export default createStore( 
    combineReducers({
        login: loginReducer
    }),
    {},
    composeWithDevTools(applyMiddleware()), 
    );