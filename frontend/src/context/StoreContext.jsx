import { createContext } from "react";
import { BannerContent, ProductList,DownBannerContent, Down_2_BannerContent, Down_3_BannerContent } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const contextValue ={
        ProductList,
        BannerContent,
        DownBannerContent,
        Down_2_BannerContent,
        Down_3_BannerContent,
    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider