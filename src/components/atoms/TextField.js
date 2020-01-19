import React from "react";
import { TextField as UITextField } from "@material-ui/core";

const TextField = props => (
  <UITextField
    className={props.className}
    autoComplete={props.autoComplete}
    autoFocus={props.autoFocus}
    defaultValue={props.defaultValue}
    disabled={props.disabled}
    error={props.error}
    FormHelperTextProps={props.FormHelperTextProps}
    fullWidth={props.fullWidth}
    helperText={props.helperText}
    id={props.id}
    InputLabelProps={props.InputLabelProps}
    InputProps={props.InputProps}
    label={props.label}
    margin={props.margin || "normal"}
    multiline={props.multiline}
    name={props.name}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    placeholder={props.placeholder}
    required={props.required}
    rows={props.rows}
    rowsMax={props.rowsMax}
    select={props.select}
    SelectProps={props.SelectProps}
    type={props.type || "text"}
    value={props.value}
    variant={props.variant}
  />
);

export default TextField;
