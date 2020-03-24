import actionType from "../actions/actionType";
import Cookies from 'js-cookie';

const TOKEN_KEY = "accessToken";
const initialAuthState = {
  accessToken: Cookies.get(TOKEN_KEY),
  isLogin: Cookies.get(TOKEN_KEY) !== undefined
};

const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      Cookies.set(TOKEN_KEY, action.payload, { expires: 60/1440 } // ログイン後1時間でクッキーが切れます
      );
      return {
        ...state,
        accessToken: action.payload,
        isLogin: true
      };
    case actionType.LOGOUT:
      Cookies.remove(TOKEN_KEY);
      return {
        ...state,
        accessToken: undefined,
        isLogin: false
      };
    default:
      return state;
  }
};

export default reducer;
