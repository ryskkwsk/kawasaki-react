import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import * as authAction from "./actions/authAction";

import Auth from "./Auth";
import Token from "./Token";

import LoginPage from "./components/pages/LoginPage.js";
import ItemListPage from "./components/pages/ItemListPage.js";

/**
 * Reduxのstateをpropsに展開する
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

/**
 * Reduxのactionをpropsに展開する
 */
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authAction, dispatch)
  };
}

/**
 * 認証とルーティングを行う
 */
class App extends React.Component {
  render = () => (
    <div>
      <Switch>
        {/* 認証が不要なルーティング */}
        <Route exact path={"/login"} component={LoginPage} />
        <Route path={"/token/:token"} component={Token} />
        {/* 認証が必要なルーティング */}
        <Auth isLogin={this.props.auth.isLogin}>
          <Switch>
            <Route exact path={"/"} component={ItemListPage} />
            <Route exact path={"/items"} component={ItemListPage} />
            <Route exact component={ItemListPage} />
          </Switch>
        </Auth>
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
