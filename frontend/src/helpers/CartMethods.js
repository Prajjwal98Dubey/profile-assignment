import { discountedPrice } from "./discountedPrice";

export const handleAddToCart = (
  selectedProduct,
  cartItems,
  setCartItems,
  cachedCartItem,
  setCachedCartItem
) => {
  let currProductIndex = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (selectedProduct.id === cartItems[i].id) {
      currProductIndex = i;
      break;
    }
  }
  if (currProductIndex != -1) {
    cartItems[currProductIndex].quantity += 1;
    cachedCartItem[currProductIndex].quantity += 1;
    setCartItems([...cartItems]);
    setCachedCartItem([...cachedCartItem]);
  } else {
    setCartItems([{ id: selectedProduct.id, quantity: 1 }, ...cartItems]);
    let modifiedProduct = { ...selectedProduct, quantity: 1 };
    setCachedCartItem([modifiedProduct, ...cachedCartItem]);
  }
};

export const handleDecrementQuantity = (
  selectedProduct,
  cartItems,
  setCartItems,
  cachedCartItem,
  setCachedCartItem
) => {
  let selectedProductIndex = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (selectedProduct.id === cartItems[i].id) {
      selectedProductIndex = i;
      break;
    }
  }
  if (selectedProductIndex != -1) {
    if (cartItems[selectedProductIndex].quantity === 1) {
      removeFromCart(
        selectedProduct,
        cartItems,
        setCartItems,
        cachedCartItem,
        setCachedCartItem
      );
      return;
    }
    cartItems[selectedProductIndex].quantity -= 1;
    cachedCartItem[selectedProductIndex].quantity -= 1;
    setCartItems([...cartItems]);
    setCachedCartItem([...cachedCartItem]);
  }
};

export const removeFromCart = (
  selectedProduct,
  cartItems,
  setCartItems,
  cachedCartItem,
  setCachedCartItem
) => {
  let newCartItems = cartItems.filter((item) => item.id != selectedProduct.id);
  let newCachedCartItems = cachedCartItem.filter(
    (item) => item.id != selectedProduct.id
  );
  setCartItems(newCartItems);
  setCachedCartItem(newCachedCartItems);
};

export const calculateProductSubtotal = (price, discount, quantity) => {
  let priceAfterDiscount = discountedPrice(price, discount);
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
