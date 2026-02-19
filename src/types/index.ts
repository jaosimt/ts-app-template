import { ReactNode } from "react";

export type WindowPortalProps = {
    children: ReactNode;
    title?: string;
    onClose?: Function
};

export type ModalProps = {
    children: ReactNode;
    title?: string;
    onClose?: Function
    closeOnOutsideClick?: boolean,
    showClose?: boolean,
    width?: string | number

}