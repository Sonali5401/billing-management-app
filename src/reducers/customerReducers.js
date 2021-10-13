const customersInitialState = { customerList : [], customerDetail : {} }

const customerReducer = (state = customersInitialState,action) => {
    switch(action.type) {

        case 'ADD_CUSTOMER' : {
            const newList = [...state.customerList,action.payload]
            return {...state,customerList : newList}
        }

        case 'LIST_ALL_CUSTOMERS' : {
            return {...state, customerList : [...action.payload] }
        }

        case  'VIEW_CUSTOMER_DETAIL' : {
            return {...state,customerDetail : {...action.payload}}
        }

        case 'CLEAR_DETAIL_OBJ' : {
            return {...state, customerDetail : {}}
        }

        case 'UPDATE_CUSTOMER' : {

            const newItemList = state.customerList.map((ele) => {
                if(ele._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...ele}
                }
            })
        
            return {...state, customerList : newItemList}

        }

        case 'DELETE_CUSTOMER' : {
            const newItemList = state.customerList.filter((ele) => {
                return (ele._id !== action.payload)
            })
            
            return {...state, customerList : [...newItemList]}
        }

        default : {
            return {...state}
        }
    }
}

export default customerReducer