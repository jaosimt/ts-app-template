import { FC, memo, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSColors, CSSUnit } from '../../../constants/types';
import { useAppSelector, useKeyPress } from '../../../hooks';
import { getTheme } from '../../../slices/theme';
import { classNames, getRandStr, isNumber, isObject, parseCSSUnit, Round } from '../../../utils';
import {
    getButtonDefaultBorderColor,
    getButtonDefaultHoverColor,
    getButtonDefaultTextColor, getLightShadow
} from '../../../utils/themeUtils';
import { ReactIcon } from '../index';
import v from '../../../styles/variables.module.scss';

export interface DropdownProps {
    options: string[] | DropdownObjectOptions[];
    selected: string | DropdownObjectOptions | undefined;
    name?: string;
    label?: string;
    icon?: IconType;
    labelWidth?: CSSUnit;
    labelAlign?: 'left' | 'right' | 'center' | 'space-between';
    onChange?: Function,
    disabled?: boolean;
    className?: string;
    valueClassName?: string;
    maxDropdownHeight?: CSSUnit;
    disablePredicate?: Function;
    theme?: ThemeProp;
    dropShadow?: CSSColors;
}

export type DropdownObjectOptions = {
    label: any;
    value: string;
    icon?: IconType;
}

type PosProp = {
    height: number | string;
    width: number | string;
}

const Container = styled.div<{
    $zIndex: number;
}>`
    z-index: ${props => props.$zIndex};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    gap: ${parseCSSUnit(v.labelPadding as CSSUnit)} 0;

    @media (max-width: 768px) {
        height: 28px;
        font-size: small;
    }
`;

const Label = styled.label<{
    $labelWidth?: number | `${number}${string}`
    $labelAlign?: string;
}>`
    line-height: 1.2;
    display: inline-flex;
    gap: 0 ${parseCSSUnit(v.labelPadding as CSSUnit)};
    padding-right: ${parseCSSUnit(v.labelPadding as CSSUnit)};
    justify-content: ${props => props.$labelAlign};
    align-items: center;
    min-width: fit-content;
    ${props => props.$labelWidth && `width: ${parseCSSUnit(props.$labelWidth)}`};

    @media (max-width: 768px) {
        gap: 0 ${parseCSSUnit(v.labelPaddingSmall as CSSUnit)};
    }
}
`;

const Wrapper = styled.div<{
    $wrapperWidth: CSSUnit;
    $show: boolean;
    $disabled?: boolean;
    $theme?: ThemeProp;
    $dropShadow?: CSSColors;
}>`
    transition: all 700ms ease-in-out;
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1 1 auto;
    box-shadow: 0 0 7px ${props => props.$dropShadow || getLightShadow(props.$theme as ThemeProp)};
    cursor: pointer;
    width: ${props => props.$wrapperWidth};
    border: 1px solid ${props => getButtonDefaultBorderColor(props.$theme as ThemeProp)};
    border-radius: ${v.inputBorderRadius};
    background-color: ${v.backgroundColorDefault};
    align-items: center;
    justify-content: space-between;
    color: ${props => getButtonDefaultBorderColor(props.$theme as ThemeProp)};

    ${props => props.$disabled && 'opacity: 0.3; pointer-events: none;'}
    input {
        ${props => props.$disabled && 'opacity: 0.3;'}
    }
`;

const Input = styled.input<{ $hasIcon: boolean }>`
    transition: all 0.2s ease-in-out;
    min-width: unset;
    border: none;
    background-color: transparent;
    padding-right: 0.1rem;
    cursor: pointer;
    width: 100%;
    ${props => props.$hasIcon && 'text-align: center;'}
`;

const InputWrapper = styled.div<{
    $theme?: ThemeProp;
}>`
    width: 100%;
    height: ${v.inputHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        height: ${v.inputHeightSmall};
    }
`;

const List = styled.div<{
    $show: boolean;
    $pos: PosProp;
    $maxDropdownHeight: CSSUnit;
    $theme?: ThemeProp;
    $dropShadow?: CSSColors;
}>`
    overflow-y: auto;
    z-index: 2;
    user-select: none;
    background-color: #fff;
    white-space: nowrap;
    top: 100%;
    left: 0;
    opacity: ${props => props.$show ? 1 : 0};
    width: ${props => isNumber(props.$pos.width, true) ? '100%' : parseCSSUnit(props.$pos.width as CSSUnit)};
    height: ${props => parseCSSUnit(props.$pos.height as CSSUnit)};
    max-height: ${props => parseCSSUnit(props.$maxDropdownHeight)};
    ${props => !props.$show && 'opacity: 0; z-index: -777; pointer-events: none;'}
`;

// noinspection CssUnusedSymbol
const Option = styled.div<{
    $theme?: ThemeProp;
}>`
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    color: ${props => getButtonDefaultTextColor(props.$theme as ThemeProp)};
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;

    &.selected {
        cursor: default;
        color: ${v.buttonPrimaryTextColor};
        background-color: ${props => getButtonDefaultBorderColor(props.$theme as ThemeProp)};

        &:not(:first-child) {
            border-top: 1px solid ${v.backgroundColorDefault};
        }

        &:not(:last-child) {
            border-bottom: 1px solid ${v.backgroundColorDefault};
        }
    }

    &.disabled {
        opacity: 0.1;
        pointer-events: none;
    }

    &:not(.selected):not(.disabled) {
        &.scrolled,
        &:hover {
            color: ${v.backgroundColorDefault};
            background-color: ${props => getButtonDefaultHoverColor(props.$theme as ThemeProp)};
        }
    }

    @media (max-width: 768px) {
        padding: 0.3rem 0.5rem;
    }
`;

const Dropdown: FC<DropdownProps> = (props) => {
    const {
        maxDropdownHeight,
        className,
        valueClassName,
        name,
        disabled,
        label,
        options,
        labelWidth,
        labelAlign,
        icon,
        onChange,
        disablePredicate,
        dropShadow,
        selected: props_selected,
        theme: props_theme
    } = props;

    const _theme = useAppSelector(getTheme) as ThemeProp;
    const theme = props_theme || _theme;

    const fieldName = name || 'unnamed';
    const idRef = useRef<string>(`${fieldName}-${getRandStr(7)}`);

    const listRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);

    const [scrolled, setScrolled] = useState<string | DropdownObjectOptions | undefined>(props_selected);
    const [selected, setSelected] = useState<string | DropdownObjectOptions | undefined>(props_selected);
    const [show, setShow] = useState(false);
    const [dropDownPos, setDropdownPos] = useState<PosProp>({
        height: 0,
        width: 'fit-content'
    });

    useOnClickOutside([listRef, wrapperRef], handleClickOutside);
    useKeyPress('ArrowDown', (pressed: boolean) => arrowDownUpHandler(pressed, 'ArrowDown'));
    useKeyPress('ArrowUp', (pressed: boolean) => arrowDownUpHandler(pressed, 'ArrowUp'));
    useKeyPress('Enter', enterKeyHandler);

    useEffect(() => {
        if (!listRef.current || dropDownPos.width !== 'fit-content') return;
        const width = listRef.current.clientWidth;
        setDropdownPos({...dropDownPos, width: Round(width, 3)});
        // eslint-disable-next-line
    }, [listRef.current]);

    useEffect(() => {
        if (show) {
            setDropdownPos({...dropDownPos, height: 'unset'});
            return;
        }

        setDropdownPos({...dropDownPos, height: 0});
        if (JSON.stringify(scrolled) !== JSON.stringify(selected))
            setScrolled(selected);
        // eslint-disable-next-line
    }, [show]);

    useEffect(() => {
        setSelected(props_selected);
    }, [options, props_selected]);

    useEffect(() => {
        setShow(false);
        if (JSON.stringify(selected) !== JSON.stringify(scrolled)) setScrolled(selected);
        onChange && onChange(selected);
        // eslint-disable-next-line
    }, [selected]);

    useEffect(() => {
        console.log('dropDownPos:', dropDownPos);
    }, [dropDownPos]);

    const isO = isObject(options[0]);

    function enterKeyHandler(pressed: boolean) {
        if (options.length === 0) return;

        if (pressed && listRef.current && show) {
            const selectedIndex = isO
                ? options.findIndex((o: any) => o.value === (selected as DropdownObjectOptions).value)
                : options.findIndex(o => o === selected);
            const nextIndex = isO
                ? options.findIndex((o: any) => o.value === (scrolled as DropdownObjectOptions).value)
                : options.findIndex(o => o === scrolled);

            const disabled = disablePredicate && disablePredicate(options[nextIndex]);

            if (selectedIndex !== nextIndex && !disabled) setSelected(options[nextIndex]);
            else setShow(false);
        }
    }

    function arrowDownUpHandler(pressed: boolean, key: string) {
        if (options.length === 0) return;

        if (pressed && listRef.current && show) {
            const optionsSize = options.length;
            let nextIndex = isO
                ? options.findIndex((o: any) => o.value === (scrolled as DropdownObjectOptions).value)
                : options.findIndex(o => o === scrolled);

            if (nextIndex < 0) nextIndex = 0;

            switch (key) {
                case 'ArrowDown':
                    nextIndex = (nextIndex + 1) > (optionsSize - 1) ? 0 : nextIndex + 1;
                    break;
                case 'ArrowUp':
                    nextIndex = (nextIndex - 1) < 0 ? (optionsSize - 1) : nextIndex - 1;
                    break;
                default:
                // do nothing
            }

            setScrolled(options[nextIndex]);
        }
    }

    function handleClickOutside() {
        if (!show) return;
        setShow(!show);
    }

    const _selected = String(isO ? (selected as DropdownObjectOptions).value : selected);
    const _scrolled = String(isO ? (scrolled as DropdownObjectOptions).value : scrolled);
    const hasIcon = isO && (selected as DropdownObjectOptions) && (selected as DropdownObjectOptions).icon;
    const wrapperWidth = parseCSSUnit(isNumber(dropDownPos.width, true) ? (+dropDownPos.width + 7) : dropDownPos.width as CSSUnit);

    return <Container
        $zIndex={show ? 1 : 0}
        data-component={'dropdown'}
        aria-label={'Dropdown Component'}
        className={className}
    >
        {label && <Label
            htmlFor={idRef.current}
            data-label={'dropdown-label'}
            aria-label={'Dropdown Label'}
            $labelAlign={labelAlign}
            $labelWidth={labelWidth as any}>
            {icon && <ReactIcon icon={icon} />}
            {label}
        </Label>}
        <div style={{
            width: wrapperWidth,
            height: `${v.inputHeight}`
        }}>
            <Wrapper
                ref={wrapperRef}
                $wrapperWidth={wrapperWidth}
                $disabled={disabled}
                $show={show}
                $theme={theme}
                $dropShadow={dropShadow}
                onClick={() => setShow(!show)}
            >
                <InputWrapper $theme={theme}>
                    {
                        hasIcon && <ReactIcon
                            size={21} style={{marginLeft: '0.5rem'}}
                            icon={(selected as DropdownObjectOptions).icon as IconType} />
                    }
                    <Input
                        id={idRef.current}
                        className={classNames('dropdown', !hasIcon && 'ml-0p3', valueClassName)}
                        name={name}
                        $hasIcon={hasIcon as boolean}
                        type={'text'}
                        readOnly={true}
                        value={_selected} />
                    <ReactIcon icon={FaChevronDown} style={{
                        transition: 'transform 300ms ease-in-out',
                        transform: `rotate(${show ? -180 : 0}deg)`,
                        color: 'gba(0, 123, 255, 0.63)',
                        cursor: 'pointer',
                        marginRight: '0.3rem',
                        width: '21px',
                        height: '21px'
                    }} />
                </InputWrapper>
                <List
                    ref={listRef}
                    $show={show}
                    $pos={dropDownPos}
                    $maxDropdownHeight={maxDropdownHeight as CSSUnit}
                    $theme={theme}
                    $dropShadow={dropShadow}
                >
                    {
                        options.map((o: any) => <Option
                            $theme={theme}
                            onClick={() => setSelected(o)}
                            key={isO ? o.value : o}
                            className={classNames(
                                _selected === (isO ? o.value : o) && 'selected',
                                _scrolled === (isO ? o.value : o) && 'scrolled',
                                disablePredicate !== undefined && disablePredicate(o) && 'disabled'
                            )}>
                            {isO && o.icon && <ReactIcon icon={o.icon} />}
                            {isO ? o.label : o}
                        </Option>)
                    }
                </List>
            </Wrapper>
        </div>
    </Container>;
};

export default memo(Dropdown);