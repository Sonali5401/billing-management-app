import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table,Button,Modal } from 'react-bootstrap'
import { BsFillEyeFill , BsPencil, BsTrashFill } from "react-icons/bs";
import { startViewProductDetail, clearVeiwDetailObject, startProductDelete } from '../../actions/productActions'

const ProductTable = (props) => {
    const { handleUpdate } = props

    const [listItems,setListItems] = useState([])
    const [showDetails, setShowDetails] = useState(false);

    const dispatch = useDispatch()

    
    /* FETCHING PRODUCTS LIST */
    const fetchItems = useSelector((state) => {
        return state.products.items
    })

    useEffect(()=>{
        if(fetchItems.length > 0){
            setListItems(fetchItems)
        }
    },[fetchItems])

    /*FETCHING DETAILS OF PRODUCT SELECTED BY USER */
    const veiwDetailObj = useSelector((state) => {
        return state.products.viewDetails
    })


    /*CLOSING MODAL AND CLEARING VIEWDETAIL OBJ */
    const handleShowDetailsClose = () => {
        setShowDetails(false);
        dispatch(clearVeiwDetailObject())
    }

    /* DISPLAYING MODAL AFTER CLICKED EVENT */
    const handleShowDetails = (id) => {
        dispatch(startViewProductDetail(id))
        setTimeout(() => { setShowDetails(true) }, 800);
        //setShowDetails(true)
        
    }

    /*UPDATE ITEM */
    const handleUpdateItem = (id,name) => {
        handleUpdate(id,name)
    }


    /*DELETING PRODUCT */
    const handleDeleteProduct = (id) =>{
        const confirmDelete = window.confirm('Are you Sure,you want to delete this Product ?')
        if(confirmDelete){
            dispatch(startProductDelete(id))
        }
    }
   
    return (
        <div>
            <Table striped bordered hover className = 'table-success' >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
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
                                <td>{ele.price}</td>
                                <td><BsFillEyeFill onClick = {() => {handleShowDetails(ele._id)}}/></td>
                                <td>
                                    <>
                                    <BsPencil onClick = {() => {handleUpdateItem(ele._id,ele.name)}} />  &nbsp; &nbsp;
                                    <BsTrashFill onClick = {() => {handleDeleteProduct(ele._id)}}/>
                                    </>
                                </td>
                            </tr>

                            )
                    })}
                </tbody>
                </Table>
                {/* ----  VIEW DETAIL MODAL ------ */}
                <Modal show={showDetails} onHide={handleShowDetailsClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Details of {veiwDetailObj.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <h4>Product ID : {veiwDetailObj._id}</h4>
                        <h4>Name : {veiwDetailObj.name}</h4>
                        <h4>Price : {veiwDetailObj.price}</h4>
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

export default ProductTable