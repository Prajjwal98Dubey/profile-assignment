import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeShimmer from "./shimmers/HomeShimmer";
import CartShimmer from "./shimmers/CartShimmer";
import Register from "./components/Register";
import Login from "./components/Login";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={appRouter} />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<HomeShimmer />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<CartShimmer />}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path:"/auth/login",
    element:<Login/>
  }
]);

export default App;
