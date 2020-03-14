import React from "react";
import { Button } from "@material-ui/core";

const InputFile = props => (
  <div>
    <input
      style={{ display: "none" }}
      type="file"
      id={props.id}
      accept={props.accept}
      onChange={props.onChange}
    />
    <label htmlFor={props.id}>
      <Button
        className={props.className}
        children={props.children || "ファイルを選択"}
        component="span"
        color={props.color}
        variant={props.variant || "outlined"}
        id={props.id}
        disabled={props.disabled}
        disableFocusRipple={props.disableFocusRipple}
        disableRipple={props.disableRipple}
        fullWidth={props.fullWidth}
        href={props.href}
        mini={props.mini}
        size={props.size}
        onClick={props.onClick}
      />
    </label>
  </div>
);

export default InputFile;
