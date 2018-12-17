import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';


import loginReducer from '../reducers/loginReducer';
import itemReducer from '../reducers/itemReducer';

export default createStore( 
    combineReducers({
        login: loginReducer,
        item: itemReducer
    }),
    {},
    composeWithDevTools(applyMiddleware()), 
    );