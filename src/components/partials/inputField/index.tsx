import React, { FC, HTMLAttributes, HTMLInputTypeAttribute, memo, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FaCircleXmark } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { CSSColors, CSSUnit } from '../../../types';
import { classNames, parseCSSUnit } from '../../../utils';
import { v4 as uuidv4 } from 'uuid';
import { ReactIcon } from '../index';

export interface InputFieldProps extends HTMLAttributes<HTMLInputElement|HTMLTextAreaElement> {
    error?: string;
    fieldRegister: UseFormRegisterReturn;
    icon?: IconType;
    label?: string;
    labelAlign?: 'left' | 'right' | 'center' | 'space-between';
    labelColor?: CSSColors;
    labelWidth?: CSSUnit;
    max?: number;
    min?: number;
    placeHolder?: string;
    setRef?: Function;
    type?: HTMLInputTypeAttribute;
    width?: CSSUnit;
    rows?: number;
    showErrorTooltipOnCreate?: boolean;
    disabled?: boolean;
}

const InputField: FC<InputFieldProps> = (props) => {
    const {
        width,
        icon,
        className,
        setRef,
        type,
        label,
        labelWidth = 'auto',
        labelAlign,
        placeHolder,
        min,
        max,
        labelColor,
        fieldRegister,
        error,
        onKeyDown,
        rows,
        style,
        showErrorTooltipOnCreate = true,
        disabled = false,
        ...restProps
    } = props;

    const {ref, ...restFieldRegister} = fieldRegister;

    const [styles, setStyles] = useState({
        zIndex: -777,
        opacity: 0
    });

    const idRef = useRef(`${fieldRegister.name}-${uuidv4()}`);
    const inputRef = useRef(null as HTMLInputElement | null as HTMLTextAreaElement | null);

    useEffect(() => {
        localStorage.removeItem('last-input-focus');
        setRef && setRef(inputRef.current);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setStyles({
            zIndex: error ? 1 : -777,
            opacity: error ? 1 : 0
        });
    }, [error]);

    return (
        <div data-component={'input-field'} className={'display-flex align-items-center'}>
            <label style={{width: parseCSSUnit(labelWidth as CSSUnit), justifyContent: labelAlign, color: labelColor}} htmlFor={idRef.current}
                   className={'display-flex align-items-center gap-0p5'}>
                {icon && <ReactIcon icon={icon} className={'align-self-center'}/>}
                {label && label}
            </label>
            <div className={'position-relative display-flex'}>
                {
                    type !== 'textarea' && <input
                        disabled={disabled}
                        style={{...style, width: width && parseCSSUnit(width)}}
                        type={type || 'text'}
                        min={min}
                        max={max}
                        placeholder={placeHolder}
                        className={classNames(className && '', error && 'border-error')}
                        id={idRef.current}
                        ref={(e:any) => {
                            ref(e);
                            inputRef.current = e;
                        }}
                        onKeyDown={e => {
                            localStorage.setItem('last-input-focus', fieldRegister.name);
                            onKeyDown && onKeyDown(e);
                        }}
                        autoFocus={localStorage.getItem('last-input-focus') === fieldRegister.name}
                        {...restFieldRegister}
                        {...restProps}
                    />
                }
                {
                    type === 'textarea' && <textarea
                        disabled={disabled}
                        rows={rows || 3}
                        style={{...style, width: width && parseCSSUnit(width)}}
                        placeholder={placeHolder}
                        className={classNames(className && '', error && 'border-error')}
                        id={idRef.current}
                        ref={(e:any) => {
                            ref(e);
                            inputRef.current = e;
                        }}
                        onKeyDown={e => {
                            localStorage.setItem('last-input-focus', fieldRegister.name);
                            onKeyDown && onKeyDown(e);
                        }}
                        autoFocus={localStorage.getItem('last-input-focus') === fieldRegister.name}
                        {...restFieldRegister}
                        {...restProps}
                    />
                }
                {error && <Tippy
                    showOnCreate={showErrorTooltipOnCreate}
                    content={error}
                    animation={true}
                    theme={'error'}
                >
                    <span data-popper-arrow className={'error position-absolute'} style={styles} onClick={() => {
                        inputRef.current?.select();
                        inputRef.current?.focus();
                    }}>
                        <ReactIcon icon={FaCircleXmark}/>
                    </span>
                </Tippy>}
            </div>
        </div>
    );
}

export default memo(InputField);