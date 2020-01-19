import actionType from "../config/actionType";

const TOKEN_KEY = "accessToken";

const initialAuthState = {
  accessToken: localStorage.getItem(TOKEN_KEY),
  isLogin: localStorage.getItem(TOKEN_KEY) !== null
};

const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      localStorage.setItem(TOKEN_KEY, action.payload);
      return {
        ...state,
        accessToken: action.payload,
        isLogin: true
      };
    case actionType.LOGOUT:
      localStorage.removeItem(TOKEN_KEY);
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
