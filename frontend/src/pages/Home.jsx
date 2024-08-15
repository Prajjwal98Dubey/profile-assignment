import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { PRODUCTS_API } from "../APIS/products.api";
import { SPINNER_ICON } from "../assets/icons";

const Product = lazy(() => import("../components/Product"));
const NavBar = lazy(() => import("../components/NavBar"));
const BackToHome = lazy(() => import("../components/BackToHome"));

import { Link } from "react-router-dom";
import { CachedProductsContext } from "../contexts/CachedProductsContext";
import ProductShimmer from "../shimmers/ProductShimmer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cachedProducts, setCachedProducts } = useContext(
    CachedProductsContext
  );
  useEffect(() => {
    if (cachedProducts.length) {
      setProducts(cachedProducts);
      setIsLoading(false);
    } else {
      allProducts();
    }
  }, [cachedProducts]);
  const allProducts = async () => {
    await fetch(PRODUCTS_API)
      .then((res) => res.json())
      .then(({ products }) => {
        setProducts(products);
        setCachedProducts(products);
      })
      .catch((err) => console.log(err));
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
            {products.map((prod) => (
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
