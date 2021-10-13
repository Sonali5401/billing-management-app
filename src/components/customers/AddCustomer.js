import {useState,useEffect} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import { BsFillPlusCircleFill } from "react-icons/bs";

import { useDispatch,useSelector } from 'react-redux'
import CustomerTable from './CustomerTable'
import { startAddCustomer, startGetAllCustomers } from '../../actions/customerActions'

const AddCustomer = () => {
    const [show, setShow] = useState(false);
    const [customerName,setCustomerName] = useState('')
    const [email,setEmail] = useState('')
    const [mobileNum,setMobileNum] = useState('')

    const dispatch = useDispatch()

    /* FETCHING ALL CUSTOMER DATA AS COMPONENT IS RENDERED */
    useEffect(() => {
        dispatch(startGetAllCustomers())
    },[])

    const customerList = useSelector((state) => {
        return state.customers.customerList
    })

    //console.log('customerList', customerList)

    const handleChange = (e) => {

        if(e.target.name === 'customerName'){
            setCustomerName(e.target.value)
        } else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name = 'mobileNum'){
            setMobileNum(e.target.value)
        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addCustomer = () => {
        const customerData = {
            name : customerName,
            mobile : Number(mobileNum),
            email : email
        }
        //console.log('customerData',customerData)
        dispatch(startAddCustomer(customerData))

        //Reset Form
        setCustomerName('')
        setMobileNum('')
        setEmail('')
    }

    return(
        <div>
            <div className="d-grid gap-2"  style = {{padding : '20px'}} >
                <h1></h1>
                <Button variant="info" size="lg" onClick={handleShow} >
                <BsFillPlusCircleFill />  Click Here to Add Customer !
                </Button>
            </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    
                    <Form.Group className="mb-3" controlId="formBasicCustomerName">
                        <Form.Control type="text" placeholder="Enter Customer name.." value = {customerName} name = 'customerName' onChange = {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter Email of customer"  value = {email} name = 'email' onChange = {handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMobileNum">
                        <Form.Control type="text" placeholder="Enter Mobile Number"  value = {mobileNum} name = 'mobileNum' onChange = {handleChange}/>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose()
                    addCustomer()}}>
                    Save and Add
                </Button>
            </Modal.Footer>
            
        </Modal>
  </div>
    )
}

export default AddCustomer