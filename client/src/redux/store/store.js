import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import loginReducer from '../reducers/loginReducer';

export default (createStore, 
    combineReducers({login: loginReducer}), 
    {},
     applyMiddleware(logger())
    
    );