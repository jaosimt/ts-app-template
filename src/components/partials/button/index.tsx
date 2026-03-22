import { FC, HTMLAttributes, memo, useRef } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSUnit } from '../../../constants/types';
import { useAppSelector } from '../../../hooks';
import { getTheme } from '../../../slices/theme';
import { getRandStr, parseCSSUnit } from '../../../utils';
import {
    getButtonDefaultBorderColor, getButtonDefaultHoverColor, getButtonDefaultTextColor,
    getButtonPrimaryBorderColor,
    getButtonPrimaryColor, getButtonPrimaryHoverColor
} from '../../../utils/themeUtils';
import { ReactIcon } from '../index';
import v from '../../../styles/variables.module.scss';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: IconType;
    align?: 'left' | 'center' | 'right' | 'space-between';
    iconClassName?: string;
    width?: CSSUnit;
    theme?: ThemeProp;
}

// noinspection CssUnusedSymbol
const Container = styled.button<{
    $theme: ThemeProp
}>`
    box-shadow: 0 0 7px #fff;
    margin: 0 0.3rem;

    display: inline-flex;
    min-width: fit-content;
    width: fit-content;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    align-items: center;
    gap: 0.5rem;

    &.btn-icon {
        padding: 2px;
        border-radius: 50%;
        background-color: ${v.buttonPrimaryTextColor};
        border-color: ${props => getButtonPrimaryBorderColor(props.$theme)};
        color: ${props => getButtonPrimaryColor(props.$theme)};
    }

    &:not(.btn-icon) {
        border-radius: 0.3rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.35rem 0.42rem;
        min-width: ${v.inputHeight};
        min-height: ${v.inputHeight};

        &.default {
            background-color: ${v.buttonDefaultColor};
            border-color: ${props => getButtonDefaultBorderColor(props.$theme)};
            color: ${props => getButtonDefaultTextColor(props.$theme)};
        }

        &:not(.default) {
            background-color: ${props => getButtonPrimaryColor(props.$theme)};
            border-color: ${props => getButtonPrimaryBorderColor(props.$theme)};
            color: ${v.buttonPrimaryTextColor};
        }

        &.no-padding {
            padding: 0;
        }
    }

    &:hover {
        &.btn-icon {
            color: ${props => getButtonPrimaryHoverColor(props.$theme)};
            background-color: v.$buttonPrimaryTextColor;
        }

        &:not(.btn-icon):not(.no-hover) {
            &.default {
                background-color: ${props => getButtonDefaultHoverColor(props.$theme)};
                color: v.$buttonDefaultColor;
            }

            &:not(.default) {
                background-color: ${props => getButtonPrimaryHoverColor(props.$theme)};
            }
        }

        &:active { opacity: 0.3; }
    }

    &[disabled],
    &.disabled {
        pointer-events: none !important;
        opacity: 0.3;

        &.default {
            border-color: ${v.buttonDefaultDisabledTextColor};
            color: ${v.buttonDefaultDisabledTextColor};
        }

        &:not(.default) {
            border-color: ${v.buttonPrimaryDisabledTextColor};
        }
    }

    @media (max-width: 768px) {
        font-size: small;
        gap: 0.3rem;

        &.btn-icon {
            padding: 1px;
        }

        &:not(.btn-icon) {
            padding: 0.1rem 0.4rem;
            min-width: ${v.inputHeightSmall};
            min-height: ${v.inputHeightSmall};
        }
    }
`;

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
        theme: props_theme,
        ...restProps
    } = props;

    const _theme = useAppSelector(getTheme) as ThemeProp;
    const theme = props_theme || _theme;

    const idRef = useRef<string>(`btn-${type}-${getRandStr(7)}`);
    const isBtnIcon = className?.includes('btn-icon');

    return <Container
        data-component={'button'}
        type={type}
        className={className} id={idRef.current}
        $theme={theme}
        style={{...style, minWidth: parseCSSUnit(width as CSSUnit), justifyContent: align}}
        {...restProps}
    >
        {
            icon &&
            <ReactIcon
                className={iconClassName}
                style={{position: !isBtnIcon && !children ? 'absolute' : 'relative'}}
                size={!isBtnIcon && !children ? 21 : 14}
                icon={icon} />
        }
        {children}
    </Container>;
};

export default memo(Button);