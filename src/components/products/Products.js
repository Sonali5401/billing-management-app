import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import ProductTable from './ProductTable'
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';


const Products = () => {
    const [updateFlag,setUpdateFlag] = useState(false)
    const [updateItem,setUpdateItem] = useState({})

    const productItems = useSelector((state) => {
        return state.products.items
    })

    const handleFlag = () => {
        setUpdateFlag(!updateFlag)
    }

    const handleUpdate = (id,name) => {
       
        const updateObj = productItems.find((ele) => ele._id === id)
        setUpdateItem(updateObj)
        handleFlag()
    }

    return(
        <div >
            <AddProduct />
            <ProductTable handleUpdate = {handleUpdate} />
            { (updateFlag) && <EditProduct updateItem = {updateItem} handleFlag = {handleFlag}/>}
            
      </div>
    )
}

export default Products