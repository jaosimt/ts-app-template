import { ReactNode } from "react";

export type WindowPortalProps = {
    children: ReactNode;
    title?: string;
    onClose?: Function
};