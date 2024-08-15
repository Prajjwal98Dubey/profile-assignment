import { useContext } from "react";
import NavBar from "../components/NavBar";
import CartProduct from "../components/CartProduct";
import CartFooter from "../components/CartFooter";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome";
import { CachedCartContext } from "../contexts/CachedCartContext";

const Cart = () => {
  const {cachedCartItem} = useContext(CachedCartContext)
  return (
    <>
      <NavBar />
      <div className="font-Rubrik">
        {cachedCartItem.length === 0 ? (
          <div className="flex justify-center items-center font-Rubrik font-bold p-4">
            no items added...
          </div>
        ) : (
          <div className="mb-12">
            {cachedCartItem.map((item) => (
              <CartProduct
                key={item.id}
                itemQuantity={item.quantity}
                cachedItem = {item}
              />
            ))}
          </div>
        )}
      </div>
      <CartFooter />
      <Link to="/">
        <BackToHome />
      </Link>
    </>
  );
};

export default Cart;
