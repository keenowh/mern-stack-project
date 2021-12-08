import React, { CSSProperties } from "react";

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

export interface ModalOverlayTypes {
    className?: string;
    style?: CSSProperties | undefined;
    header: string;
    contentClass: string;
    onSubmit?: () => void;
    headerClass?: string;
    footerClass: string;
    footer: JSX.Element;
}

export interface MainModalTypes extends ModalOverlayTypes {
    show: boolean;
    onCancel: () => void;
}
