import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Table} from 'react-bootstrap'

const ComponentPrint = (props) => {
    const {veiwBillObj} = props


    const [totalPrice,setTotalPrice] = useState(0)
    const [invoiceObj,setInvoiceObj] = useState({})

    const invoiceRedirect = useSelector((state) => {
        return state.bills.invoiceData
    })
    

    useEffect(()=>{
        if(typeof invoiceRedirect !== 'undefined'){
            setInvoiceObj(invoiceRedirect)
        }

    },[invoiceRedirect])

    useEffect(()=>{
        if(typeof veiwBillObj !== 'undefined'){
            setInvoiceObj(veiwBillObj)
        }

    },[veiwBillObj])

    const productList = useSelector((state) => state.products.items)
    const customerList = useSelector((state) => state.customers.customerList)

    useEffect(() => {
        let sum = 0
        if((Object.keys(invoiceObj).length > 0) ) {
            invoiceObj.lineItems.forEach((ele) => {
                sum+=(ele.price*ele.quantity)
            })
       
            setTotalPrice(sum)
        }
 

    },[invoiceObj])


    return(
        <div className = 'm-5'>
            <h2 style = {{ textAlign : 'center', margin : '30px', fontSize : '1.7rem', color : 'blue'}}>BillingFriendly ! </h2>

            { (Object.keys(invoiceObj).length > 0) ? (
                <Table style = {{ color : '#6610f2'}}  variant = 'primary' >
                <thead>
                    <tr>
                        <th>Invoice ID : </th>
                        <th>Customer Name : </th>
                        <th>Date : </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{invoiceObj._id}</td>
                        <td> {(customerList.find((item) => item._id === invoiceObj.customer)).name}</td>
                        <td>{invoiceObj.createdAt}</td>
                    </tr>
                    
                </tbody>
                
                </Table >
            ) : (

                <h2>Loading...</h2>

            )}
                <h5> Purchase Details : </h5>
                { (Object.keys(invoiceObj).length > 0) ? (

                
                <Table  bordered variant = 'primary'  >
                                                
                    <thead style = {{ textAlign : 'center'}}>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody style = {{ textAlign : 'center' }}>
                        { invoiceObj.lineItems.map((ele,index) => {
                            return (
                                <tr key = {ele.product}>
                                    <th>{index+1}</th>
                                    <th>{(productList.find((item) => item._id === ele.product)).name}</th>
                                    <th>{ele.price}</th>
                                    <th>{ele.quantity}</th>
                                    <th>{ele.subTotal}</th>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan = '4' >Items Total</td>
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
                ) : (
                    <h2>Loading...</h2>
                )
}

        </div>
    )
}

export default ComponentPrint