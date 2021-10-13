const billInitialState = { cartItems : [], billItems : [], billObj : {}, invoiceData : {}}

const billReducer = (state = billInitialState,action) => {
    switch(action.type) {

        case 'ADD_TO_CART' : {
            return {...state,cartItems : [...action.payload]}
        }

        case 'CREATE_BILL' : {
            return {...state,cartItems : [],invoiceData : {...action.payload}}
        }


        case 'LIST_ALL_BILLS' :{
            return {...state, billItems : [...action.payload]}
        }

        case 'VIEW_BILL_DETAILS' : {
            return {...state, billObj : {...action.payload}}
        }
        
        case 'CLEAR_BILLDETAIL_OBJ' : {
            return {...state,billObj : {}}
        }

        case 'DELETE_BILL' : {
            const newItemList = state.billItems.filter((ele) => {
                return (ele._id !== action.payload)
            })

            return {...state, billItems : [...newItemList]}
        }

        default : {
            return {...state}
        }
    }
}

export default billReducer