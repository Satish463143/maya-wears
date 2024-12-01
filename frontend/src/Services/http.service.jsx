import axiosInstance from "../config/axios.config";

class HttpService {
  #headers = {}
  #params = {}
  #setHeaders = (config) => {
    if (config && config.auth) {
      const token = localStorage.getItem("_at") || null
      if (!token) {
        throw { message: "Login first" }
      } else {
        this.#headers = {
          ...this.#headers,
          "Authorization": "Bearer " + token,
        }
      }
    }
    // If handling file uploads
    if (config && config.file) {
      this.#headers = {
        ...this.#headers,
        "Content-Type": "multipart/form-data",
      };
    }
    if (config && config.params) {
      this.#params={
        ...config.params
      }
    }
  };

  // Method to handle POST requests
  postRequest = async (url, data = {}, config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.post(url, data, {
        headers: { ...this.#headers },
        params:{...this.#params}
      });
      return response;
    } catch (exception) {
      console.log(exception)
      throw exception;
    }
  };


  getRequest = async (url, config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.get(url, {
        headers: { ...this.#headers },
        params:{...this.#params}
      });

      return response;
    } catch (exception) {
      throw exception;
    }
  };

  putRequest= async (url,data={}, config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.put(url,data, {
        headers: { ...this.#headers },
        params:{...this.#params}
      });

      return response;
    } catch (exception) {
      console.log(exception, 'here it is') 
      throw exception;
    }
  };
  deleteRequest = async (url, config = {}) => {
    try {
      // Call the private method to set headers
      this.#setHeaders(config);

      const response = await axiosInstance.delete(url, {
        headers: { ...this.#headers },
        params:{...this.#params}
      });

      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

export default new HttpService(); // Default export for an instance
export { HttpService };