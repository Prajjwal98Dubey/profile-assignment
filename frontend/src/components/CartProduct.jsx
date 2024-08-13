import { useContext, useEffect, useState } from "react";

import { discountedPrice } from "../helpers/discountedPrice";
import { SINGLE_PRODUCT_API } from "../APIS/products.api";
import { TRASH_ICON } from "../assets/icons";
import { CartContext } from "../contexts/CartContext";
import {
  calculateProductSubtotal,
  handleAddToCart,
  handleDecrementQuantity,
  removeFromCart,
} from "../helpers/CartMethods";
import { CachedCartContext } from "../contexts/CachedCartContext";

/* eslint-disable react/prop-types */
const CartProduct = ({ itemId, itemQuantity }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const { cartItems, setCartItems } = useContext(CartContext);
  const { cachedCartItem, setCachedCartItem } = useContext(CachedCartContext);
  useEffect(() => {
    itemDetail();
  }, []);
  const itemDetail = async () => {
    await fetch(SINGLE_PRODUCT_API + `${itemId}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center p-2">Loading...</div>
      ) : (
        <div className="w-full flex justify-center mb-2 mt-2">
          <div className="w-1/2 h-[150px] rounded-md border border-gray-300 flex ">
            <div className="flex justify-center items-center w-[150px]">
              <img
                src={item.thumbnail}
                alt="loading"
                loading="lazy"
                className="w-[150px] h-[100px]"
              />
            </div>
            <div className="flex justify-start items-center m-1 w-[300px]">
              <div>
                <div className="font-bold flex justify-start">{item.title}</div>
                <div className="flex justify-start">
                  <div className="flex justify-center font-semibold text-gray-300">
                    <span className="text-[15px] flex justify-center items-center m-[2px] font-extrabold">
                      ₹
                      {(
                        discountedPrice(item.price, item.discountPercentage) *
                        83
                      )
                        .toFixed(2)
                        .toLocaleString()}
                    </span>
                    <span className="text-[15px] flex justify-center items-center text-gray-400 line-through m-[2px]">
                      ₹{(item.price * 83).toFixed(2).toLocaleString()}
                    </span>
                    <span className="text-[15px] flex justify-center items-center text-green-400 m-[2px]">
                      {item.discountPercentage}% off
                    </span>
                  </div>
                </div>
                <div></div>
                <div
                  className="flex justify-start p-1 hover:bg-[#4a4848] cursor-pointer w-fit rounded-md"
                  onClick={() =>
                    removeFromCart(
                      item,
                      cartItems,
                      setCartItems,
                      cachedCartItem,
                      setCachedCartItem
                    )
                  }
                >
                  <img
                    src={TRASH_ICON}
                    alt="loading"
                    loading="lazy"
                    className="w-[16px] h-[18px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[300px] flex justify-start">
              <div className="flex  items-center ">
                <div className="border border-gray-400">
                  <button
                    className="text-[5xl] font-semibold w-[50px] flex justify-center items-center hover:bg-[#423d3d]"
                    onClick={() =>
                      handleDecrementQuantity(
                        item,
                        cartItems,
                        setCartItems,
                        cachedCartItem,
                        setCachedCartItem
                      )
                    }
                  >
                    -
                  </button>
                </div>
                <div className="w-[50px] border border-gray-400 flex justify-center items-center">
                  {itemQuantity}
                </div>
                <div className="border border-gray-400">
                  <button
                    className="text-[5xl] font-semibold w-[50px] flex justify-center items-center hover:bg-[#423d3d]"
                    onClick={() =>
                      handleAddToCart(
                        item,
                        cartItems,
                        setCartItems,
                        cachedCartItem,
                        setCachedCartItem
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[200px] flex justify-center items-center font-bold">
              ₹
              {(
                calculateProductSubtotal(
                  item.price,
                  item.discountPercentage,
                  itemQuantity
                ) * 83
              )
                .toFixed(2)
                .toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProduct;
