import { FC, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { CSSUnit } from '../../../types';
import { classNames, isObject, parseCSSUnit } from '../../../utils';
import { ReactIcon } from '../index';

export interface DropdownProps {
    options: string[]|DropdownObjectOptions[];
    selected: string|DropdownObjectOptions|undefined;
    name?: string;
    label?: string;
    icon?: IconType;
    labelWidth?: CSSUnit;
    labelAlign?: 'left' | 'right' | 'center' | 'space-between';
    onChange?: Function,
    disabled?: boolean;
}

export type DropdownObjectOptions = {
    label: any;
    value: string;
    icon?: IconType;
}

const Container = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
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
    ${props => props.$labelWidth && `width: ${parseCSSUnit(props.$labelWidth)}`}
`;

const Wrapper = styled.div<{
    $show: boolean,
    $width: number | string,
    $disabled?: boolean,
}>`
    position: relative;
    border: 1px solid #e9e9e9;
    border-radius: 0.3rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${props => props.$width};
    ${props => props.$show && 'border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom-color: transparent;'}
    ${props => props.$disabled && 'opacity: 0.3; pointer-events: none;'}
`;

const Input = styled.input<{$hasIcon: boolean}>`
    border: none;
    background-color: transparent;
    padding-right: 0.1rem;
    cursor: pointer;
    width: 100%;
    ${props => props.$hasIcon && 'text-align: center;'}
`;

const List = styled.div<{
    $show: boolean
    $pos: Record<'left' | 'top', number>
}>`
    overflow-y: auto;
    z-index: 1;
    user-select: none;
    top: ${props => `${props.$pos.top}px`};
    left: ${props => `${props.$pos.left}px`};
    width: fit-content;
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    white-space: nowrap;
    position: fixed;
    ${props => !props.$show && 'visibility: hidden; z-index: -1;'}
`;

// noinspection CssUnusedSymbol
const Option = styled.div<{ $selected?: boolean, $disabled?: boolean }>`
    padding: 0.5rem;
    cursor: pointer;
    transition: color, background-color 0.2s ease-in-out;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    &.selected {
        cursor: default;
        background-color: whitesmoke;
    }

    &:not(.selected) {
        &:hover {
            color: white;
            background-color: rgba(0, 123, 255, 0.63);
        }
    }
`;

const Dropdown: FC<DropdownProps> = (props) => {
    const {name, disabled, label, selected: props_selected, options, labelWidth, labelAlign, icon, onChange} = props;

    const listRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);

    const [selected, setSelected] = useState<string|DropdownObjectOptions|undefined>(props_selected);
    const [show, setShow] = useState(false);
    const [wrapperWidth, setWrapperWidth] = useState<number | string>('auto');
    const [dropDownPos, setDropdownPos] = useState({
        left: 0,
        top: 0
    });

    useOnClickOutside([listRef, wrapperRef], handleClickOutside);
    useResizeObserver({
        ref: wrapperRef,
        onResize,
    })

    useEffect(() => {
        onResize();
        setSelected(props_selected);
    }, [options, props_selected]);

    useEffect(() => {
        setShow(false);
        onChange && onChange(selected);
        // eslint-disable-next-line
    }, [selected]);

    function handleClickOutside() {
        if (!show) return;
        setShow(!show);
    }

    function onResize() {
        setShow(false);

        if (wrapperRef.current) {
            const {left, bottom} = wrapperRef.current.getBoundingClientRect();
            setDropdownPos({left, top: bottom});
        }

        if (listRef.current) setWrapperWidth(`${listRef.current.getBoundingClientRect().width}px`);
    }

    const isO = isObject(options[0]);
    const _selected = String(isO ? (selected as DropdownObjectOptions).value : selected);
    const hasIcon = isO && (selected as DropdownObjectOptions) && (selected as DropdownObjectOptions).icon;

    return <Container data-component={'dropdown'}>
        {label && <Label
            $labelAlign={labelAlign}
            $labelWidth={labelWidth}>
            {icon && <ReactIcon icon={icon}/>}
            {label}
        </Label>}
        <Wrapper
            ref={wrapperRef}
            $disabled={disabled}
            $width={wrapperWidth}
            $show={show}>
            {
                hasIcon && <ReactIcon style={{marginLeft: '0.5rem'}} icon={(selected as DropdownObjectOptions).icon as IconType}/>
            }
            <Input
                name={name}
                $hasIcon={hasIcon as boolean}
                type={'text'}
                readOnly={true}
                onClick={() => setShow(!show)}
                value={_selected}/>
            <ReactIcon onClick={() => setShow(!show)} icon={FaChevronDown} style={{
                color: 'gba(0, 123, 255, 0.63)',
                cursor: 'pointer',
                marginRight: '0.2rem',
                width: '21px'
            }}/>
        </Wrapper>
        <List ref={listRef} $show={show} $pos={dropDownPos}>
            {
                options.map((o: any) => <Option
                    onClick={() => setSelected(o)}
                    key={isO ? o.value : o}
                    className={classNames(_selected === (isO ? o.value : o) && 'selected')}>
                    {isO && o.icon && <ReactIcon icon={o.icon}/>}
                    {isO ? o.label : o}
                </Option>)
            }
        </List>
    </Container>;
};

export default Dropdown;