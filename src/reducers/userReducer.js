const userInitialState = { isLoggedIn : false  }

const userReducer = (state = userInitialState, action) => {

    switch(action.type){

        case 'REGISTER_USER' : {
            return {...state}
        }

        case 'LOGIN_USER' : {
            return {...state, isLoggedIn : true}
        }

        case 'LOGOUT_USER' : {
            return {...state,isLoggedIn : false}
        }

        default : {
            return {...state}
        }
    }

}

export default userReducer