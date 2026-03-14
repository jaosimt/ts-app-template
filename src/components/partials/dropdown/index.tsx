import { FC, memo, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { useOnClickOutside, useWindowSize } from 'usehooks-ts';
import { useKeyPress, useOnScroll } from '../../../hooks';
import { CSSUnit } from '../../../types';
import { classNames, isObject, parseCSSUnit } from '../../../utils';
import { ReactIcon } from '../index';
import {
    $backgroundColor,
    $buttonPrimaryTextColor,
    $buttonDefaultBorderColor,
    $buttonDefaultHoverColor,
    $buttonDefaultTextColor
} from '../../../styles/variables';

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
    maxDropdownHeight?: CSSUnit;
}

export type DropdownObjectOptions = {
    label: any;
    value: string;
    icon?: IconType;
}

type PosProp = {
    left: number;
    top: number;
    width: number | string;
}

const Container = styled.div<{}>`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    position: relative;
    height: 33px;
    
    @media (max-width: 768px) {
        height: 28px;
        gap: 0.1rem;
        font-size: small;
    }
`;

const Label = styled.label<{
    $labelWidth?: number | `${number}${string}`
    $labelAlign?: string;
}>`
    display: inline-flex;
    gap: 0.5rem;
    justify-content: ${props => props.$labelAlign};
    align-items: center;
    min-width: fit-content;
    ${props => props.$labelWidth && `width: ${parseCSSUnit(props.$labelWidth)}`};
    
    @media (max-width: 768px) {
        gap: 0.1rem;
    }
}
`;

const Wrapper = styled.div<{
    $pos: PosProp
    $show: boolean,
    $disabled?: boolean,
}>`
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    width: ${props => parseCSSUnit(props.$pos.width as CSSUnit)};
    border: 1px solid ${$buttonDefaultBorderColor};
    border-radius: 0.3rem;
    background-color: ${$backgroundColor};
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: inherit;
    color: ${$buttonDefaultBorderColor};
    ${props => props.$show && 'border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom-color: transparent;'}
    ${props => props.$disabled && 'opacity: 0.3; pointer-events: none;'}
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

const List = styled.div<{
    $show: boolean;
    $pos: PosProp;
    $maxDropdownHeight: CSSUnit;
}>`
    transition: border 0.2s ease-in-out;
    overflow-y: auto;
    z-index: 2;
    user-select: none;
    width: ${props => parseCSSUnit(props.$pos.width as CSSUnit)};
    background-color: #fff;
    border: 1px solid ${$buttonDefaultBorderColor};
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    white-space: nowrap;
    position: fixed;
    top: ${props => `${props.$pos.top}px`};
    left: ${props => `${props.$pos.left}px`};
    max-height: ${props => parseCSSUnit(props.$maxDropdownHeight)};
    ${props => !props.$show && 'opacity: 0; z-index: -777;'}
`;

// noinspection CssUnusedSymbol
const Option = styled.div<{ $selected?: boolean, $disabled?: boolean }>`
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    color: ${$buttonDefaultTextColor};

    &.selected {
        cursor: default;
        color: ${$buttonPrimaryTextColor};
        background-color: ${$buttonDefaultBorderColor};

        &:not(:first-child) {
            border-top: 1px solid ${$backgroundColor};
        }

        &:not(:last-child) {
            border-bottom: 1px solid ${$backgroundColor};
        }
    }

    &:not(.selected) {
        &.scrolled,
        &:hover {
            color: ${$backgroundColor};
            background-color: ${$buttonDefaultHoverColor};
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
        name,
        disabled,
        label,
        selected: props_selected,
        options,
        labelWidth,
        labelAlign,
        icon,
        onChange
    } = props;

    const listRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);

    const [scrolled, setScrolled] = useState<string | DropdownObjectOptions | undefined>(props_selected);
    const [selected, setSelected] = useState<string | DropdownObjectOptions | undefined>(props_selected);
    const [show, setShow] = useState(false);
    const [dropDownPos, setDropdownPos] = useState<PosProp>({
        left: 0,
        top: 0,
        width: 'fit-content'
    });

    useOnClickOutside([listRef, wrapperRef], handleClickOutside);

    const {width = 0} = useWindowSize();

    useOnScroll(() => !show && setShow(false));

    useEffect(() => {
        if (!show) return;
        setShow(false);
        // eslint-disable-next-line
    }, [width]);

    useEffect(() => {
        updatePos();
        // eslint-disable-next-line
    }, [show, listRef.current, wrapperRef.current]);

    useEffect(() => {
        setSelected(props_selected);
    }, [options, props_selected]);

    useEffect(() => {
        setShow(false);
        if (JSON.stringify(selected) !== JSON.stringify(scrolled)) setScrolled(selected);
        onChange && onChange(selected);
        // eslint-disable-next-line
    }, [selected]);

    useKeyPress('ArrowDown', (pressed: boolean) => arrowDownUpHandler(pressed, 'ArrowDown'));
    useKeyPress('ArrowUp', (pressed: boolean) => arrowDownUpHandler(pressed, 'ArrowUp'));
    useKeyPress('Enter', enterKeyHandler);

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

            if (selectedIndex !== nextIndex) setSelected(options[nextIndex]);
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

    function updatePos() {
        if (!wrapperRef.current && !listRef.current) return;

        const {left, bottom} = wrapperRef.current.getBoundingClientRect();
        const {width} = listRef.current.getBoundingClientRect();

        setDropdownPos({left, width, top: bottom});
    }

    const _selected = String(isO ? (selected as DropdownObjectOptions).value : selected);
    const _scrolled = String(isO ? (scrolled as DropdownObjectOptions).value : scrolled);
    const hasIcon = isO && (selected as DropdownObjectOptions) && (selected as DropdownObjectOptions).icon;

    return <Container
        data-component={'dropdown'}
        className={className}
    >
        {label && <Label
            $labelAlign={labelAlign}
            $labelWidth={labelWidth as any}>
            {icon && <ReactIcon icon={icon}/>}
            {label}
        </Label>}
        <Wrapper
            $pos={dropDownPos}
            ref={wrapperRef}
            $disabled={disabled}
            $show={show}
            onClick={() => setShow(!show)}
        >
            <div className={'width-100p display-flex align-items-center justify-content-space-between'}>
                {
                    hasIcon && <ReactIcon size={21} style={{marginLeft: '0.5rem'}}
                                          icon={(selected as DropdownObjectOptions).icon as IconType}/>
                }
                <Input
                    name={name}
                    $hasIcon={hasIcon as boolean}
                    type={'text'}
                    readOnly={true}
                    value={_selected}/>
                <ReactIcon icon={FaChevronDown} style={{
                    transition: 'transform 300ms ease-in-out',
                    transform: `rotate(${show ? -180 : 0}deg)`,
                    color: 'gba(0, 123, 255, 0.63)',
                    cursor: 'pointer',
                    marginRight: '0.2rem',
                    width: '21px'
                }}/>
            </div>
            <List
                ref={listRef}
                $show={show}
                $pos={dropDownPos}
                $maxDropdownHeight={maxDropdownHeight as CSSUnit}
            >
                {
                    options.map((o: any) => <Option
                        onClick={() => setSelected(o)}
                        key={isO ? o.value : o}
                        className={classNames(
                            _selected === (isO ? o.value : o) && 'selected',
                            _scrolled === (isO ? o.value : o) && 'scrolled'
                        )}>
                        {isO && o.icon && <ReactIcon icon={o.icon}/>}
                        {isO ? o.label : o}
                    </Option>)
                }
            </List>
        </Wrapper>
    </Container>;
};

export default memo(Dropdown);