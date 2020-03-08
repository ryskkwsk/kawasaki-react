import actionType from "../config/actionType";
import { Cookies } from 'react-cookie';

const TOKEN_KEY = "accessToken";
const cookies = new Cookies();
const initialAuthState = {
  accessToken: cookies.get(TOKEN_KEY),
  isLogin: cookies.get(TOKEN_KEY) !== null
};

const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      cookies.set(TOKEN_KEY, action.payload, {
        maxAge: 3600, // ログイン後1時間でクッキーが切れます
      });
      return {
        ...state,
        accessToken: action.payload,
        isLogin: true
      };
    case actionType.LOGOUT:
      cookies.remove(TOKEN_KEY);
      return {
        ...state,
        accessToken: null,
        isLogin: false
      };
    default:
      return state;
  }
};

export default reducer;
