import { UseFormRegisterReturn } from "react-hook-form";
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { IconType } from "react-icons";

export interface FormFieldProps extends React.HTMLAttributes<HTMLInputElement> {
    type?: HTMLInputTypeAttribute;
    setRef?: Dispatch<SetStateAction<HTMLElement | null>>;
    label?: string;
    labelWith?: string;
    labelAlign?: 'left' | 'right' | 'center';
    icon?: IconType;
    placeHolder?: string;
    fieldRegister: UseFormRegisterReturn;
    error?: string;

}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    setRef?: Dispatch<SetStateAction<HTMLElement | null>>;
    align?: 'left' | 'center' | 'right' | 'space-between';
    icon?: IconType;
    iconClassName?: string;
    disabled?: boolean;
    width?: string | number;
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