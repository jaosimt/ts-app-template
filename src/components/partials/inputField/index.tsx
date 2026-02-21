import { InputFieldProps } from '../../../interafaces';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { FaCircleXmark } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { classNames } from '../../../utils';
import { v4 as uuidv4 } from 'uuid';
import { ReactIcon } from '../index';

export function InputField(props: InputFieldProps) {
    const {
        icon,
        className,
        setRef,
        type,
        label,
        labelWith = 'auto',
        labelAlign,
        placeHolder,
        min,
        max,
        labelColor,
        fieldRegister,
        error,
        ...restProps
    } = props;

    const [styles, setStyles] = useState({
        zIndex: -777,
        opacity: 0
    });

    const [inputRef, setInputRef] = useState(null as HTMLElement | null);
    const [uid] = useState(`${fieldRegister.name}-${uuidv4()}`);

    useEffect(() => {
        /* For some reason ref is spewing errors that override the validation errors
           As elementary as this is, I'm leaving it here for now! */

        const el = document.getElementById(uid);
        if (!inputRef && el) {
            setInputRef(el);
            setRef?.(el);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setStyles({
            zIndex: error ? 1 : -777,
            opacity: error ? 1 : 0
        });
    }, [error]);

    return (
        <div data-component={'input-field'} className={'display-flex align-items-center'}>
            <label style={{width: labelWith, justifyContent: labelAlign, color: labelColor}} htmlFor={uid}
                   className={'display-flex align-items-center gap-0p5'}>
                {icon && <ReactIcon icon={icon} className={'align-self-center'}/>}
                {label && label}
            </label>
            <div className={'position-relative display-flex'}>
                <input
                    type={type || 'text'}
                    min={min}
                    max={max}
                    placeholder={placeHolder}
                    className={classNames(className && '', error && 'border-error')}
                    id={uid} {...fieldRegister} {...restProps}
                />
                <Tippy
                    content={error}
                    animation={true}
                    theme={'error'}
                >
                    <span data-popper-arrow className={'error position-absolute'} style={styles} onClick={() => {
                        (inputRef as HTMLTextAreaElement)?.select();
                        inputRef?.focus();
                    }}>
                        <ReactIcon icon={FaCircleXmark}/>
                    </span>
                </Tippy>
            </div>
        </div>
    );
}