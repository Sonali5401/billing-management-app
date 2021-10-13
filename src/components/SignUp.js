import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import validator from 'validator'
import {Form , Button ,Container,Row,Col} from 'react-bootstrap'
import { BsFillEyeFill, BsFillEyeSlashFill, BsPersonPlusFill, BsFillEnvelopeFill, BsFillBriefcaseFill, BsGeo, BsLockFill } from "react-icons/bs";
import './formstyle.css'
import { startRegisterUser } from '../actions/userActions'


const SignUp = (props) => {

    const dispatch = useDispatch()

    const [username,setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address,setAddress] = useState('')
    const [formError,setFormError] = useState({})
    const [passwordType,setPasswordType] = useState('password')
    const [passwordToggle,setPasswordToggle] = useState(true)


    let error = {}

    const handleChange = (e) => {

        const value = e.target.value

        if(e.target.name === 'username'){
            setUserName(value)
        } else if( e.target.name === 'email'){
            setEmail(value)
        } else if( e.target.name === 'password'){
            setPassword(value)
        } else if(e.target.name === 'businessName'){
            setBusinessName(value)
        } else if(e.target.name === 'address'){
            setAddress(value)
        }

    }

    const runValidations = () => {

        if(username.trim().length === 0){
            error.username = 'Username cannot be Blank.'
        }

        if(email.trim().length === 0){
            error.email = 'Email cannot be Blank'

        } else if(!validator.isEmail(email)) {
            error.email = 'Invalid Email Format'
        } 
        if(password.length === 0){
            error.password = 'Password cannot be Empty'
       
        } 
         if(password.length > 0 && password.length < 8 ){
            error.password = 'Password is too Short.Password length has to be 8-12 character long'
        }
         if (password.length >12 ){
            error.password = 'Password is too Long.Password length has to be 8-12 character long'
        }
    }

    const handlePassWordToggle = () => {
        if(passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
        
        setPasswordToggle(!passwordToggle)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        let formData = {}

        if(Object.keys(error).length === 0){
            setFormError({})

            formData = {
            username : username,
            email : email,
            password : password,
            businessName : businessName,
            address : address

        }

        //console.log(formData)
        dispatch(startRegisterUser(formData,props.history))

        //ResetForm

        
        } else {
            console.log('errors',error)
            setFormError(error)
        }
    }

    return(
        <div>
            <h1 style = {{ textAlign : 'center', marginTop : '20px', fontSize : '1.7rem'}}>SignUp Here : </h1>
            <Form onSubmit = {handleSubmit} className = 'form-layout' >
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Container>
                        <Row>
                            <Col md="auto" ><BsPersonPlusFill/> </Col>
                            <Col><Form.Control type="text" placeholder="Enter username" value = {username} name = 'username' onChange = {handleChange}  /> </Col>
                            { (formError.username)  && <span className = 'text-danger' style = {{textAlign : 'center'}}>{formError.username}</span>}
                        </Row>
                    </Container>  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Container>
                        <Row>
                            <Col md="auto" ><BsFillEnvelopeFill/> </Col>
                            <Col><Form.Control type="email" placeholder="Enter email" value = {email} name = 'email' onChange = {handleChange}   /> </Col>
                            { formError.email  && <span  className = 'text-danger' style = {{textAlign : 'center'}}>{formError.email}</span>}
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBuisnessName">
                    <Container>
                            <Row>
                                <Col md="auto" ><BsFillBriefcaseFill/> </Col>
                                <Col><Form.Control type="text" placeholder="Enter Business Name" value = {businessName} name = 'businessName' onChange = {handleChange}/> </Col>
                            </Row>
                    </Container>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Container>
                        <Row>
                            <Col md="auto" ><BsGeo/> </Col>
                            <Col><Form.Control type="text" placeholder="Enter Address" value = {address} name = 'address' onChange = {handleChange}/> </Col>
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Container>
                        <Row>
                            <Col md="auto" ><BsLockFill/> </Col>
                            <Col><Form.Control type={passwordType} placeholder="Enter Password (8-12 characters)"  value = {password} name = 'password' onChange = {handleChange} />  </Col>
                            <Col md="auto"><span onClick = {handlePassWordToggle}> {passwordToggle ? <BsFillEyeSlashFill /> : <BsFillEyeFill/> }</span> </Col>
                            { formError.password  && <span  className = 'text-danger' style = {{textAlign : 'center'}}>{formError.password} </span>}
                            </Row>
                            </Container>
                </Form.Group>

                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
                <Button variant="primary" type="submit" className = 'my-2'>
                    Register
                </Button> &nbsp;
                <Link to = '/login'> Already a User ? Click here to Login</Link>
                </Form>
        </div>
    )
}

export default withRouter(SignUp)