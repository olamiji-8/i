import axios from "axios";
import { Local_storage } from "./LocalStorageConfig";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
     config.headers.common['Api-Token'] = `${process.env.REACT_APP_API_TOKEN}`;
     config.headers.common['Accept'] = "application/json";
     config.headers.common['Authorization'] = `Bearer ${Local_storage().get('_utk')}`;
    config.baseURL = `${process.env.REACT_APP_API}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};

