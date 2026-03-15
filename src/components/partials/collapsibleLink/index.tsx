import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSUnit } from '../../../constants/types';
import { parseCSSUnit } from '../../../utils';

export interface CollapsibleLinkProps {
    linkText: string;
    details: any;
    detailsClassName?: string;
    position?: 'fixed' | 'relative' | 'absolute';
}

const StyledPre = styled.pre<{
    $height: CSSUnit;
    $width: CSSUnit;
    $position: 'relative' | 'fixed' | 'absolute';
}>`
    display: block;
    height: ${props => `${parseCSSUnit(props.$height)} !important;`};
    margin: 0;
    color: gray;
    font-size: x-small;
    width: ${props => parseCSSUnit(props.$width)};
    transition: all 200ms ease-in-out;
    overflow-y: hidden;
    position: ${props => props.$position};
    ${props => {
        if ([0, 'auto'].includes(props.$height))
            return `overflow-x: hidden; visibility: hidden; opacity: 0; z-index: -1; background-color: transparent !important; padding: 0 !important;`
        else
            return `overflow-x: auto; visibility: visible; opacity: 1; margin-top: 0.1rem;`
    }};
`;

const CollapsibleLink:FC<CollapsibleLinkProps> = ({linkText, details, detailsClassName, position: props_position = 'relative'}) => {
    const bRef = useRef<HTMLElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const heightRef = useRef<CSSUnit>('auto');
    const widthRef = useRef<CSSUnit>('auto');
    const [height, setHeight] = useState<CSSUnit>('auto');
    const [position, setPosition] = useState<'fixed'|'relative' | 'absolute'>('fixed');

    useEffect(() => {
        if (preRef.current) {
            heightRef.current = preRef.current.getBoundingClientRect().height + 14;
            setHeight(0);
            setPosition(props_position)
        }
        if (bRef.current) widthRef.current = bRef.current.getBoundingClientRect().width;

        // eslint-disable-next-line
    }, []);

    return <span className={'trim'}>
        <b style={{display: 'block'}} ref={bRef} className={'link disable-select'} onClick={() => setHeight(height === 0 ? heightRef.current : 0 )}>{linkText}</b>
        <StyledPre $position={position} $width={widthRef.current} $height={height} ref={preRef} className={detailsClassName}>{details}</StyledPre>
    </span>
}

export default CollapsibleLink;