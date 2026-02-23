import { UseFormRegisterReturn } from "react-hook-form";
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { IconType } from "react-icons";
import { CSSColors, CSSUnit } from '../types';

export interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
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
    setRef?: Dispatch<SetStateAction<HTMLElement | null>>;
    type?: HTMLInputTypeAttribute;
    width?: CSSUnit;
}

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundColor?: CSSColors;
    borderRadius?: CSSUnit
    borderColor?: CSSColors;
    boxClassName?: string;
    title?: string;
    titleColor?: CSSColors;
    titleBackgroundColor?: CSSColors;
    width?: CSSUnit
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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