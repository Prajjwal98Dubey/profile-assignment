import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import NavBar from "../components/NavBar"
import CartProduct from "../components/CartProduct"

const Cart = () => {
    const {cartItems} = useContext(CartContext)

  return (
    <>
    {console.log(cartItems)}
    <NavBar/>
    <div className="font-Rubrik">
        {cartItems.map((item)=><CartProduct key={item.id} itemId={item.id} itemQuantity={item.quantity}/>)}
    </div>
    </>
  )
}

export default Cart
