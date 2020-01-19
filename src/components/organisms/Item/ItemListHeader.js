import React from "react";
import Button from "../../atoms/Button.js";
import SearchForm from "../../molecules/Form/SearchForm.js";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

const ItemListHeader = props => {
  const { classes } = props;
  return (
    <Grid container alignItems={"center"} justify={"flex-start"}>
      <Grid item xs={12} md={8}>
        <SearchForm
          classes={classes}
          children={<SearchIcon />}
          color={"primary"}
          onClick={props.searchItem}
          searchKeyword={props.searchKeyword}
          onChange={props.onChange}
          onKeyDown={props.searchItem}
          placeholder={props.placeholder}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          className={classes.newButton}
          variant={"outlined"}
          color={"primary"}
          onClick={props.createOnClick}
          children={props.createText}
        />
      </Grid>
    </Grid>
  );
};

export default ItemListHeader;
