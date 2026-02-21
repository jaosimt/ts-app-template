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

/**
 * hsl(hue, saturation, lightness)
 * hsla(hue, saturation, lightness, alpha)
 *
 * HUE is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue.
 * SATURATION is a percentage value. 0% means a shade of gray, and 100% is the full color.
 * LIGHTNESS is also a percentage value. 0% is black, and 100% is white.
 * ALPHA is a number between 0.0 (fully transparent) and 1.0 (not transparent at all):
 */
export type HSLString = `hsl(${number},${number}%,${number}%)` | `hsla(${number},${number}%,${number}%,${number})`;
export type RGBString =
    `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`
    | '';
export type HEXString = `#${string}`;


export type CSSUnit = number | `${number}${string}`;