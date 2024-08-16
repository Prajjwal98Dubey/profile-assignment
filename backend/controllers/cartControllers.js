const Cart = require("../models/cart.model");
const User = require("../models/user.model");

const handleAddToCart = async (req, res) => {
  const { prodId } = req.body;
  const user = req.user;
  try {
    const currUser = await User.findOne({ username: user });
    let isProductPresentInCart = await Cart.findOne({
      $and: [{ productId: prodId }, { user: currUser._id }],
    });
    if (isProductPresentInCart === null) {
      await Cart.create({
        productId: prodId,
        quantity: 1,
        user: currUser._id,
      });
      return res.status(201).json({
        productId: prodId,
        quantity: 1,
      });
    } else {
      await Cart.findByIdAndUpdate(
        { _id: isProductPresentInCart._id },
        { quantity: isProductPresentInCart.quantity + 1 }
      );
      return res.status(201).json({
        productId: prodId,
        quantity: isProductPresentInCart.quantity + 1,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const handleRemoveFromCart = async (req, res) => {
  const prodId = req.query.prodId;
  const user = req.user;
  try {
    let currUser = await User.findOne({ username: user });
    await Cart.deleteOne({
      $and: [{ productId: prodId }, { user: currUser._id }],
    });
    return res.status(201).json({ msg: "removed from cart." });
  } catch (error) {
    console.log("some error during removal from cart.");
  }
};

const handleDecrementQuantity = async (req, res) => {
  const prodId = req.query.prodId;
  const user = req.user;
  try {
    const currUser = await User.findOne({ username: user });
    const currCart = await Cart.findOne({
      $and: [{ productId: prodId }, { user: currUser }],
    });
    await Cart.findByIdAndUpdate(
      { _id: currCart._id },
      {
        quantity: currCart.quantity - 1,
      }
    );
    return res.status(201).json({
      productId: prodId,
      quantity: currCart.quantity - 1,
    });
  } catch (error) {
    console.log("some error occured during decrement of quantuity.");
  }
};

const allCartItems = async(req,res)=>{
    const user = req.user
    try {
        const currUser=  await User.findOne({username:user})
        const userCartItems = await Cart.find({user:currUser._id}).select("-user")
        return res.status(201).json(userCartItems)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  handleAddToCart,
  handleRemoveFromCart,
  handleDecrementQuantity,
  allCartItems
};
