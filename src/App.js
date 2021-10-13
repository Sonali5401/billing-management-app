import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import {loginUser} from './actions/userActions'
//import {startGetAllProducts} from './actions/productActions'

function App(props) {

  const [userLoggedIn,setUserLoggedIn] = useState(false)
  const dispatch = useDispatch()

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }



  useEffect(() => {
    //localStorage.clear()
    //console.log(props.location.pathname)

    //console.log('inside App useEffect', localStorage.getItem('token') )

    if(localStorage.getItem('token')){
      dispatch(loginUser())
    }


  },[])


  return (
    <div className="App">
      <NavBar userLoggedIn = {userLoggedIn} handleAuth = {handleAuth}/>
      
    </div>
  );
}

export default App;
/*============================================================================================*/
