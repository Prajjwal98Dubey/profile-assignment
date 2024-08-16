import { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import CartProduct from "../components/CartProduct";
import CartFooter from "../components/CartFooter";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome";
import { CachedCartContext } from "../contexts/CachedCartContext";
import UserCartContext from "../contexts/UserCartContext";
import { ALL_CART_ITEMS_API } from "../APIS/backend.api";
import axios from "axios";
import { PRODUCTS_API } from "../APIS/products.api";

const Cart = () => {
  const { cachedCartItem, setCachedCartItem } = useContext(CachedCartContext);
  const { userCart, setUserCart } = useContext(UserCartContext);
  useEffect(() => {
    if (localStorage.getItem("e-comm-auth") && userCart.length === 0) {
      userCartItems();
    }
  }, []);
  const userCartItems = async () => {
    const { data } = await axios.get(ALL_CART_ITEMS_API, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("e-comm-auth")).token
        }`,
      },
    });
    let allCartItems = [];
    for (let i = 0; i < data.length; i++) {
      await fetch(PRODUCTS_API+`/${data[i].productId}`)
        .then((res) => res.json())
        .then((obj) =>
          allCartItems.push({ ...obj, quantity: data[i].quantity })
        );
    }
    setCachedCartItem([...allCartItems, ...cachedCartItem]);
    setUserCart([...allCartItems]);
  };
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
                cachedItem={item}
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
