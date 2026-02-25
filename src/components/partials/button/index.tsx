import { FC, HTMLAttributes, useState } from 'react';
import './styles.scss';
import { IconType } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import { CSSUnit } from '../../../types';
import ReactIcon from '../index';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    align?: 'left' | 'center' | 'right' | 'space-between';
    disabled?: boolean;
    icon?: IconType;
    iconClassName?: string;
    type?: 'button' | 'submit' | 'reset';
    width?: CSSUnit;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        icon,
        iconClassName,
        type = 'button',
        align,
        children,
        width,
        style,
        ...restProps
    } = props;

    const [uid] = useState(`${type}-${uuidv4()}`);

    return (
        <button {...restProps} id={uid} type={type} data-component={'button'}
                style={{...style, width: width, justifyContent: align}}>
            {icon && <ReactIcon className={iconClassName} icon={icon}/>}
            {children}
        </button>
    );
}

export default Button;