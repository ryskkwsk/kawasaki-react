import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import item from "./itemReducer";
import auth from "./authReducer";
import message from "./messageReducer";

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    item,
    auth,
    message
  });

export default reducers;
