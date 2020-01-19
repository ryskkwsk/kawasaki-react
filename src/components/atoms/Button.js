import React from "react";
import { Button as UIButton } from "@material-ui/core";

const Button = props => (
  <UIButton
    id={props.id}
    children={props.children}
    className={props.className}
    color={props.color}
    component={props.component}
    disabled={props.disabled}
    disableFocusRipple={props.disableFocusRipple}
    disableRipple={props.disableRipple}
    fullWidth={props.fullWidth}
    href={props.href}
    mini={props.mini}
    size={props.size}
    variant={props.variant}
    onClick={props.onClick}
  />
);

export default Button;
