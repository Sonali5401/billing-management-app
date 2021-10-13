import {useState} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {startUpdateProduct} from './../../actions/productActions'

const EditProduct = (props) => {
    const {updateItem, handleFlag } = props

    const [show, setShow] = useState(true);
    const [id,setID] = useState(updateItem._id)
    const [productName,setProductName] = useState(updateItem.name)
    const [price,setPrice] = useState(updateItem.price)

    const dispatch = useDispatch()

    /* --- HANDLE FORM INPUT ----  */
    const handleChange = (e) => {

        if(e.target.name === 'productName'){
            setProductName(e.target.value)
        } else if(e.target.name === 'price'){
            setPrice(e.target.value)
        }

    }

    const handleClose = () => {
        setShow(false);
        setID('')
        handleFlag()
    }

    const updateProduct = () => {
        const productData = {
            name : productName,
            price : Number(price)
        }
        dispatch(startUpdateProduct(productData,id))

    }


    return(
        <div>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Update a Product</Modal.Title>
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
                    updateProduct()}}>
                    Update
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProduct