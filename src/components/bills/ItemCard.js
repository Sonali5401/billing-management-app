import {Card,Button} from 'react-bootstrap'
import img from './../../images/shopping_cart.png'
import {useDispatch,useSelector} from 'react-redux'
import {addtoCartItem} from '../../actions/billActions'
import {findItem} from './HelperFuctions'


const ItemCard = (props) => {
    const {_id : id ,name , price} = props

    const dispatch = useDispatch()

    const items = useSelector((state) => state.products.items)
    const cartItems = useSelector((state) => state.bills.cartItems)



    const handleAddToCart = (id) =>{

      /*FINDING ADDED PRODUCT FROM THE PRODUCT LIST */
      const addItem = findItem(id,items)

      /* CHECKING IF ADDED PRODUCT IS ALREADY IN CART, HENCE INCREMENT THE QUANTITY BY 1 ELSE ADD PROPERTY CALLED QTY TO PRODUCT ITEM OBJ*/
      const existingItem = cartItems.find((ele) => ele._id === id)

      let updatedList = []
      if(existingItem){
        updatedList = cartItems.map((ele) => {
          return (ele._id === addItem._id) ? {...existingItem, qty : existingItem.qty + 1} : ele
        })
      } else {
        updatedList =  [...cartItems,{...addItem, qty : 1}]
      }

      /* DISPATCH AN ACTION TO UPDATE THE STATE OF CARTITEMS */
      dispatch(addtoCartItem(updatedList))
      
    }

    return(
        <Card style={{ width: '10rem', margin : '10px' }} className = 'shadow'>
        <Card.Img variant="top" src={img} className = 'card-img-top img-fluid' style = {{height : "5rem", width : "7rem"}} />
        <Card.Body className = 'text-center'>
          <Card.Title>{name}</Card.Title>
          <Card.Text> {price} <span>INR </span>
          </Card.Text>
          <Button variant="success" size="sm" onClick = {() => {handleAddToCart(id)}}>Add to Cart</Button>
        </Card.Body>
      </Card>
    
    )
}

export default ItemCard