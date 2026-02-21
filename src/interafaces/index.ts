import { UseFormRegisterReturn } from "react-hook-form";
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { IconType } from "react-icons";
import { CSSUnit, HEXString, HSLString, RGBString } from '../types';

export interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
    error?: string;
    type?: HTMLInputTypeAttribute;
    setRef?: Dispatch<SetStateAction<HTMLElement | null>>;
    label?: string;
    labelWith?: string;
    labelAlign?: 'left' | 'right' | 'center';
    labelColor?: HSLString | RGBString | HEXString;
    icon?: IconType;
    placeHolder?: string;
    fieldRegister: UseFormRegisterReturn;
    min?: number;
    max?: number;
}

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    borderRadius?: CSSUnit
    borderColor?: HSLString | RGBString | HEXString;
    boxClassName?: string;
    title?: string;
    titleColor?: HSLString | RGBString | HEXString;
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