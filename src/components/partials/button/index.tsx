import { FC, HTMLAttributes, memo, useState } from 'react';
import './styles.scss';
import { IconType } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import { CSSUnit } from '../../../types';
import { parseCSSUnit } from '../../../utils';
import { ReactIcon } from '../index';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: IconType;
    align?: 'left' | 'center' | 'right' | 'space-between';
    iconClassName?: string;
    width?: CSSUnit;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        icon,
        className,
        iconClassName,
        type = 'button',
        align,
        children,
        width,
        style,
        ...restProps
    } = props;

    const [uid] = useState(`${type}-${uuidv4()}`);
    const isBtnIcon = className?.includes('btn-icon');

    return (
        <button className={className} id={uid} type={type} data-component={'button'}
                style={{...style, minWidth: parseCSSUnit(width as CSSUnit), justifyContent: align}} {...restProps}>
            {
                icon &&
                <ReactIcon className={iconClassName} style={{position: !isBtnIcon && !children ? 'absolute' : 'relative'}} size={!isBtnIcon && !children ? 21 : 14}
                           icon={icon}/>
            }
            {children}
        </button>
    );
}

export default memo(Button);