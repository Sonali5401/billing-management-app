import React from 'react'
import {Button} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import { BsFillPlusCircleFill } from "react-icons/bs";
import {useSelector,useDispatch} from 'react-redux'
import {startGetAllBills} from '../../actions/billActions'
import BillsTable from './BillsTable'

const Bills = (props) => {

    const dispatch = useDispatch()

    dispatch(startGetAllBills())


    return(

        
                <div className="d-grid gap-2"  style = {{padding : '20px'}}>
                    <Button variant="info" size="lg" >
                    <BsFillPlusCircleFill />
                    <Link to = '/bills/newBill' style = {{textDecoration : 'none', color : 'black' }}> Click Here to Add New Bill !</Link>
                    </Button>
                    <BillsTable />
                </div>
               

            
        
    )
}

export default withRouter(Bills)