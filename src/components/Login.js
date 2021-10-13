import {useState} from 'react'
import { withRouter } from 'react-router'
import validator from 'validator'
import {useDispatch} from 'react-redux'
import {Form , Button,Container, Row, Col} from 'react-bootstrap'
import { BsFillEnvelopeFill, BsLockFill , BsFillEyeSlashFill ,BsFillEyeFill} from "react-icons/bs";
import { startLoginUser } from '../actions/userActions'

const Login = (props) => {
    
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formError,setFormError] = useState({})
    const [passwordType,setPasswordType] = useState('password')
    const [passwordToggle,setPasswordToggle] = useState(true)

    let error = {}

    const handlePassWordToggle = () => {
        if(passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
        
        setPasswordToggle(!passwordToggle)
    }

    const handleChange = (e) => {

        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }

    }

    const handleRegister = () => {
        props.history.push('/signup')
    }

    const runValidations = () => {

        if(email.trim().length === 0){
            error.email = 'Email cannot be Blank'
        }else if(!validator.isEmail(email)) {
            error.email = 'Invalid Email Format'
        }

        if(password.length === 0){
            error.password = 'Please Enter correct Password.'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()
        let formData = {}

        if(Object.keys(error).length === 0){
            setFormError({})

            formData = {
                email : email,
                password : password
            }
            
            console.log('login Data',formData)
            dispatch(startLoginUser(formData,props.history))
        } else {
            console.log('errors',error)
            setFormError(error)
        }
}

    return(
        <div>
            <h1 style = {{ textAlign : 'center', marginTop : '20px', fontSize : '1.7rem', color : 'blue'}}>Login Here : </h1>
            <Form onSubmit = {handleSubmit} className = 'form-layout' >
                
                <Form.Group  className="mb-3" controlId="formBasicEmail">
                    <Container>
                        <Row>
                            <Form.Label column sm="1"> <BsFillEnvelopeFill/> </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" placeholder="Enter email" value = {email} name = 'email' onChange = {handleChange} />
                                {formError.email && <span className = 'text-danger' >{formError.email}</span>}
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Container>
                        <Row>
                            <Form.Label column sm="1"> <BsLockFill/> </Form.Label>
                                <Col><Form.Control type={passwordType} placeholder="Password"  value = {password} name = 'password' onChange = {handleChange}/> </Col>
                                <Col  md="auto" onClick = {handlePassWordToggle}> {passwordToggle ? <BsFillEyeSlashFill /> : <BsFillEyeFill/> } </Col>
                                {formError.password && <span className = 'text-danger'>{formError.password}</span>}
                        </Row>
                    </Container>
                </Form.Group> 
 
                &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                <Button variant="primary" type="submit">Login</Button> &nbsp; &nbsp;
                <Button variant="secondary" type="submit" onClick = {handleRegister}>Register with Us</Button>


                
                
            </Form>
        </div>
    )
}

export default withRouter(Login)