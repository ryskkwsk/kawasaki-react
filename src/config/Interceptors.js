import axios from "axios";
import Cookies from 'js-cookie';

/**
 * axiosのheaderの共通設定
 */

const instance = axios.create({
  headers: {
    "Content-type": "application/json",
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
