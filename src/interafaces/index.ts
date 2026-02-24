import { UseFormRegisterReturn } from "react-hook-form";
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { IconType } from "react-icons";
import { CSSColors, CSSUnit } from '../types';

export interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
    error?: string;
    fieldRegister: UseFormRegisterReturn;
    icon?: IconType;
    label?: string;
    labelAlign?: 'left' | 'right' | 'center';
    labelColor?: CSSColors;
    labelWith?: CSSUnit;
    max?: number;
    min?: number;
    placeHolder?: string;
    setRef?: Function;
    type?: HTMLInputTypeAttribute;
    width?: CSSUnit;
}

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: CSSColors;
    border?: boolean | 'label-only';
    borderRadius?: CSSUnit
    borderColor?: CSSColors;
    boxClassName?: string;
    tight?: boolean;
    label?: string;
    labelColor?: CSSColors;
    labelBackgroundColor?: CSSColors;
    labelPosition?: 'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right';
    labelSize?: 'small'|'medium'|'large';
    width?: CSSUnit
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    align?: 'left' | 'center' | 'right' | 'space-between';
    disabled?: boolean;
    icon?: IconType;
    iconClassName?: string;
    type?: 'button' | 'submit' | 'reset';
    width?: CSSUnit;
}

export interface LoginFormInput {
    email: string;
    password: string;
}

export interface IconProps {
    icon: IconType;
    size?: number;
    className?: string;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    closeOnEscKey?: boolean;
    closeOnOutsideClick?: boolean;
    maxZIndex?: boolean;
    onClose?: Function
    showClose?: boolean;
    title?: string;
    width?: string | number;
}