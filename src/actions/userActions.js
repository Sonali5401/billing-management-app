import axios from '../config/axiosConfig'
import Swal from 'sweetalert2'

export const loginUser = () => {
    return {
        type : 'LOGIN_USER'
    }
}

export const registerUser = () => {
    return {
        type : 'REGISTER_USER'
    }
}

export const logOutUser = () => {
    return {
        type : 'LOGOUT_USER'
    }
}

/* REGISTER USER : MIDDLEWARE */
export const startRegisterUser = (formData,history, handleAuth ) => {
    return ((dispatch) => {

         axios.post('/users/register',formData)
            .then((response) => {
                const result = response.data
                
                if(result.hasOwnProperty('errmsg')){
                    alert(result.errmsg)
                    alert('User already exist. Please choose another Username and Email.')
                } else {
                    dispatch(registerUser())
                    alert('Successfully Created New Account')
                    history.push('/login')
                    handleAuth()
                }
            })
            .catch((error) => {
                alert(error.message)
            })


    })
}

/* LOGIN USER : MIDDLEWARE */
export const startLoginUser = (formData,history) =>{
    return (dispatch) => {
        axios.post('/users/login',formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                        
                    } else {
                        alert("Successfully Logged in")
                        console.log('token', result.token)
                        localStorage.setItem('token',result.token)
                        dispatch(loginUser())
                        history.push('/dashboard')
                       
                    }
                })
                .catch((error) => {
                    alert(error.message)
                })
    }

}



