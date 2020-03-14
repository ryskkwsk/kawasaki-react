import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authAction from "./actions/authAction";

function mapStateToProps(state) {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return { authAction: bindActionCreators(authAction, dispatch) };
}

/**
 * サーバー側で発行されるAPIアクセストークンをCookieに保存する
 */
class Token extends Component {
  constructor(props) {
    super(props);
    // トークンの取得と保存
    this.props.authAction.login(props.match.params.token);
  }

  /**
   * TOPページにリダイレクトする
   */
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Token);
