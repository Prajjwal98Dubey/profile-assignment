import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { PRODUCTS_API } from "../APIS/products.api";
import { SPINNER_ICON } from "../assets/icons";

const Product = lazy(() => import("../components/Product"));
const NavBar = lazy(() => import("../components/NavBar"));
const BackToHome = lazy(() => import("../components/BackToHome"));

import { Link } from "react-router-dom";
import { CachedProductsContext } from "../contexts/CachedProductsContext";
import ProductShimmer from "../shimmers/ProductShimmer";
import axios from "axios";
import { ALL_CART_ITEMS_API } from "../APIS/backend.api";
import { CachedCartContext } from "../contexts/CachedCartContext";
import UserCartContext from "../contexts/UserCartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cachedProducts, setCachedProducts } = useContext(
    CachedProductsContext
  );
  const { cachedCartItem, setCachedCartItem } = useContext(CachedCartContext);
  const { userCart, setUserCart } = useContext(UserCartContext);
  useEffect(() => {
    if (cachedProducts.length) {
      setProducts(cachedProducts);
      setIsLoading(false);
    } else {
      allProducts();
    }
  }, [cachedProducts]);
  useEffect(() => {
    if (localStorage.getItem("e-comm-auth") && userCart.length === 0) {
      userCartItems();
    }
  }, []);
  const userCartItems = async () => {
    const { data } = await axios.get(ALL_CART_ITEMS_API, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("e-comm-auth")).token
        }`,
      },
    });
    let allCartItems = [];
    for (let i = 0; i < data.length; i++) {
      await fetch(PRODUCTS_API + `/${data[i].productId}`)
        .then((res) => res.json())
        .then((obj) =>
          allCartItems.push({ ...obj, quantity: data[i].quantity })
        );
    }
    setCachedCartItem([...allCartItems, ...cachedCartItem]);
    setUserCart([...allCartItems]);
  };
  const allProducts = async () => {
    await fetch(PRODUCTS_API)
      .then((res) => res.json())
      .then(({ products }) => {
        setProducts(products);
        setCachedProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };
  return (
    <>
      <NavBar />
      <div className="font-Rubrik flex justify-center mt-2 ">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <img
              src={SPINNER_ICON}
              alt="loading"
              loading="lazy"
              className="w-[16px] h-[16px] animate-ping"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length===0 ? <div className="text-white font-bold">no products to display.</div> : products.map((prod) => (
              <Suspense key={prod.id} fallback={<ProductShimmer />}>
                <Product prod={prod} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
      <Link to="/">
        <BackToHome />
      </Link>
    </>
  );
};

export default Home;
