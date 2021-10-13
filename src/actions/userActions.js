import axios from 'axios'
import Swal from 'sweetalert2'

export const startRegisterUser = (formData,history, handleAuth ) => {
    
    return ((dispatch) => {

         axios.post('http://dct-billing-app.herokuapp.com/api/users/register',formData)
            .then((response) => {
                const result = response.data
                //console.log(' startRegisterUser : result',result)
                
                if(result.hasOwnProperty('errmsg')){
                    alert(result.errmsg)
                    alert('User already exist. Please choose another Username and Email.')
                } else {
                    
                    dispatch(registerUser())
                    Swal.fire(
                        'Successfully created new Account!',
                        'You clicked the button!',
                        'success'
                      )
                    history.push('/login')
                    handleAuth()
                }
            })
            .catch((error) => {
                alert(error.message)
            })


    })
}

export const startLoginUser = (formData,history) =>{
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',formData)
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

