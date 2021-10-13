import axios from 'axios'

/* GET TOKEN */
const tokenStored = (localStorage.getItem('token'))

/* ADD CUSTOMER ACTION GENERATOR */
export const addCustomer = (newCustomer) => {
    return {
        type : 'ADD_CUSTOMER',
        payload : newCustomer
    }
}

/* LIST ALL CUSTOMERS ACTION GENERATORS */
export const listOfCustomers = (list) => {
    return {
        type : 'LIST_ALL_CUSTOMERS',
        payload : list
    }
}

/* FETCH DETAIL OF SELECTED CUSTOMER BY USER ACTION GENERATOR */
export const viewCustomerDetail = (result) => {
    return {
        type : 'VIEW_CUSTOMER_DETAIL',
        payload : result
    }
}

/* CLEAR DETAIL OBJECT ON MODAL CLOSE ACTION GENERATOR*/
export const clearVeiwDetailObject = () =>{
    return {
        type : 'CLEAR_DETAIL_OBJ'
    }
}

export const updateCustomer = (updatedResponse) => {
    return {
        type : 'UPDATE_CUSTOMER',
        payload : updatedResponse
    }
}

export const deleteCustomer = (id) => {
    return {
        type : 'DELETE_CUSTOMER',
        payload : id
    }
}

/* ADD CUSTOMER :  MIDDLEWARE*/
export const startAddCustomer = (customerData) =>{
    return ((dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', 
                    customerData,
                    { headers: { "Authorization" : `Bearer ${tokenStored}`} })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                } else {
                    alert( 'Customer Successfully Added.')
                    dispatch(addCustomer(result))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}

/* GET ALL CUSTOMERS : MIDDLEWARE */
export const startGetAllCustomers = () => {
    return ((dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{ headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(listOfCustomers(result))
            })
            .catch((error) =>{
                alert(error.message)
            })


    })
}

/* FETCH DETAIL OF SELECTED CUSTOMER BY USER : MIDDLEWARE */
export const startViewCustomerDetail = (id) => {
    return ((dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(viewCustomerDetail(result))
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

export const startUpdateCustomer = (updatedData, id) => {
    return ((dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,updatedData, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const data = response.data

                if(data.hasOwnProperty('errors')){
                    alert(data.message)
                } else {
                    alert( 'Customer Successfully Updated.')
                    dispatch(updateCustomer(data))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
        
    })
}

/* DELETE CUSTOMER : MIDDLEWARE */
export const startCustomerDelete = (id) => {
    return ((dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}})
            .then((response) => {
                const result = response.data
                console.log('result._id', result._id)
                dispatch(deleteCustomer(result._id))  
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

