/* eslint-disable react/prop-types */

import { useContext } from "react";
import { discountedPrice } from "../helpers/discountedPrice";
import { CartContext } from "../contexts/CartContext";
/// [{id:1,qunatity:1}]
const Product = ({ prod }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const handleAddToCart = (selectedProductId) => {
    let isCurrProductIdPresent = {};
    for (let i = 0; i < cartItems.length; i++) {
      if (selectedProductId === cartItems[i].id) {
        isCurrProductIdPresent = { ...cartItems[i] };
        break;
      }
    }
    if (isCurrProductIdPresent.id) {
      setCartItems([
        ...cartItems,
        {
          id: isCurrProductIdPresent.id,
          quantity: isCurrProductIdPresent.quantity + 1,
        },
      ]);
    } else {
      setCartItems([{ id: selectedProductId, quantity: 1 }, ...cartItems]);
    }
  };
  return (
    <div className="w-[320px] h-[250px] border border-purple-600 rounded-md">
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
          {Math.round(
            discountedPrice(prod.price, prod.discountPercentage) * 83
          ).toLocaleString()}
        </span>
        <span className="text-[15px] flex justify-center items-center text-gray-400 line-through m-[2px]">
          ₹{Math.round(prod.price * 83).toLocaleString()}
        </span>
        <span className="text-[15px] flex justify-center items-center text-green-400 m-[2px]">
          {prod.discountPercentage}% off
        </span>
      </div>
      <div className="flex justify-center m-1">
        <button
          className="w-1/2 h-[30px] bg-orange-600 rounded-md hover:bg-orange-700 cursor-pointer"
          onClick={() => handleAddToCart(prod.id)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Product;
