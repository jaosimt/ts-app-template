import { FC, memo } from 'react';
import styled from 'styled-components';
import { BoxProps } from '../../../interafaces';
import { CSSUnit } from '../../../types';
import { parseCSSUnit } from '../../../utils';
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
                    return 'right: 50%';
                case 'top-right':
                    return `right: ${tight ? 0 : '0.5rem'}`;
                case 'bottom-left':
                    return `bottom: ${tight ? 0 : '-0.4rem'}`;
                case 'bottom-center':
                    return `bottom: ${tight ? 0 : '-0.4rem'}; right: 50%`;
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

    return <Section
        data-component={'box'}
        className={boxClassName}
    >
        {label && <Label>{label}</Label>}
        <Children className={className}>{children}</Children>
    </Section>;
};

export default memo(Box);