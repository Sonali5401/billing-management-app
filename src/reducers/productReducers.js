const productInitialState = { items : [],
                            viewDetails : {} }


const productReducers = (state = productInitialState, action) => {
    switch(action.type){

        case 'ADD_PRODUCT' : {
            const newList = [...state.items,action.payload]
            return {...state,items : newList}
        }

        case 'LIST_ALL_PRODUCTS' : {
            return {...state, items : [...action.payload] } 
        }

        case 'VIEW_PRODUCT_DETAILS' : {
            return {...state, viewDetails : {...action.payload}}
        }

        case 'CLEAR_DETAIL_OBJ' : {
            return {...state, viewDetails : {}}
        }

        case 'UPDATE_PRODUCT' : {

            const newItemList = state.items.map((ele) => {
                if(ele._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...ele}
                }
            })
        
            return {...state,items : newItemList}

        }

        case 'DELETE_PRODUCT' : {
            const newItemList = state.items.filter((ele) => {
                return (ele._id !== action.payload)
            })
            return {...state, items : newItemList}
        }

        default : {
            return {...state}
        }
    }
}

export default productReducers