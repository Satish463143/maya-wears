import { createContext,useEffect,useState } from "react";
import { BannerContent, ProductList,DownBannerContent, Down_2_BannerContent, Down_3_BannerContent, FAQList } from "../assets/assets";
import authSvc from "../pages/LoginPage/auth.service";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    // Initialize the cartList state as an empty array
    const [cartList, setCartList] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(false); 
    // let [loggedIn, setLoggedIn] = useState();
   
    const addToCartList = (product) => {
        setCartList(prevCartList => {
        //   console.log("Cart list after adding:", [...prevCartList, product]); // Debug: log updated cart list
          return [...prevCartList, product]; // Ensure selected size is added
        });
      };

      const removeFromCartList = (productId) => {
        setCartList(prevCartList => prevCartList.filter(item => item._id !== productId ));
      };
      const getLoggedInUser = async()=>{
        try{
            const response = await authSvc.getRequest('/auth/me',{auth:true})
            setLoggedInUser(response.result)            
            console.log("user Detials",response.result)
        }catch(exception){
          console.log(exception)
        }
      }
      useEffect(()=>{
        getLoggedInUser()
      },[])
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
        loggedInUser,
        // loggedIn,
    }
   

    return(
        <StoreContext.Provider value ={contextValue}>
            {props.children}
        </StoreContext.Provider>
        
    )
}
export default StoreContextProvider