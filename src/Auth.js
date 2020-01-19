import React from "react";
import LoginPage from "./components/pages/LoginPage.js";

/**
 * ログインチェックを行うコンポーネント
 */
const Auth = props => {
  // ログインしていない場合はログイン画面を表示
  return props.isLogin ? props.children : <LoginPage />;
};

export default Auth;
