import { createContext } from "react";
import { ProductList } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const contextValue ={
        ProductList
    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider