import axios from '../config/axiosConfig'

/* GET TOKEN */
const tokenStored = (localStorage.getItem('token'))

export const addtoCartItem = (cartitems) => {
    return {
        type : 'ADD_TO_CART',
        payload : cartitems
    }
}

export const createBill = (billResponse) =>{
    return {
        type : 'CREATE_BILL',
        payload : billResponse
    }
}


export const listAllBills = (bills) =>{
    return {
        type : 'LIST_ALL_BILLS',
        payload : bills
    }

}

export const viewBill = (bill) => {
    return {
        type : 'VIEW_BILL_DETAILS',
        payload : bill
    }
}

export const clearViewBillDetails = () => {
    return {
        type : 'CLEAR_BILLDETAIL_OBJ'
    }
}

export const deleteBill = (id) => {
    return {
        type : 'DELETE_BILL',
        payload : id
    }
}

/* GET ALL BILLS : MIDDLEWARE */
export const startGetAllBills = () =>{
    return ((dispatch) =>{
        axios.get('/bills',{ headers: { "Authorization" : `Bearer ${tokenStored}`} })
            .then((response) => {
                //console.log('getAllBills',response.data)
                dispatch(listAllBills(response.data))
            })
            .catch((error) => {
                alert('errors',error.message)
            })
    })

}

/* CREATE NEW BILL : MIDDLEWARE */
export const startCreateBill = (billData,history) => {

    return ((dispatch) => {
        axios.post('/bills',billData,{ headers: { "Authorization" : `Bearer ${tokenStored}`} })
            .then((response) =>{
                const data = response.data
                console.log('received data',data)
                dispatch(createBill(data))
                alert('Successfully created Bill')
                history.push('/bills/invoice')
            })
            .catch((error) =>{
                //console.log('error',error)
                alert('error_createBill',error.message)
            })
    })
}

/* VIEW SELECTED BILL DETAILS : MIDDLEWARE */
export const startViewBillDetails = (id) => {
    return ((dispatch) => {
        axios.get(`bills/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}})
            .then((response) => {
                //console.log('bill detail',response.data)
                dispatch(viewBill(response.data))
            })
            .catch((error) => {
                alert(error.message)
            })

    })
}

/* DELETE BILL : MIDDLEWARE */
export const startBillDelete = (id) => {
    return((dispatch) => {
        axios.delete(`/bills/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}})
        .then((response) => {
            const result = response.data
            console.log('result._id', result._id)
            dispatch(deleteBill(result._id))  
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}