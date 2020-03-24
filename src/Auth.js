import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';

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
  return props.auth.isLogin ? props.children :  <Redirect to={props.history.push('/login')} />;
};

export default withRouter(connect(mapStateToProps)(Auth));
