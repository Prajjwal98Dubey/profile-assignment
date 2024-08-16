import axios from "axios";
import {
  ADD_TO_CART_API,
  DECREMENT_QUANTITY_CART_API,
  REMOVE_FROM_CART_API,
} from "../APIS/backend.api";
import { discountedPrice } from "./discountedPrice";

export const handleAddToCart = async (
  selectedProduct,
  cachedCartItem,
  setCachedCartItem
) => {
  let currProductIndex = -1;
  for (let i = 0; i < cachedCartItem.length; i++) {
    if (selectedProduct.id === cachedCartItem[i].id) {
      currProductIndex = i;
      break;
    }
  }
  if (currProductIndex != -1) {
    cachedCartItem[currProductIndex].quantity += 1;

    setCachedCartItem([...cachedCartItem]);
  } else {
    let modifiedProduct = { ...selectedProduct, quantity: 1 };
    setCachedCartItem([modifiedProduct, ...cachedCartItem]);
  }
  if (localStorage.getItem("e-comm-auth")) {
    await axios.post(
      ADD_TO_CART_API,
      {
        prodId: selectedProduct.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("e-comm-auth")).token
          }`,
        },
      }
    );
  }
};

export const handleDecrementQuantity = async (
  selectedProduct,
  cachedCartItem,
  setCachedCartItem
) => {
  let selectedProductIndex = -1;
  for (let i = 0; i < cachedCartItem.length; i++) {
    if (selectedProduct.id === cachedCartItem[i].id) {
      selectedProductIndex = i;
      break;
    }
  }
  if (selectedProductIndex != -1) {
    if (cachedCartItem[selectedProductIndex].quantity === 1) {
      removeFromCart(selectedProduct, cachedCartItem, setCachedCartItem);
      if (localStorage.getItem("e-comm-auth")) {
        await axios.delete(
          REMOVE_FROM_CART_API + `?prodId=${selectedProduct.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("e-comm-auth")).token
              }`,
            },
          }
        );
      }
      return;
    }
    cachedCartItem[selectedProductIndex].quantity -= 1;
    setCachedCartItem([...cachedCartItem]);
    if (localStorage.getItem("e-comm-auth")) {
      await axios.get(
        DECREMENT_QUANTITY_CART_API + `?prodId=${selectedProduct.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("e-comm-auth")).token
            }`,
          },
        }
      );
    }
  }
};

export const removeFromCart = async (
  selectedProduct,
  cachedCartItem,
  setCachedCartItem
) => {
  let newCachedCartItems = cachedCartItem.filter(
    (item) => item.id != selectedProduct.id
  );
  setCachedCartItem(newCachedCartItems);
  if (localStorage.getItem("e-comm-auth")) {
    await axios.delete(REMOVE_FROM_CART_API + `?prodId=${selectedProduct.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("e-comm-auth")).token
        }`,
      },
    });
  }
};

export const calculateProductSubtotal = (price, discount, quantity) => {
  let priceAfterDiscount = parseFloat(discountedPrice(price, discount));
  return priceAfterDiscount * quantity;
};

export const calculateSubTotal = (cachedCartItem) => {
  /*
  let subTotal = cachedCartItem.reduce(
    (acc = 0, cumm) =>
      acc +
      calculateProductSubtotal(
        cumm.price,
        cumm.discountPercentage,
        cumm.quantity
      )
  );
  return subTotal;
  */
  let subTotal = 0;
  for (let i = 0; i < cachedCartItem.length; i++) {
    subTotal += calculateProductSubtotal(
      cachedCartItem[i].price,
      cachedCartItem[i].discountPercentage,
      cachedCartItem[i].quantity
    );
  }
  return subTotal;
};
