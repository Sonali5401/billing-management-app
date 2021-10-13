import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import productReducers from '../reducers/productReducers'
import customerReducer from '../reducers/customerReducers'
import billReducer from '../reducers/billReducer'

const configureStore = () => {

    const store = createStore(combineReducers({
        user : userReducer,
        products : productReducers,
        customers : customerReducer,
        bills : billReducer

    }), applyMiddleware(thunk))

    return store
}

export default configureStore