import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
    <ToastContainer/>
    <RouterProvider router={appRouter}/>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/cart',
    element:<Cart/>
  }
])

export default App
