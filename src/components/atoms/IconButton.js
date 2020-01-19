import React from "react";
import { IconButton as UIButton } from "@material-ui/core";

const IconButton = props => (
  <UIButton
    className={props.className}
    children={props.children}
    color={props.color}
    disabled={props.disabled}
    disableRipple={props.disableRipple}
    onClick={props.onClick}
  />
);

export default IconButton;
