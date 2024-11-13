import { createContext,useEffect,useState } from "react";
import { BannerContent, ProductList,DownBannerContent, Down_2_BannerContent, Down_3_BannerContent, FAQList } from "../assets/assets";
import authSvc from "../pages/LoginPage/auth.service";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    // Initialize the cartList state as an empty array
    const [cartList, setCartList] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
   
    const addToCartList = (product) => {
        setCartList(prevCartList => {
        //   console.log("Cart list after adding:", [...prevCartList, product]); // Debug: log updated cart list
          return [...prevCartList, product]; // Ensure selected size is added
        });
      };

      const removeFromCartList = (productId) => {
        setCartList(prevCartList => prevCartList.filter(item => item._id !== productId ));
      };
    const contextValue ={
        ProductList,
        BannerContent,
        DownBannerContent,
        Down_2_BannerContent,
        Down_3_BannerContent,
        FAQList,
        cartList,
        addToCartList,
        removeFromCartList,
    }  

    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
        
    )
}
export default StoreContextProvider