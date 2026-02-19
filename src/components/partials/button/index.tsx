import { ButtonProps } from '../../../interafaces';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { v4 as uuidv4 } from 'uuid';
import { ReactIcon } from '../index';

export function Button(props: ButtonProps) {
    const {
        icon,
        iconClassName,
        setRef,
        type = 'button',
        align,
        children,
        width,
        style,
        ...restProps
    } = props;

    const [buttonRef, setButtonRef] = useState(null as HTMLElement | null);
    const [uid] = useState(`${type}-${uuidv4()}`);

    useEffect(() => {
        /* For some reason ref is spewing errors that override the validation errors
           As elementary as this is, I'm leaving it here for now! */

        const el = document.getElementById(uid);
        if (!buttonRef && el) {
            setButtonRef(el);
            setRef?.(el);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button {...restProps} id={uid} type={type} data-component={'button'}
                style={{...style, width: width, justifyContent: align}}>
            {icon && <ReactIcon className={iconClassName} icon={icon}/>}
            {children}
        </button>
    );
}