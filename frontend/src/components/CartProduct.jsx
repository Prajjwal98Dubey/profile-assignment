import { useContext, useEffect, useState } from "react";
import { discountedPrice } from "../helpers/discountedPrice";
import { TRASH_ICON } from "../assets/icons";
import { CartContext } from "../contexts/CartContext";
import {
  calculateProductSubtotal,
  handleAddToCart,
  handleDecrementQuantity,
  removeFromCart,
} from "../helpers/CartMethods";
import { CachedCartContext } from "../contexts/CachedCartContext";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const CartProduct = ({ itemQuantity,cachedItem }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const { cartItems, setCartItems } = useContext(CartContext);
  const { cachedCartItem, setCachedCartItem } = useContext(CachedCartContext);
  useEffect(() => {
    itemDetail();
  }, []);
  const itemDetail = () => {
    setItem(cachedItem)
    setIsLoading(false)
  };
  const toastRemoveFromCart = () => {
    toast(`${item.title} removed !!!`, {
      position: "bottom-left",
      autoClose: 1500,
    });
  };
  return (
    <>
      {!isLoading && (
        <div className="w-full flex justify-center mb-2 mt-2">
          <div className="w-[80%] rounded-md border border-gray-300 flex justify-center ">
            <div className="flex justify-center items-center w-[20%]">
              <img
                src={item.thumbnail}
                alt="loading"
                loading="lazy"
                className="w-[65%] h-[100%]"
              />
            </div>
            <div className="flex justify-start items-center m-1 w-[35%] h-full">
              <div>
                <div className="font-bold flex justify-start w-full max-h-fit lg:text-[20px] md:text-[15px] xsm:text-[8px]">
                  {item.title}
                </div>
                <div className="flex justify-start">
                  <div className="flex justify-start font-semibold text-gray-300 w-full">
                    <span className="flex justify-center items-center lg:mr-[6px] md:mr-[4px] xsm:mr-[2px] font-extrabold lg:text-[16px] md:text-[12px] xsm:text-[7px]">
                      ₹
                      {parseFloat(
                        discountedPrice(item.price, item.discountPercentage)
                      ).toLocaleString()}
                    </span>
                    <span className=" lg:text-[16px] md:text-[12px] xsm:text-[7px] flex justify-center items-center text-gray-400 line-through ">
                      ₹
                      {parseFloat(
                        (item.price * 83).toFixed(2)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-green-500 lg:[16px] md:text-[12px] xsm:text-[7px] font-bold flex justify-start">
                  {item.discountPercentage}% off
                </div>
                <div
                  className="flex justify-start  p-1 hover:bg-[#4a4848] cursor-pointer w-fit rounded-md"
                  onClick={() => {
                    removeFromCart(
                      item,
                      cartItems,
                      setCartItems,
                      cachedCartItem,
                      setCachedCartItem
                    );
                    toastRemoveFromCart();
                  }}
                >
                  <img
                    src={TRASH_ICON}
                    alt="loading"
                    loading="lazy"
                    className="lg:w-[21px] lg:h-[21px] md:[18px] md:h-[18px] xsm:w-[10px] xsm:h-[10px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[35%] flex justify-center">
              <div className="flex items-center ">
                <div className="border border-gray-400 lg:w-[60px] md:w-[40px] xsm:w-[20px]">
                  <button
                    className="font-semibold w-full flex justify-center items-center hover:bg-[#423d3d]"
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
                <div className="lg:w-[60px] md:w-[40px] xsm:w-[20px] border border-gray-400 flex justify-center items-center">
                  {itemQuantity}
                </div>
                <div className="border lg:w-[60px] md:w-[40px] xsm:w-[20px] border-gray-400">
                  <button
                    className=" font-semibold w-full flex justify-center items-center hover:bg-[#423d3d]"
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
            <div className="w-[30%] flex justify-center items-center font-bold lg:text-[20px] md:text-[15px] xsm:text-[8px]">
              ₹
              {calculateProductSubtotal(
                item.price,
                item.discountPercentage,
                itemQuantity
              ).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProduct;
