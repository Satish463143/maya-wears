import { createContext } from "react";
import { BannerContent, ProductList,DownBannerContent } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const contextValue ={
        ProductList,
        BannerContent,
        DownBannerContent,
    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider