import { ReactNode } from 'react';

export type WindowPortalProps = {
    children: ReactNode;
    title?: string;
    onClose?: Function;
    openOnNextScreen?: boolean; // IF AVAILABLE!
};

export type ModalProps = {
    children: ReactNode;
    title?: string;
    onClose?: Function
    closeOnOutsideClick?: boolean;
    closeOnEscKey?: boolean;
    showClose?: boolean;
    width?: string | number;
    maxZIndex?: boolean;
}