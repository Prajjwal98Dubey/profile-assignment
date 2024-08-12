import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
function App() {
  return (
    <>
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
