import React from "react";
import ItemCard from "../../molecules/Card/ItemCard.js";
import none from "../../../images/none.png";

const ItemCardList = props => (
  <div className={props.classes.itemCardList}>
    {props.items.map(item => (
      <ItemCard
        classes={props.classes}
        image={item.image_url || none}
        key={item.id}
        id={item.id}
        delete={props.handleDeleteItem.bind(null, item.id)}
        update={props.handleUpdateItem.bind(null, item, "更新")}
        width={"300px"}
        height={"300px"}
        alt={item.title}
        titleText={item.title}
        descriptionText={item.description}
        priceText={item.price.toLocaleString()}
      />
    ))}
  </div>
);

export default ItemCardList;
