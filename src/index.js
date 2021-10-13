import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App';

import configureStore from './store/configureStore';
import { startGetAllCustomers } from './actions/customerActions'
import { startGetAllProducts } from './actions/productActions'
import { startGetAllBills } from './actions/billActions'

const store = configureStore()
console.log('in index.js store : ', store.getState())



if(localStorage.getItem('token')){
  store.dispatch(startGetAllProducts())
  store.dispatch(startGetAllCustomers())
  store.dispatch(startGetAllBills())
}




ReactDOM.render(<Provider store = {store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>, document.getElementById('root')
);


