import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import createRootReducer from "../reducers";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";

export const history = createBrowserHistory();
export const devtools = process.env.NODE_ENV === 'production'
  ? applyMiddleware(routerMiddleware(history),promise,thunk)
  : composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      promise,
      thunk,
      createLogger({
        diff: true,
        collapsed: true
      })
    )
  );

/**
 * ReduxのStoreを生成する
 */
export default function configureStore() {
  return createStore(
    createRootReducer(history),
    devtools
  );
}
