import React,{Fragment,useState,useEffect} from 'react'
import {Navbar,Nav , Container} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { BsFillHouseFill, BsPersonPlusFill,BsPersonCheckFill } from "react-icons/bs";
import { FcTodoList } from "react-icons/fc";
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import DashBoard from './dashboard/DashBoard'
import Products from './products/Products'
import Customers from './customers/Customers'
import Bills from './bills/Bills'
import NewBill from './bills/NewBill';
import Invoice from './bills/Invoice'
import './formstyle.css'

import {logOutUser} from './../actions/userActions'

const NavBar = (props) => {

    const dispatch = useDispatch()

    const isLoggedInData = useSelector((state) => {
        return state.user.isLoggedIn
    })



    const handleLogout = () => {

        localStorage.removeItem('token')
        alert("Successfully Logged Off")
        dispatch(logOutUser())
        props.history.push('/')

    }

    return(
        <Router>
            <div>
                <Navbar bg="primary" variant="dark" className = 'navbar-custom' >
                    <Container>
                        <Navbar.Brand as = {Link} to = '/' style = {{color : '#0f0477'}}>billingFriendly</Navbar.Brand>
                        <Nav className="ml-auto"  >
                            { isLoggedInData ? (
                                <>
                                    <Nav.Link as = {Link} to = '/dashboard' style = {{color : '#0f0477', fontWeight : 'bold'}}>DashBoard</Nav.Link>
                                    <Nav.Link as = {Link} to = '/products' style = {{color : '#0f0477', fontWeight : 'bold'}}>Products</Nav.Link>
                                    <Nav.Link as = {Link} to = '/customers' style = {{color : '#0f0477', fontWeight : 'bold'}}>Customers</Nav.Link>
                                    <Nav.Link as = {Link} to = '/bills' style = {{color : '#0f0477' ,fontWeight : 'bold'}}>Bills</Nav.Link>
                                    <Nav.Link as = {Link} to = '/logout' onClick = {handleLogout} style = {{color : '#0f0477', fontWeight : 'bold'}}>Logout</Nav.Link>
                                </>

                            ) : (
                                <>
                                    <Nav.Link as = {Link} to = '/' style = {{ color : '#0f0477', fontSize : '2rem'}}><BsFillHouseFill/></Nav.Link>
                                    <Nav.Link as = {Link} to = '/login' style = {{ color : '#0f0477', fontSize : '2rem'}}><BsPersonCheckFill/></Nav.Link>
                                    <Nav.Link as = {Link} to = '/signup' style = {{ color : '#0f0477', fontSize : '2rem'}}><BsPersonPlusFill/></Nav.Link>
                                    
                                </>

                            )}

                            
                        </Nav>
                    </Container>
                </Navbar>
                </div>
                <div>
                
                    <Route path="/" exact = {true}><Home /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/signup"><SignUp /></Route>
                    <Route path="/dashboard"><DashBoard /></Route>
                    <Route path="/products"><Products /></Route>
                    <Route path="/customers"><Customers /></Route>
                    <Route path="/bills"  exact = {true} ><Bills /></Route>
                    <Route path="/logout"><Home /></Route>
                    <Route path="/bills/newBill"><NewBill /></Route>
                    <Route path="/bills/invoice"><Invoice /></Route>
               
                </div>
            </Router>
        
    )
}

export default withRouter(NavBar)