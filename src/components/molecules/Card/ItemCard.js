import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Image from "../../atoms/Image.js";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "../../atoms/IconButton.js";

const ItemCard = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={<div className={classes.cardTitle}>{props.titleText}</div>}>
      </CardHeader>
      <div className={classes.cardMedia}>
        <div>
          <Image
            className={classes.cardImage}
            src={props.image}
            alt={props.titleText}
          />
        </div>
      </div>
      <CardContent>
        <Typography className={classes.cardText} color="textSecondary">
          {props.description}
          {props.descriptionText.split("\n").map((line, index) => {
            return (
              <span key={`${props.id}-${index}`}>
                {line}
                <br />
              </span>
            );
          })}
        </Typography>
        <Typography gutterBottom variant="h6" align={"right"}>
          ¥{props.priceText}
        </Typography>
        <IconButton
          className={classes.trash}
          children={<DeleteIcon onClick={props.delete} id={props.id} />}
        />
        <IconButton
          className={classes.edit}
          children={<EditIcon id={props.id} onClick={props.update} />}
        />
      </CardContent>
    </Card>
  );
};

export default ItemCard;
