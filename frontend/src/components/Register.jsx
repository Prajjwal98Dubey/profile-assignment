import axios from "axios";
import { useContext, useState } from "react";
import { AUTH_USER } from "../APIS/backend.api";
import { Link, useNavigate } from "react-router-dom";
import UserCartContext from "../contexts/UserCartContext";
import { CachedCartContext } from "../contexts/CachedCartContext";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserCart } = useContext(UserCartContext);
  const{setCachedCartItem} = useContext(CachedCartContext)


  const navigate = useNavigate();
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      AUTH_USER + "/register",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("e-comm-auth", JSON.stringify(data));
    setUserCart([]);
    setCachedCartItem([])
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-center font-Rubrik font-bold">
        <form onSubmit={handleRegisterUser}>
          <div className="m-1">
            <input
              type="text"
              className="w-[300px] h-[40px] rounded-md p-1 bg-[#313131] border border-gray-500"
              placeholder="enter username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="m-1">
            <input
              type="text"
              className="w-[300px] h-[40px] rounded-md p-1 bg-[#313131] border border-gray-500"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-1">
            <input
              type="password"
              placeholder="enter password"
              className="w-[300px] h-[40px] rounded-md p-1 bg-[#313131] border border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="m-1 flex justify-center">
            <button
              type="submit"
              className="w-[200px] h-[35px] rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer"
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <Link to="/auth/login">
          <div className="text-blue-500 cursor-pointer hover:underline w-fit font-bold text-xl">
            Login
          </div>
        </Link>
      </div>
    </>
  );
};

export default Register;
