import { createContext } from "react";
import { ProductList } from "../assets/assets";

export const storeContext = createContext(null)

const StoreContextProvider = (props)=>{

    const contextValue ={
        ProductList
    }
    return(
        <storeContext.Provider value ={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider