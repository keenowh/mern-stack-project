import React from "react";

import "./Card.css";
import { CardTypes } from "./UITypes";

const Card: React.FC<CardTypes> = (props) => {
    return (
        <div className={`card ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default Card;
