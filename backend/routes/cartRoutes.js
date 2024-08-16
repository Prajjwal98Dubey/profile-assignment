const {
  handleAddToCart,
  handleDecrementQuantity,
  handleRemoveFromCart,
  allCartItems,
} = require("../controllers/cartControllers");
const authMiddleware = require("../middlewares/authMiddleware");
 const cartRouter = require("express").Router();

cartRouter.route("/add-cart").post(authMiddleware, handleAddToCart);
cartRouter
  .route("/decrement-cart")
  .get(authMiddleware, handleDecrementQuantity);
cartRouter.route("/remove-cart").delete(authMiddleware, handleRemoveFromCart);

cartRouter.route("/all-cart-items").get(authMiddleware,allCartItems)

module.exports = cartRouter;
