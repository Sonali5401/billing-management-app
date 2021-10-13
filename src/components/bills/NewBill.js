import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Container,Row,Col,Table ,Form,Button} from 'react-bootstrap'
import { BsPlusSquare, BsDashSquare, BsXCircle} from "react-icons/bs";
import { findItem } from './HelperFuctions';
import {addtoCartItem, startCreateBill} from '../../actions/billActions'

import ItemCard from './ItemCard'
const NewBill = (props) => {

    const [customer,setCustomer] = useState('')
    const [date,setDate] = useState('')
    const [totalPrice,setTotalPrice] = useState(0)
    const [formError,setFormError] = useState({})
    let errors = {}
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.products.items)
    const customerList = useSelector((state) => state.customers.customerList)
    const cartItems = useSelector((state) => state.bills.cartItems)


    useEffect(() => {
        let sum = 0
        cartItems.forEach((ele) =>{
            sum+=(ele.price*ele.qty)
        })
        setTotalPrice(sum)

    },[cartItems])


    const handleCartOperand = (id,operation) => {
        const item = findItem(id,cartItems)

        switch(operation) {
        
            case 'increment' : {
                const updatedList = cartItems.map((ele) => {
                    return (ele._id === item._id) ? {...item, qty : ele.qty + 1} : ele
                })
                dispatch(addtoCartItem(updatedList))
                break;
               
            }

            case 'decrement' : {
                let updatedList = []

                if(item.qty === 1){
                    updatedList = cartItems.filter((ele) => {
                        return (ele._id !== item._id)
                    })
                } else {
                    updatedList = cartItems.map((ele) => {
                        return (ele._id === item._id) ? {...item, qty : ele.qty - 1} : ele
                    })

                }
                dispatch(addtoCartItem(updatedList))
                break;
            }

            case 'remove' : {
                const confirmRemove = window.confirm('Are you sure you want to Remove this Item ?')
                if(confirmRemove){
                    const updatedList = cartItems.filter((ele) => {
                        return (ele._id !== item._id)
                    })
                    dispatch(addtoCartItem(updatedList))
                    break;
                }
            }
        }

    }

    const handleChange = (e) =>{
        if(e.target.name === 'customer'){
            setCustomer(e.target.value)
        } else if (e.target.name === 'date'){
            setDate(e.target.value)
        }

    }

    const runValidations = () => {
        if(date.length === 0) {
            errors.date = 'Please Select Date'
        }

        if(customer.length === 0) {
            errors.customer = 'Please Select Customer to Proceed'
        }
    }

    const handleGenerateBill = (e) => {

        /* FINDING FINAL CARTITEMS AND CREATING REQUIRED LINEITEM PROPERTY NEEDED FOR API CALL */
        const finalItems = cartItems.map((ele) => {
           return {
                product : ele._id,
                quantity : ele.qty
            }
        })

        /* FINDING SELECTED CUSTOMER ID */
        const customerData = customerList.find((ele)=>{
            return ele.name === customer
        })

        runValidations()

        let data = {}

        if(Object.keys(errors).length === 0){
            setFormError({})

            data = {
                customer : customerData._id,
                date : date,
                lineItems : finalItems
            }
    
            console.log('data on generateBill', data)
  
            dispatch(startCreateBill(data, props.history))

        } else {
            console.log('errors',errors)
            setFormError(errors)
        }



    }


    return (
        <Container className = 'mx-0 mb-4'>
            <Row>
                <Col sm={8}>
                    <div key = 'productListing'>
                        <h1 className = "text-center mt-3">All Products: {productList.length} Items </h1>
                            <section className = "container">
                                <div className = "row justify-content-center">
                                    {productList.map((item)=>{
                                        return (
                                            <ItemCard  key = { item._id} {...item}/>
                                        )
                                    })}
                                </div>
                            </section>
                    </div>
                </Col>

                <Col style = {{'width' : '100%'}}><h1 className = "text-center mt-4">Cart: { cartItems.length } Items </h1>
                { (cartItems.length > 0) ? 
                                        <div key = 'cartListing'>                                 
                                            <Form style = {{padding : '10px'}}>

                                                <Form.Group className="mb-3" controlId="formBasicDate">
                                                    <Form.Control type="date" placeholder="Select Date" value = {date} name = 'date' onChange={handleChange} />
                                                    { formError.date && <span className = 'text-danger'>{formError.date}</span>}
                                                </Form.Group>

                                                <Form.Select name = 'customer' onChange={handleChange}>
                                                    <option>*** Select-the-Customer ***</option>

                                                    {customerList.map((ele) => {
                                                        return <option key = {ele.id} value = {ele.name}>{ele.name}</option>
                                                    })}

                                                </Form.Select>
                                                { formError.customer && <span className = 'text-danger'>{formError.customer}</span>}
                                            </Form>
                                        
                                            <Table striped bordered  hover variant = 'primary' >
                                                
                                                <thead>
                                                        <tr>
                                                        <th>#</th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total Price</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((item,index)=>{
                                                        return (
                                                            <tr key = {item._id}>
                                                                <td>{index +1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                                <td><BsDashSquare onClick = {(e) => {handleCartOperand(item._id,'decrement')}}/> 
                                                                    {item.qty}
                                                                    <BsPlusSquare onClick = {(e) => {handleCartOperand(item._id,'increment')}}/> 
                                                                    <BsXCircle onClick = {(e) => {handleCartOperand(item._id,'remove')}}/> 
                                                                </td>
                                                                <td>{item.price * item.qty}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    <tr><td colSpan = '4' >Items Total</td>
                                                        <td>{totalPrice}</td>
                                                    </tr>
                                                    <tr><td colSpan = '4' > Shipping </td>
                                                        {(totalPrice <= 499) ? <td>49 INR</td> : <td> Free </td>}
                                                    </tr>
                                                    <tr><td colSpan = '4' >Cart Total</td>
                                                        {(totalPrice <= 499) ? <td> {totalPrice + 49} INR</td> : <td> {totalPrice} INR </td>}
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button variant="primary" size="sm" onClick = {handleGenerateBill}> Generate Bill </Button>
                                            
                                        </div> 
                                    : <h3>Cart is Empty</h3>}
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(NewBill)