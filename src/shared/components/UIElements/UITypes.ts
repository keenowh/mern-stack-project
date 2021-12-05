import React from "react";

export interface AvatarTypes {
    className?: string;
    style?: {};
    image: string;
    alt: string;
    width?: number;
}

export interface CardTypes {
    className?: string;
    style?: {};
    children: React.ReactNode;
}

export interface BackdropTypes {
    onClick?: () => void;
}

export interface SideDrawerTypes {
    show: boolean;
    onClick: () => void;
}
