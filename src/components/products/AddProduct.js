import {useState} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import { BsFillPlusCircleFill } from "react-icons/bs";
import {useDispatch} from 'react-redux'
import { startAddProduct } from '../../actions/productActions'


const AddProduct = (props) => {
  
    const [show, setShow] = useState(false);
    const [productName,setProductName] = useState('')
    const [price,setPrice] = useState('')

    const dispatch = useDispatch()

    /* --- HANDLE FORM INPUT ----  */
    const handleChange = (e) => {

        if(e.target.name === 'productName'){
            setProductName(e.target.value)
        } else if(e.target.name === 'price'){
            setPrice(e.target.value)
        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true);
    

    const addProduct = () => {
        const productData = {
            name : productName,
            price : Number(price)
        }
        dispatch(startAddProduct(productData))

    }


    return(
        <div>
            <div className="d-grid gap-2" style = {{padding : '20px'}}>
                <Button variant="info" size="lg" onClick={handleShow} >
                    <BsFillPlusCircleFill /> Click Here to Add Product !
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Add a Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicProductName">
                            <Form.Control type="text" placeholder="Enter Product name.." value = {productName} name = 'productName' onChange = {handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Control type="number" placeholder="Enter Price of a Product"  value = {price} name = 'price' onChange = {handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        addProduct()}}>
                        Save and Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddProduct