
import { createContext,useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    // Initialize the cartList state as an empty array
    const [cartList, setCartList] = useState([]);
   
    const addToCartList = (product) => {
        setCartList(prevCartList => {
          return [...prevCartList, product]; 
        });
      };

      const removeFromCartList = (productId) => {
        setCartList(prevCartList => prevCartList.filter(item => item._id !== productId ));
      };
    const contextValue ={
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
