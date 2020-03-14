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
import NotFound from "./components/pages/error/NotFound.js";

/**
 * Reduxのactionをpropsに展開する
 */
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authAction, dispatch)
  };
}

/**
 * ルーティングを行い表示画面を切り替えるコンポーネント
 */
class App extends React.Component {
  render = () => (
    <div>
      <Switch>
        {/* 認証が不要なルーティング */}
        <Route exact path="/login" component={LoginPage} />
        <Route path="/token/:token" component={Token} />
        {/* 認証が必要なルーティング */}
        <Auth>
          <Switch>
            <Route path="/" component={ItemListPage} />
          </Switch>
        </Auth>
        <Route exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default connect(mapDispatchToProps)(App);
