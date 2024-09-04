import { createContext,useState } from "react";
import { BannerContent, ProductList,DownBannerContent, Down_2_BannerContent, Down_3_BannerContent, FAQList } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    // Initialize the cartList state as an empty array
    const [cartList, setCartList] = useState([]);

    // Function to add items to the cart
    const addToCartList = (product) => {
        setCartList([...cartList, product]);
    }
    const contextValue ={
        ProductList,
        BannerContent,
        DownBannerContent,
        Down_2_BannerContent,
        Down_3_BannerContent,
        FAQList,
        cartList,
        addToCartList,
    }
    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider