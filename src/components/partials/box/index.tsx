import { FC, HTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSColors, CSSUnit } from '../../../types';
import { getTextWidth, parseCSSUnit } from '../../../utils';
import './styles.scss';

export type LabelPositionType = 'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: CSSColors;
    border?: boolean | 'label-only';
    borderRadius?: CSSUnit
    borderColor?: CSSColors;
    boxClassName?: string;
    tight?: boolean;
    label?: string;
    labelColor?: CSSColors;
    labelBackgroundColor?: CSSColors;
    labelPosition?: LabelPositionType;
    labelSize?: 'small'|'medium'|'large';
    width?: CSSUnit
}

const Section = styled.section<{
    $backgroundColor?: CSSColors,
    $border: CSSUnit,
    $borderColor: CSSColors,
    $borderRadius: CSSUnit,
    $marginTop: CSSUnit,
    $padding: CSSUnit,
    $width?: CSSUnit
}>`
    background: ${props => props.$backgroundColor || 'white'};
    border-width: ${props => props.$border};
    border-style: solid;
    border-color: ${props => props.$borderColor};
    border-radius: ${props => props.$borderRadius};
    margin-top: ${props => props.$marginTop};
    padding: ${props => props.$padding};
    width: ${props => props.$width || ''};
`;

const Label = styled.h5<{
    $background: CSSColors,
    $borderWidth: CSSUnit | 'inherit',
    $borderColor: CSSColors,
    $borderRadius: CSSUnit,
    $color?: CSSColors,
    $margin: CSSUnit | `-${number}${string} ${number} ${number} ${number}`,
    $fontSize: string,
    $labelPosition: LabelPositionType,
    $labelWidth: number,
    $tight: boolean
}>`
    background: ${props => props.$background};
    border-width: ${props => props.$borderWidth};
    border-style: inherit;
    border-color: ${props => props.$borderColor};
    border-radius: ${props => props.$borderRadius};
    color: ${props => props.$color};
    line-height: 1;
    z-index: 1;
    margin: ${props => props.$margin};
    position: absolute;
    padding: 0.1rem 0.3rem;
    font-size: ${props => props.$fontSize};
    ${props => (() => {
        switch (props.$labelPosition) {
            case 'top-center':
                return `right: calc(50% - ${props.$labelWidth / 2}px)`;
            case 'top-right':
                return `right: ${props.$tight ? 0 : '0.5rem'}`;
            case 'bottom-left':
                return `bottom: ${props.$tight ? 0 : '-0.4rem'}`;
            case 'bottom-center':
                return `bottom: ${props.$tight ? 0 : '-0.4rem'}; right: calc(50% - ${props.$labelWidth / 2}px)`;
            case 'bottom-right':
                return `bottom: ${props.$tight ? 0 : '-0.4rem'}; right: ${props.$tight ? 0 : '0.5rem'}`;
            default:
                return null;
        }
    })()}
`;

const Children = styled.div<{
    $labelPosition: LabelPositionType,
    $label?: string,
    $tight: boolean,
    $labelSize: string
}>`
    ${props => (() => {
        if (props.$label && !props.$tight && !String(props.$labelPosition).includes('bottom')) {
            switch (props.$labelSize) {
                case 'large':
                    return 'margin-top: 1rem';
                case 'medium':
                    return 'margin-top: 0.9rem';
                default:
                    return 'margin-top: 0.7rem';
            }
        }
        return null;
    })()};
    ${props => (() => {
        if (props.$label && !props.$tight && String(props.$labelPosition).includes('bottom')) {
            switch (props.$labelSize) {
                case 'large':
                    return 'margin-bottom: 1rem';
                case 'medium':
                    return 'margin-bottom: 0.9rem';
                default:
                    return 'margin-bottom: 0.7rem';
            }
        }
        return null;
    })()};
    width: 100%;
    overflow-x: auto;
`;

const Box: FC<BoxProps> = (props) => {
    const {
        backgroundColor,
        border = true,
        borderColor = '#ccc',
        borderRadius = 0,
        boxClassName,
        children,
        className,
        label,
        labelColor,
        labelBackgroundColor,
        labelSize = 'small',
        labelPosition = 'top-left',
        tight,
        width
    } = props;

    const labelRef = useRef(null as HTMLInputElement | null);
    const [labelWidth, setLabelWidth] = useState<number>((() => {
        if (!label) return 0;

        let labelFont = '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif, monospace';

        switch(label) {
            case 'large':
                labelFont = '700 18px / 18px ' + labelFont;
                break;
            case 'medium':
                labelFont = '700 16px / 16px ' + labelFont;
                break;
            default:
                labelFont = '700 13px / 13px ' + labelFont;
        }

        return getTextWidth(label, labelFont);
    })());

    let titleBorderRadius: number | CSSUnit = borderRadius;
    if (borderRadius !== 0) {
        const brSplit = [parseFloat(titleBorderRadius.toString()), titleBorderRadius.toString().replace(/\d*/, '')];
        titleBorderRadius = parseCSSUnit(`${brSplit[0] as number / 2}${brSplit[1]}`);
    }

    useEffect(() => {
        if (label && labelRef.current){
            const labelWidth = getTextWidth(label, getComputedStyle(labelRef.current)['font']);
            if (labelWidth > 5) setLabelWidth(labelWidth);
        }
        // eslint-disable-next-line
    }, []);

    return <Section
        data-component={'box'}
        className={boxClassName}
        $backgroundColor={backgroundColor}
        $border={border && border !== 'label-only' ? '1px' : 0}
        $borderColor={borderColor}
        $borderRadius={parseCSSUnit(String(borderRadius))}
        $marginTop={label && !tight ? '0.5rem' : 0}
        $padding={tight ? 0 : '0.5rem'}
        $width={width && parseCSSUnit(String(width))}
    >
        {label && <Label
            ref={labelRef}
            $background={labelBackgroundColor || 'inherit'}
            $borderWidth={border === 'label-only' ? '1px' : 'inherit'}
            $borderColor={borderColor}
            $borderRadius={titleBorderRadius}
            $color={labelColor}
            $margin={tight ? border === 'label-only' ? 0 : '0.1rem' : '-0.9rem 0 0 0'}
            $fontSize={labelSize}
            $labelPosition={labelPosition}
            $labelWidth={labelWidth}
            $tight={tight || false}
        >{label}</Label>}
        <Children
            className={className}
            $labelPosition={labelPosition}
            $tight={tight || false}
            $label={label}
            $labelSize={labelSize}
        >{children}</Children>
    </Section>;
};

export default memo(Box);