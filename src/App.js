import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
    <Router>
      <div>
        <Switch>
          {/* 認証が不要なルーティング */}
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/token/:token" component={Token} />
          {/* 認証が必要なルーティング */}
          <Auth>
            <Switch>
              <Route exact={true} path="/" component={ItemListPage} />
              <Route exact={true} path="/items/search" component={ItemListPage} />
              <Route component={NotFound} />
            </Switch>
          </Auth>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(mapDispatchToProps)(App);
