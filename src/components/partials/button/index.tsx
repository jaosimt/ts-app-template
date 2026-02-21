import { ButtonProps } from '../../../interafaces';
import React, { FC, useState } from 'react';
import './styles.scss';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { v4 as uuidv4 } from 'uuid';
import ReactIcon from '../index';

const Button: FC<ButtonProps> = ({
                                     icon,
                                     iconClassName,
                                     type = 'button',
                                     align,
                                     children,
                                     width,
                                     style,
                                     ...restProps
                                 }) => {
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