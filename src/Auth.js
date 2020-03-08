import React from "react";
import LoginPage from "./components/pages/LoginPage.js";
import { connect } from "react-redux";

/**
 * Reduxのstateをpropsに展開する
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
/**
 * ログインチェックを行うコンポーネント
 */
const Auth = props => {
  // ログインしていない場合はログイン画面を表示
  return props.auth.isLogin ? props.children : <LoginPage />;
};

export default connect(mapStateToProps)(Auth);