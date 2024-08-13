import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import NavBar from "../components/NavBar"
import CartProduct from "../components/CartProduct"
import CartFooter from "../components/CartFooter"
import { CachedCartContext } from "../contexts/CachedCartContext"

const Cart = () => {
    const {cartItems} = useContext(CartContext)
    const {cachedCartItem} = useContext(CachedCartContext)
  return (
    <>
    <NavBar/>
    {console.log(cachedCartItem)}
    <div className="font-Rubrik">
        {cartItems.map((item)=><CartProduct key={item.id} itemId={item.id} itemQuantity={item.quantity}/>)}
    </div>
    <CartFooter/>
    </>
  )
}

export default Cart
