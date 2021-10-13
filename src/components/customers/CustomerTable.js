import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table , Modal , Button } from 'react-bootstrap'
import { BsFillEyeFill , BsPencil, BsTrashFill } from "react-icons/bs";
import {startViewCustomerDetail, clearVeiwDetailObject , startCustomerDelete} from '../../actions/customerActions'


const CustomerTable = (props) => {
    const {handleUpdate} = props

    const [listItems,setListItems] = useState([])
    const [showDetails, setShowDetails] = useState(false);

    const dispatch = useDispatch()

    
    /* FETCHING CUSTOMER LIST */
    const fetchItems = useSelector((state) => {
        return state.customers.customerList
    })

    useEffect(()=>{
        if(fetchItems.length > 0){
            setListItems(fetchItems)
        }
    },[fetchItems])


   /* FETCHING DETAILS OF PRODUCT SELECTED BY USER */
   const veiwDetailObj = useSelector((state) => {
    return state.customers.customerDetail
})

    /*CLOSING MODAL AND CLEARING VIEWDETAIL OBJ */
    const handleShowDetailsClose = () => {

        setShowDetails(false);
        dispatch(clearVeiwDetailObject())
    }
  
    

    /* DISPLAYING MODAL AFTER CLICKED EVENT */
    const handleShowDetails = (id) => {
    
        dispatch(startViewCustomerDetail(id))
        setTimeout(() => { setShowDetails(true) }, 800);
        //setShowDetails(true)
        
    }

    /*UPDATE ITEM */
    const handleUpdateCustomer = (id) => {
        console.log('id in tables', id)
        handleUpdate(id)
    }


    /*DELETING CUSTOMER */
    const handleDeleteCustomer = (id,name) =>{

        const confirmDelete = window.confirm(`Are you Sure,you want to delete ${name} as Customer ?`)
        if(confirmDelete){
            dispatch(startCustomerDelete(id))
        }
    }

    return (
        <div className = "m-2">
            <Table striped bordered hover className = 'table-success'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact No.</th>
                    <th>Details</th>
                    <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems.map((ele,index) => {
                        return (
                            <tr key = {ele._id}>
                                
                                <td>{index +1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.mobile}</td>
                                <td><BsFillEyeFill onClick = {() => {handleShowDetails(ele._id)}}/></td>
                                <td>
                                    <>
                                    <BsPencil onClick = {() => {handleUpdateCustomer(ele._id,ele.name)}} />  &nbsp; &nbsp;
                                    <BsTrashFill onClick = {() => {handleDeleteCustomer(ele._id,ele.name)}}/>
                                    </>
                                </td>
                            </tr>

                            )
                    })}
                </tbody>
                </Table> 
                <Modal show={showDetails} onHide={handleShowDetailsClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Details of {veiwDetailObj.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <h4>Customer ID : {veiwDetailObj._id}</h4>
                        <h4>Name : {veiwDetailObj.name}</h4>
                        <h4>Email : {veiwDetailObj.email}</h4>
                        <h4>Mobile No. : {veiwDetailObj.mobile}</h4>
                        <h4>Created On : {veiwDetailObj.createdAt}</h4>


                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowDetailsClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            
        </div>
    )
    
}

export default CustomerTable