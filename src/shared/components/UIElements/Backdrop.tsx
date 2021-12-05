import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";
import { BackdropTypes } from "./UITypes";

const Backdrop: React.FC<BackdropTypes> = (props) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}></div>,
        document.getElementById("backdrop-hook") as Element
    );
};

export default Backdrop;
