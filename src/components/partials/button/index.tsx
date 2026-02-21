import { ButtonProps } from '../../../interafaces';
import React, { useState } from 'react';
import './styles.scss';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { v4 as uuidv4 } from 'uuid';
import { ReactIcon } from '../index';

export function Button(props: ButtonProps) {
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