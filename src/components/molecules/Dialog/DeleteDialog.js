import React from "react";
import { Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

const DeleteDialog = props => (
  <div>
    <Dialog
      open={props.showDialog}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          children={props.disagreeText}
          variant={"outlined"}
          onClick={props.handleClose}
        />
        <Button
          children={props.agreeText}
          variant={"outlined"}
          color={"secondary"}
          onClick={props.handleDelete}
        />
      </DialogActions>
    </Dialog>
  </div>
);

export default DeleteDialog;
