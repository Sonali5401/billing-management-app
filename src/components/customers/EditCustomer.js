import {useState} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {startUpdateCustomer} from './../../actions/customerActions'

const EditCustomer = (props) => {
    const {updateItem, handleFlag } = props

    const [show, setShow] = useState(true);
    const [id,setID] = useState(updateItem._id)
    const [customerName,setCustomerName] = useState(updateItem.name)
    const [email,setEmail] = useState(updateItem.email)
    const [mobileNum,setMobileNum] = useState(updateItem.mobile)

    const dispatch = useDispatch()

    /* --- HANDLE FORM INPUT ----  */
    const handleChange = (e) => {

        if(e.target.name === 'customerName'){
            setCustomerName(e.target.value)
        } else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name = 'mobileNum'){
            setMobileNum(e.target.value)
        }

    }

    const handleClose = () => {
        setShow(false);
        setID('')
        handleFlag()
    }

    
    const updateCustomer = () => {
        const customertData = {
            name : customerName,
            mobile : Number(mobileNum),
            email : email
        }
        dispatch(startUpdateCustomer(customertData,id))

    }


    return (
        <div>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Update a Product</Modal.Title>
                </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCustomerName">
                        <Form.Control type="text"  value = {customerName} name = 'customerName' onChange = {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email"  value = {email} name = 'email' onChange = {handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMobileNum">
                        <Form.Control type="text"  value = {mobileNum} name = 'mobileNum' onChange = {handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    handleClose()
                    updateCustomer()}}>
                    Update
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCustomer