import React from "react";
import { Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import ItemForm from "../../molecules/Form/ItemForm.js";
import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const ItemFormDialog = props => {
  const { classes } = props;
  return (
    <Dialog
      open={props.open}
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <div className={classes.itemFormTitle}>{props.titleText}</div>
          <IconButton
            children={<CloseIcon />}
            color={"secondary"}
            onClick={props.handleClose}
          />
        </Grid>
      </DialogTitle>

      <DialogContent>
        <ItemForm
          classes={classes}
          loading={props.loading}
          item={props.item}
          formErrors={props.formErrors}
          handleTitleChange={props.handleTitleChange}
          handleDescriptionChange={props.handleDescriptionChange}
          handlePriceChange={props.handlePriceChange}
          handleImageChange={props.handleImageChange}
          handleDeleteImage={props.handleDeleteImage}
        />
      </DialogContent>

      <DialogActions>
        <Button
          children={props.disagreeText}
          variant="outlined"
          onClick={props.handleClose}
        />
        <Button
          children={props.agreeText}
          variant="outlined"
          color="primary"
          onClick={props.handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ItemFormDialog;
