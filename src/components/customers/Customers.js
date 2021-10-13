import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'

import CustomerTable from './CustomerTable';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'


const Customers = () => {

    const [updateFlag,setUpdateFlag] = useState(false)
    const [updateItem,setUpdateItem] = useState({})

    const customerList = useSelector((state) => {
        return state.customers.customerList
    })

    const handleFlag = () => {
        setUpdateFlag(!updateFlag)
    }
    const handleUpdate = (id,name) => {
        const updateObj = customerList.find((ele) => ele._id === id)
        setUpdateItem(updateObj)
        handleFlag()
    }

    return(
        <div>
            <AddCustomer />
            <CustomerTable handleUpdate = {handleUpdate} />
            { (updateFlag) && <EditCustomer updateItem = {updateItem} handleFlag = {handleFlag}/>}
        </div>
    )

}

export default Customers