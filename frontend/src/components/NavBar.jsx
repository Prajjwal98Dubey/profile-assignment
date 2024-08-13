import { Link } from "react-router-dom";
import { CART_ICON } from "../assets/icons";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const NavBar = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="h-[58px] rounded-md bg-purple-600 flex justify-center items-center mb-2 sticky top-0">
      <Link to="/cart">
        <div className="flex justify-center p-2 cursor-pointer hover:bg-purple-700 rounded-md relative">
          <img
            src={CART_ICON}
            alt="loading"
            loading="lazy"
            className="w-[20px] h-[20px]"
          />
        </div>
      </Link>
      <div className="text-[12px] font-semibold">{cartItems.length}</div>
    </div>
  );
};

export default NavBar;
