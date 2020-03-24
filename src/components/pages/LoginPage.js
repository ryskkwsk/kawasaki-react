import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import login from "../../images/login.jpg";

import LoginContent from "../templates/LoginContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Image from "../atoms/Image.js";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import styles from "../../styles/loginPage";

/**
 * Reduxのstateをpropsに展開する
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

/**
 * ログイン画面
 */
class LoginPage extends Component {
  componentWillMount() {
    // ログイン済みの場合はリダイレクト
    if (this.props.auth.isLogin) {
      this.props.push("/");
    }
  }

  /**
   * GitHubのOAuth認証を行う
   */
  gitHubLogin = () => {
    window.location = process.env.REACT_APP_LOGIN_URL;
  };

  render = () => {
    const { classes } = this.props;

    return (
      <LoginContent
        main={
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Image src={login} alt="ログイン画像" width="100%" />
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  onClick={this.gitHubLogin}
                  children={
                    <div>
                      <FontAwesomeIcon className={classes.github} icon={faGithub} />GitHubでログイン
                    </div>
                  }
                />
              </div>
            </Paper>
          </main>
        }
      />
    );
  };
}

export default withStyles(styles)(
  connect(mapStateToProps, { push })(LoginPage)
);
