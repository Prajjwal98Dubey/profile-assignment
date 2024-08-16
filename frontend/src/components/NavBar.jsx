import { Link } from "react-router-dom";
import { CART_ICON } from "../assets/icons";
import { useContext } from "react";
// import { CartContext } from "../contexts/CartContext";
import { CachedCartContext } from "../contexts/CachedCartContext";

const NavBar = () => {
  // const { cartItems } = useContext(CartContext);
  const {cachedCartItem} = useContext(CachedCartContext)
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
      <div className="text-[12px] font-semibold">{cachedCartItem.length}</div>
      <div className="absolute right-10">
       {localStorage.getItem('e-comm-auth') ? <div className="w-[35px] h-[35px] rounded-full bg-[#313131]"></div> : <Link to="/auth/login">
          <button className="w-[200px] h-[38px] p-1 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md font-bold font-Rubrik">
            Login/SignUp
          </button>
        </Link>}
      </div>
    </div>
  );
};

export default NavBar;
