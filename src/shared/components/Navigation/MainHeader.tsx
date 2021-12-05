import React from "react";
import "./MainHeader.css";
import { MainHeaderTypes } from "./NavigationTypes";

const MainHeader: React.FC<MainHeaderTypes> = (props) => {
    return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
