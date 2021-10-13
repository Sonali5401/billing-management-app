import axios from '../config/axiosConfig'

/* GET TOKEN */
const tokenStored = (localStorage.getItem('token'))

/* ADD PRODUCT ACTION GENERATOR */
export const addProduct = (newItem) => {
    return {
        type : 'ADD_PRODUCT',
        payload : newItem
    }
}

/* LIST ALL PRODUCT ACTION GENERATOR */
export const listOfProducts = (list) => {
    return {
        type : 'LIST_ALL_PRODUCTS',
        payload : list
    }
}

/* FETCHED SELECTED PRODUCT DETAIL - ACTION GENERATOR */
export const viewProductDetail = (result) => {
    return {
        type : 'VIEW_PRODUCT_DETAILS',
        payload : result
    }
}

/* CLEAR VIEW DETAIL OBJECT ON MODAL CLOSURE*/
export const clearVeiwDetailObject = () =>{
    return {
        type : 'CLEAR_DETAIL_OBJ'
    }
}

/* UPDATE PRODUCT ACTION GENERATOR */
export const updateProduct = (updatedResponse) => {
    return {
        type : 'UPDATE_PRODUCT',
        payload : updatedResponse
    }
}

/* DELETE PRODUCT ACTION GENERATOR */
export const deleteProduct = (id) => {
    return {
        type : 'DELETE_PRODUCT',
        payload : id
    }
}

/* ADD PRODUCT :  MIDDLEWARE*/
export const startAddProduct = (productData) =>{
    return ((dispatch) => {

        axios.post('/products', productData,{ headers: { "Authorization" : `Bearer ${tokenStored}`} })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                } else {
                    alert( 'Product Successfully Added.')
                    dispatch(addProduct(result))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}

/* lIST ALL PRODUCT :  MIDDLEWARE*/
export const startGetAllProducts = () => {
    return ((dispatch) =>{
        axios.get('/products',{ headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(listOfProducts(result))
            })
            .catch((error) =>{
                alert(error.message)
            })


    })
}

/* FETCH SELECTED PRODUCT DETAILS :  MIDDLEWARE*/
export const startViewProductDetail = (id) => {
    return ((dispatch) => {
        axios.get(`/products/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(viewProductDetail(result))
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

/* UPDATE PRODUCT DETAIL:  MIDDLEWARE*/
export const startUpdateProduct = (updatedData, id) => {
    return ((dispatch) => {
        axios.put(`/products/${id}`,updatedData, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const data = response.data

                if(data.hasOwnProperty('errors')){
                    alert(data.message)
                } else {
                    alert( 'Product Successfully Updated.')
                    dispatch(updateProduct(data))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
        
    })
}

/* DELETE PRODUCT :  MIDDLEWARE*/
export const startProductDelete = (id) => {
    return ((dispatch) => {
        axios.delete(`/products/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}})
            .then((response) => {
                const result = response.data
                dispatch(deleteProduct(result._id))  
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

