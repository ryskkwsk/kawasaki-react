import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "../../atoms/IconButton.js";

const SearchForm = props => {
  const { classes } = props;
  return (
    <Paper>
      <IconButton
        children={props.children}
        classes={props.classes}
        color={props.color}
        disabled={props.disabled}
        disableRipple={props.disableRipple}
        onClick={props.onClick}
      />
      <InputBase
        className={classes.searchField}
        value={props.searchKeyword}
        onChange={props.onChange}
        onKeyDown={e => {
          const ENTER = 13;
          if (e.keyCode === ENTER) props.onKeyDown();
        }}
        placeholder={props.placeholder}
      />
    </Paper>
  );
};

export default SearchForm;
