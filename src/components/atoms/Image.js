import React from "react";

const Image = props => (
  <img
    className={props.className}
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    onClick={props.onClick}
  />
);

export default Image;
