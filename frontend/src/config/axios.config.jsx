import axios from 'axios'

const axiosInstance = axios.create({

    //backend api call
    baseURL:import.meta.env.VITE_API_URL,
    
    //set timeout
    timeout:30000,
    timeoutErrorMessage:"Server timed out...",
      
    headers:{
        "Content-Type":"application/json"
    },
    
})


//interceptor

axiosInstance.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
   if(error.code === "ERR_BAD_REQUEST"){
    throw error.response
   }else{

   }
})
export default axiosInstance