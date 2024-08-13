/* eslint-disable react/prop-types */

import { useContext } from "react";
import { discountedPrice } from "../helpers/discountedPrice";
import { CartContext } from "../contexts/CartContext";
import { handleAddToCart } from "../helpers/CartMethods";
import { CachedCartContext } from "../contexts/CachedCartContext";
import { toast } from "react-toastify";

/// [{id:1,qunatity:1}]
const Product = ({ prod }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { cachedCartItem, setCachedCartItem } = useContext(CachedCartContext);
  const toastAddToCart = () => {
    toast(`${prod.title} added !!!`,{
      position:'top-center',
      autoClose:1500
    })
  };
  return (
    <div className="w-[320px] h-[250px] rounded-md hover:bg-[#4b4949]">
      <div>
        <img
          src={prod.thumbnail}
          alt="loading"
          loading="lazy"
          className="w-full h-[120px]"
        />
      </div>
      <div className="flex justify-center font-bold">{prod.title}</div>
      <div className="flex justify-center font-semibold text-gray-300">
        <span className="text-[15px] flex justify-center items-center m-[2px] font-extrabold">
          ₹
          {(discountedPrice(prod.price, prod.discountPercentage) * 83)
            .toFixed(2)
            .toLocaleString()}
        </span>
        <span className="text-[15px] flex justify-center items-center text-gray-400 line-through m-[2px]">
          ₹{(prod.price * 83).toFixed(2).toLocaleString()}
        </span>
        <span className="text-[15px] flex justify-center items-center text-green-400 m-[2px]">
          {prod.discountPercentage}% off
        </span>
      </div>
      <div className="flex justify-center m-1">
        <button
          className="w-1/2 h-[30px] bg-orange-600 rounded-md hover:bg-orange-700 cursor-pointer"
          onClick={() => {
            handleAddToCart(
              prod,
              cartItems,
              setCartItems,
              cachedCartItem,
              setCachedCartItem
            );
            toastAddToCart();
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Product;
