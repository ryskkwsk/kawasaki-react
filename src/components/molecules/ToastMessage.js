import React from "react";
import IconButton from "../atoms/IconButton.js";

const ToastMessage = props => (
  <div className={props.className} style={props.style}>
    {props.message}
    <IconButton children={props.closeComponent} onClick={props.onClose} />
  </div>
);

export default ToastMessage;
