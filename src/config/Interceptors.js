import axios from "axios";
import Cookies from 'js-cookie';

const instance = axios.create({
  headers: {
    "Content-type": "application/json",
    "Content-type": "multipart/form-data",
  }
});

instance.interceptors.request.use(
  config =>
  {
    config.headers.common["Authorization"] = `Bearer ${Cookies.get('accessToken')}`;
    return config;
  },
  error =>
  {
    return Promise.reject(error);
  }
);

export default instance;
