import React, { FC, HTMLAttributes, HTMLInputTypeAttribute, memo, useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FaCircleXmark } from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import '../../../styles/tippy.scss';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSColors, CSSUnit } from '../../../constants/types';
import { useAppSelector } from '../../../hooks';
import { getTheme } from '../../../slices/theme';
import { classNames, parseCSSUnit } from '../../../utils';
import { v4 as uuidv4 } from 'uuid';
import { getButtonDefaultBorderColor, getLightShadow } from '../../../utils/themeUtils';
import { ReactIcon } from '../index';
import styled from 'styled-components';
import v from '../../../styles/variables.module.scss';

export interface InputFieldProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    error?: string;
    fieldRegister?: UseFormRegisterReturn;
    icon?: IconType;
    label?: string;
    name?: string;
    value?: string | number;
    labelAlign?: 'left' | 'right' | 'center' | 'space-between';
    labelColor?: CSSColors;
    labelWidth?: CSSUnit;
    max?: number;
    min?: number;
    step?: number;
    readOnly?: boolean;
    placeHolder?: string;
    setRef?: Function;
    type?: HTMLInputTypeAttribute;
    width?: CSSUnit;
    rows?: number;
    showErrorTooltipOnCreate?: boolean;
    disabled?: boolean;
    wrapperClassName?: string;
}

const Container = styled.div<{}>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${parseCSSUnit(v.labelPadding as CSSUnit)} 0;

    @media (max-width: 768px) {
        font-size: small;
    }
`;

const Label = styled.label<{
    $width: CSSUnit | undefined;
    $align: 'left' | 'right' | 'center' | 'space-between' | undefined;
    $color: CSSColors | undefined;
}>`
    line-height: 1.2;
    width: ${props => parseCSSUnit(props.$width as CSSUnit)};
    justify-content: ${props => props.$align};
    color: ${props => props.$color};
    display: flex;
    align-items: center;
    min-width: fit-content;
    padding-right: ${v.labelPadding};
`;

const InputWrapper = styled.div<{
    $theme?: ThemeProp;
}>`
    display: flex;
    position: relative;
    border: 1px solid ${props => getButtonDefaultBorderColor(props.$theme as ThemeProp)};
    box-shadow: ${props => `0 0 7px ${getLightShadow(props.$theme as ThemeProp)}`};
    border-radius: ${v.inputBorderRadius};

    > input { height: ${v.inputHeight}; }

    > textarea { min-height: ${v.inputHeight}; }

    > textarea,
    > input {
        padding: ${v.inputPadding};
        min-width: 50px;
        border-radius: 0.3rem;
    }

    > .error {
        box-shadow: 0 0 7px ${v.errorColor};
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        color: ${v.errorColor};
        transition: all 100ms ease-in-out;
        align-self: center;
        right: 5px;
        display: flex;
    }

    @media (max-width: 768px) {
        > input { height: ${v.inputHeight}; }

        > textarea { min-height: ${v.inputHeight}; }

        > textarea,
        > input {
            min-width: 30px;
            padding: ${v.inputPaddingSmall};
        }
    }
`;

const InputField: FC<InputFieldProps> = (props) => {
    const {
        wrapperClassName,
        width,
        icon,
        className,
        setRef,
        type,
        label,
        labelWidth = 'auto',
        labelAlign,
        placeHolder = !props.label ? (props.fieldRegister?.name || props.name) : undefined,
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

    const theme = useAppSelector(getTheme);

    const {ref, ...restFieldRegister} = fieldRegister || {};

    const [styles, setStyles] = useState({
        zIndex: -777,
        opacity: 0
    });

    const fieldName = fieldRegister?.name || restProps?.name || 'unnamed';
    const idRef = useRef(`${fieldName}-${uuidv4()}`);
    const inputRef = useRef(null as HTMLInputElement | null as HTMLTextAreaElement | null);

    useEffect(() => {
        sessionStorage.removeItem('last-input-focus');
        setRef && setRef(inputRef.current);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setStyles({
            zIndex: error ? 1 : -777,
            opacity: error ? 1 : 0
        });
    }, [error]);

    return <Container data-component={'input-field'} className={wrapperClassName}>
        {
            (icon || label) && <Label
                $width={labelWidth}
                $align={labelAlign}
                $color={labelColor}
                htmlFor={`i-${idRef.current}`}
                className={'display-flex align-items-center gap-0p5'}>
                {icon && <ReactIcon icon={icon} className={'align-self-center'}/>}
                {label && label}
            </Label>
        }
        <InputWrapper $theme={theme} className={'input-wrapper'}>
            {
                type !== 'textarea' && <input
                    disabled={disabled}
                    style={{...style, width: width && parseCSSUnit(width)}}
                    type={type || 'text'}
                    min={min}
                    max={max}
                    placeholder={placeHolder}
                    className={classNames(className && '', error && 'border-error')}
                    id={`i-${idRef.current}`}
                    ref={(e: any) => {
                        ref && ref(e);
                        inputRef.current = e;
                    }}
                    onKeyDown={e => {
                        sessionStorage.setItem('last-input-focus', fieldName);
                        onKeyDown && onKeyDown(e);
                    }}
                    autoFocus={sessionStorage.getItem('last-input-focus') === fieldName}
                    {...restFieldRegister}
                    {...restProps}
                />
            }
            {
                type === 'textarea' && <textarea
                    disabled={disabled}
                    style={{...style, width: width && parseCSSUnit(width)}}
                    rows={rows || 3}
                    placeholder={placeHolder}
                    className={classNames(className && '', error && 'border-error')}
                    id={`i-${idRef.current}`}
                    ref={(e: any) => {
                        ref && ref(e);
                        inputRef.current = e;
                    }}
                    onKeyDown={e => {
                        sessionStorage.setItem('last-input-focus', fieldName);
                        onKeyDown && onKeyDown(e);
                    }}
                    autoFocus={sessionStorage.getItem('last-input-focus') === fieldName}
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
        </InputWrapper>
    </Container>;
};

/**
 * SHEESH!!!
 *
 * Conflicts between useForm (React Hook Form) and redux-connect (or redux-form) usually arise from competing state
 * management paradigms. React Hook Form thrives on local, uncontrolled component state for high performance,
 * while Redux-connect forces form data into a global Redux store. Fix by using useForm locally and mapping dispatch
 * actions only when necessary, avoiding binding live form inputs to connect
 *
 * USE THE F*ING useSelector INSTEAD!!!
 */

export default memo(InputField);