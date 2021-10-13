import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Table,Modal,Button} from 'react-bootstrap'
import { BsFillEyeFill , BsTrashFill } from "react-icons/bs";
import { Preview, print } from 'react-html2pdf';
import {format} from 'date-fns'
import {startViewBillDetails, clearViewBillDetails, startBillDelete } from '../../actions/billActions'
import ComponentPrint from './ComponentPrint';

const BillsTable = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch()

    const bills = useSelector((state) => {
        return state.bills.billItems
    })

    console.log('bills',bills)

    const customerList = useSelector((state) => state.customers.customerList)
    
    /*CLOSING MODAL AND CLEARING VIEWDETAIL OBJ */
    const handleShowDetailsClose = () => {

        setShowDetails(false);
        dispatch(clearViewBillDetails())
    }

    const handleShowDetails = (id) => {
       dispatch(startViewBillDetails(id))
       setTimeout(() => { setShowDetails(true) }, 800);

   }

    /* FETCHING DETAILS OF BILL SELECTED BY USER */
       const veiwBillObj = useSelector((state) => {
        return state.bills.billObj
    })

    /*DELETING BILL */
    const handleDeleteBill = (id) =>{

        const confirmDelete = window.confirm(`Are you Sure,you want to delete Bill : ${id} ?`)
        if(confirmDelete){
            dispatch(startBillDelete(id))
        }
    }


    return (
        <div>
            {(bills.length > 0 ) && <Table striped bordered hover className = 'table-success'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Bill ID</th>
                    <th>Customer</th>
                    <th>Bill amount</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((ele,index) => {
                        return (
                            <tr key = {ele._id}>
                                
                                <td>{index +1}</td>
                                <td>{ele._id} </td>
                                <td>{(customerList.find((item) => item._id === ele.customer)).name}</td>
                                <td>{ele.total} INR</td>
                                <td>{ele.date.slice(0,10)}</td>
                                <td><BsFillEyeFill onClick = {() => {handleShowDetails(ele._id)}} /></td>
                                <td><BsTrashFill onClick = {() =>{ handleDeleteBill(ele._id)}}/></td>
                            </tr>

                            )
                    })}
                </tbody>
            </Table> } 
            <div >
            <Modal show={showDetails} onHide={handleShowDetailsClose} size="lg" aria-labelledby="example-modal-sizes-title-lg"  >
                    <Modal.Header closeButton>
                    <Modal.Title>Bill Details : </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Preview id={'jsx-template'} >
                            <ComponentPrint veiwBillObj = {veiwBillObj}/>
                        </Preview>
                        


                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={()=>print('invoice', 'jsx-template')}>Download</Button>    
                    <Button variant="secondary" onClick={handleShowDetailsClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
                
            

        </div>
    )
}

export default BillsTable