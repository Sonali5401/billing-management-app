import axios from 'axios'

/* GET TOKEN */
const tokenStored = (localStorage.getItem('token'))

export const addProduct = (newItem) => {
    return {
        type : 'ADD_PRODUCT',
        payload : newItem
    }
}

export const listOfProducts = (list) => {
    return {
        type : 'LIST_ALL_PRODUCTS',
        payload : list
    }
}

export const viewProductDetail = (result) => {
    return {
        type : 'VIEW_PRODUCT_DETAILS',
        payload : result
    }
}

export const clearVeiwDetailObject = () =>{
    return {
        type : 'CLEAR_DETAIL_OBJ'
    }
}

export const updateProduct = (updatedResponse) => {
    return {
        type : 'UPDATE_PRODUCT',
        payload : updatedResponse
    }
}

export const deleteProduct = (id) => {
    return {
        type : 'DELETE_PRODUCT',
        payload : id
    }
}

export const startAddProduct = (productData) =>{
    return ((dispatch) => {

        axios.post('http://dct-billing-app.herokuapp.com/api/products',
                    productData,
                    { headers: { "Authorization" : `Bearer ${tokenStored}`} })
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

export const startGetAllProducts = () => {
    return ((dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products',{ headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(listOfProducts(result))
            })
            .catch((error) =>{
                alert(error.message)
            })


    })
}

export const startViewProductDetail = (id) => {
    return ((dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
            .then((response) => {
                const result = response.data
                dispatch(viewProductDetail(result))
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

export const startUpdateProduct = (updatedData, id) => {
    return ((dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,updatedData, { headers: { "Authorization" : `Bearer ${tokenStored}`}} )
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

export const startProductDelete = (id) => {
    return ((dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`, { headers: { "Authorization" : `Bearer ${tokenStored}`}})
            .then((response) => {
                const result = response.data
                dispatch(deleteProduct(result._id))  
            })
            .catch((error) => {
                alert(error.message)
            })
    })

}

