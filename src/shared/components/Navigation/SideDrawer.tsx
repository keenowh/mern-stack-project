import React from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";
import { SideDrawerTypes } from "../UIElements/UITypes";
import "./SideDrawer.css";

const SideDrawer: React.FC<SideDrawerTypes> = (props) => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("drawer-hook") as Element
    );
};
export default SideDrawer;
