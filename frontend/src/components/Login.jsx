import { useContext, useState } from "react";
import axios from "axios";
import { AUTH_USER } from "../APIS/backend.api";
import { Link, useNavigate } from "react-router-dom";
import UserCartContext from "../contexts/UserCartContext";
import { CachedCartContext } from "../contexts/CachedCartContext";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const{setUserCart} = useContext(UserCartContext)
  const{setCachedCartItem} = useContext(CachedCartContext)
  const navigate = useNavigate();
  const handleLoginUser = async (e) => {
    e.preventDefault();
    console.log("login clicked!!!");
    try {
      const { data } = await axios.post(
        AUTH_USER + "/login",
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("e-comm-auth", JSON.stringify(data));
      setUserCart([])
      setCachedCartItem([])
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: Incorrect username or password.");
        } else if (error.response.status === 400) {
          console.log("Bad Request: Please check the data you have entered.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } else {
        console.log("some error occured.");
      }
    }
  };
  return (
    <>
      <div className="flex justify-center font-Rubrik font-bold">
        <form onSubmit={handleLoginUser}>
          <div className="m-1">
            <input
              type="text"
              className="w-[300px] h-[40px] rounded-md p-1 bg-[#313131] border border-gray-500"
              placeholder="enter email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              onClick={handleLoginUser}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <Link to="/auth/register">
          <div className="text-blue-500 cursor-pointer hover:underline w-fit font-bold text-xl">
            Register
          </div>
        </Link>
      </div>
    </>
  );
};

export default Login;
