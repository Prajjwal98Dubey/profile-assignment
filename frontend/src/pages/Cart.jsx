import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import NavBar from "../components/NavBar";
import CartProduct from "../components/CartProduct";
import CartFooter from "../components/CartFooter";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <>
      <NavBar />
      <div className="font-Rubrik">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center font-Rubrik font-bold p-4">
            no items added...
          </div>
        ) : (
          <div className="mb-12">
            {cartItems.map((item) => (
              <CartProduct
                key={item.id}
                itemId={item.id}
                itemQuantity={item.quantity}
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
