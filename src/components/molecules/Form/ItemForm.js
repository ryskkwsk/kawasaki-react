import React from "react";
import InputFile from "../../atoms/InputFile.js";
import { Button } from "@material-ui/core";
import Image from "../../atoms/Image.js";
import none from "../../../images/none.png";
import TextField from "../../atoms/TextField.js";
import Grid from "@material-ui/core/Grid";
import loading from "../../../images/loading.svg";
import Typography from "@material-ui/core/Typography";

const ItemForm = props => {
  const { item, formErrors, classes } = props;
  return (
    <Grid className={classes.itemForm} container>
      <Grid item sm={12} md={6}>
        <div className={classes.itemFormImage}>
          {props.loading ? (
            <div className={classes.loading}>
              <img src={loading} alt="ローディング" width={100} />
              <Typography color="primary" variant="h6">
                LOADING
              </Typography>
            </div>
          ) : (
            <label htmlFor="itemFile">
              <Image
                className={classes.formImage}
                src={item.image || item.image_url || none}
                alt="商品画像"
              />
            </label>
          )}
        </div>
        <Grid
          container
          className={classes.formImageButtons}
          justify="space-around"
        >
          <InputFile
            id="itemFile"
            accept="image/*"
            onChange={props.handleImageChange}
          />
          {item.id && item.image_url && (
            <Button
              children="画像を削除"
              variant="outlined"
              color="secondary"
              onClick={props.handleDeleteImage.bind(null, item.id)}
            />
          )}
        </Grid>
      </Grid>
      <Grid container item justify="center" sm={12} md={6}>
        <Grid item sm={12}>
          <TextField
            autoFocus={true}
            required={true}
            label="商品名"
            margin="normal"
            fullWidth={true}
            defaultValue={item.title}
            onBlur={props.handleTitleChange}
            error={formErrors.title}
            helperText={formErrors.title || "100文字以内"}
            FormHelperTextProps={{
              error: formErrors.title
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            required={true}
            multiline={true}
            rows={4}
            label="商品説明"
            margin="normal"
            fullWidth={true}
            defaultValue={item.description}
            onBlur={props.handleDescriptionChange}
            error={formErrors.description}
            helperText={formErrors.description || "500文字以内"}
            FormHelperTextProps={{
              error: formErrors.description
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            required={true}
            label="商品価格"
            margin="normal"
            defaultValue={item.price}
            onBlur={props.handlePriceChange}
            error={formErrors.price}
            helperText={formErrors.price || ""}
            FormHelperTextProps={{
              error: formErrors.price
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemForm;
