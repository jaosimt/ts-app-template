import { InputFieldProps } from '../../../interafaces';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { FaCircleXmark } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { classNames, parseCSSUnit } from '../../../utils';
import { v4 as uuidv4 } from 'uuid';
import ReactIcon from '../index';

const InputField: FC<InputFieldProps> = (props) => {
    const {
        width,
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
        onKeyDown,
        ...restProps
    } = props;

    const {ref, ...restFieldRegister} = fieldRegister;

    const [styles, setStyles] = useState({
        zIndex: -777,
        opacity: 0
    });

    const idRef = useRef(`${fieldRegister.name}-${uuidv4()}`);
    const inputRef = useRef(null as HTMLInputElement | null);

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
            <label style={{width: labelWith, justifyContent: labelAlign, color: labelColor}} htmlFor={idRef.current}
                   className={'display-flex align-items-center gap-0p5'}>
                {icon && <ReactIcon icon={icon} className={'align-self-center'}/>}
                {label && label}
            </label>
            <div className={'position-relative display-flex'}>
                <input
                    style={{width: parseCSSUnit(String(width))}}
                    type={type || 'text'}
                    min={min}
                    max={max}
                    placeholder={placeHolder}
                    className={classNames(className && '', error && 'border-error')}
                    id={idRef.current}
                    ref={(e) => {
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
                {error && <Tippy
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