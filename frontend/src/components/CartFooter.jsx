import { useContext } from "react"
import { CachedCartContext } from "../contexts/CachedCartContext"
import { calculateSubTotal } from "../helpers/CartMethods"

const CartFooter = () => {
    const {cachedCartItem} = useContext(CachedCartContext)
  return (
    <div className="h-[40px] bg-orange-500 font-Rubrik fixed bottom-0 w-full font-bold">
        <div className="flex justify-center items-center p-2 ">
        SubTotal: ₹{((calculateSubTotal(cachedCartItem))*83).toFixed(2).toLocaleString()}
        </div>
    </div>
  )
}

export default CartFooter
