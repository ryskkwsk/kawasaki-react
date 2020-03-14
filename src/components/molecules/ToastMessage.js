import React from "react";
import { IconButton } from "@material-ui/core";

const ToastMessage = props => (
  <div className={props.className} style={props.style}>
    {props.message}
    <IconButton children={props.closeComponent} onClick={props.onClose} />
  </div>
);

export default ToastMessage;
