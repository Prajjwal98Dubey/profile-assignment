/* eslint-disable react/prop-types */
import { useState } from "react"
import UserCartContext from "./UserCartContext"

function UserCartContextProvider({children}){
    const [userCart,setUserCart] = useState([])
    return (
        <UserCartContext.Provider value={{userCart,setUserCart}}>
            {children}
        </UserCartContext.Provider>
    )
}

export default UserCartContextProvider