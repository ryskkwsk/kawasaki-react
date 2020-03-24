import React from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import { Typography } from "@material-ui/core";

const Header = props => (
  <div>
    <AppBar position="static">
      <Toolbar className={props.classes.toolbar}>
        <Typography
          className={props.classes.logo}
          variant="h4"
          onClick={props.handleImageClick}
        >
          {"商品管理アプリケーション"}
        </Typography>
        <Button
          children={props.text}
          className={props.classes.logout}
          color={props.color}
          variant={props.variant}
          onClick={props.onClick}
        />
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
