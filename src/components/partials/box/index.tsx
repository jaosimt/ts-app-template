import { FC } from 'react';
import styled from 'styled-components';
import { BoxProps } from '../../../interafaces';
import { CSSUnit } from '../../../types';
import { parseCSSUnit } from '../../../utils';
import './styles.scss';

const Box: FC<BoxProps> = (props) => {
    const {
        children,
        title,
        className,
        boxClassName,
        borderRadius = 0,
        width,
        borderColor,
        titleColor,
        backgroundColor,
        titleBackgroundColor
    } = props;

    let titleBorderRadius: number | CSSUnit = borderRadius;
    if (borderRadius !== 0) {
        const brSplit = [parseFloat(titleBorderRadius.toString()), titleBorderRadius.toString().replace(/\d*/, '')];
        titleBorderRadius = parseCSSUnit(`${brSplit[0] as number / 2}${brSplit[1]}`);
    }

    const Section = styled.section`
        background: ${backgroundColor || 'white'};
        border-width: 1px;
        border-style: solid;
        border-color: ${borderColor || '#ccc'};
        border-radius: ${parseCSSUnit(String(borderRadius))};
        margin-top: ${title ? '0.5rem' : 0};
        padding: 0.5rem;
        width: ${parseCSSUnit(String(width))};
    `;

    const Title = styled.h5`
        line-height: 1;
        position: absolute;
        margin: -0.9rem 0 0 0;
        padding: 0.1rem 0.17rem;
        border: inherit;
        background: ${titleBackgroundColor || 'inherit'};
        border-radius: ${titleBorderRadius};
        color: ${titleColor};
    `;

    const Children = styled.div`
        margin-top: ${title && '0.5rem'};
        width: 100%;
        overflow-x: auto;
    `;

    return <Section
        data-component={'box'}
        className={boxClassName}
    >
        {title && <Title>{title}</Title>}
        <Children className={className}>{children}</Children>
    </Section>;
};

export default Box;