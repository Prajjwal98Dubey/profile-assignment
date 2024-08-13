import { useEffect, useState } from "react"
import { PRODUCTS_API } from "../APIS/products.api"
import { SPINNER_ICON } from "../assets/icons"
import Product from "../components/Product"
import NavBar from "../components/NavBar"
import BackToHome from "../components/BackToHome"
import { Link } from "react-router-dom"

const Home = () => {
    const[products,setProducts] = useState([])
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        allProducts()
    },[])
    const allProducts = async()=>{
        await fetch(PRODUCTS_API).then((res)=>res.json()).then(({products})=>setProducts(products)).catch((err)=>console.log(err))
        setIsLoading(false)
    }
  return (
    <>
    <NavBar/>
    <div className="font-Rubrik flex justify-center mt-2 ">
        {
        isLoading ?
        <div className="flex justify-center items-center"><img src={SPINNER_ICON} alt="loading" loading="lazy" className="w-[16px] h-[16px] animate-ping" /></div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((prod)=><Product key={prod.id} prod={prod}/>)}
        </div>
        }
    </div>
    <Link to="/"><BackToHome/></Link>
    </>
  )
}

export default Home
