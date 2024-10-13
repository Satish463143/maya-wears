import axiosInstance from "../config/axios.config";

class HttpService {
    #headers={}
    #setHeaders=(config)=>{
        if(config && config.auth){

        }
        // If handling file uploads
        // if (config && config.file) {
        // this.#headers = {
        //     ...this.#headers,
        //     "Content-Type": "multipart/form-data",
        // };
        // }
  };

  // Method to handle POST requests
  postRequest = async (url, data = {}, config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.post(url, data, {
        headers: { ...this.#headers },
      });

      console.log("Success: " + response);
      return response;
    } catch (exception) {
      throw exception;
    }
  };


  getRequest = async (url,  config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.get(url, {
        headers: { ...this.#headers },
      });

      console.log("Success: " + response);
      return response;
    } catch (exception) {
        console.log("get reques  error",exception)
      throw exception;
    }
  };
}

export default new HttpService(); // Default export for an instance
export { HttpService };