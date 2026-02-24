import { FC, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BoxProps } from '../../../interafaces';
import { CSSUnit } from '../../../types';
import { getTextWidth, parseCSSUnit } from '../../../utils';
import './styles.scss';

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

    const Section = styled.section`
        background: ${backgroundColor || 'white'};
        border-width: ${border && border !== 'label-only' ? '1px' : 0};
        border-style: solid;
        border-color: ${borderColor};
        border-radius: ${parseCSSUnit(String(borderRadius))};
        margin-top: ${label && !tight ? '0.5rem' : 0};
        padding: ${tight ? 0 : '0.5rem'};
        width: ${width && parseCSSUnit(String(width))};
    `;

    const Label = styled.h5`
        background: ${labelBackgroundColor || 'inherit'};
        border-width: ${border === 'label-only' ? '1px' : 'inherit'};
        border-style: inherit;
        border-color: ${borderColor};
        border-radius: ${titleBorderRadius};
        color: ${labelColor};
        line-height: 1;
        margin: ${tight ? border === 'label-only' ? 0 : '0.1rem' : '-0.9rem 0 0 0'};
        position: absolute;
        padding: 0.1rem 0.3rem;
        font-size: ${labelSize};
        ${(() => {
            switch (labelPosition) {
                case 'top-center':
                    return `right: calc(50% - ${labelWidth/2}px)`;
                case 'top-right':
                    return `right: ${tight ? 0 : '0.5rem'}`;
                case 'bottom-left':
                    return `bottom: ${tight ? 0 : '-0.4rem'}`;
                case 'bottom-center':
                    return `bottom: ${tight ? 0 : '-0.4rem'}; right: calc(50% - ${labelWidth/2}px)`;
                case 'bottom-right':
                    return `bottom: ${tight ? 0 : '-0.4rem'}; right: ${tight ? 0 : '0.5rem'}`;
                default:
                    return null;
            }
        })()}
    `;

    const Children = styled.div`
        ${(() => {
            if (label && !tight && !String(labelPosition).includes('bottom')) {
                switch(labelSize) {
                    case 'large':
                        return 'margin-top: 1rem'
                    case 'medium':
                        return 'margin-top: 0.9rem'
                    default:
                        return 'margin-top: 0.7rem'
                }
            }
            return null
        })()};
        ${(() => {
            if (label && !tight && String(labelPosition).includes('bottom')) {
                switch(labelSize) {
                    case 'large':
                        return 'margin-bottom: 1rem'
                    case 'medium':
                        return 'margin-bottom: 0.9rem'
                    default:
                        return 'margin-bottom: 0.7rem'
                }
            }
            return null
        })()};
        width: 100%;
        overflow-x: auto;
    `;

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
    >
        {label && <Label ref={labelRef}>{label}</Label>}
        <Children className={className}>{children}</Children>
    </Section>;
};

export default memo(Box);