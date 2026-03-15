import { FC, HTMLAttributes, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { CSSUnit } from '../../../constants/types';
import { hasHorizontalScrollbar, parseCSSUnit } from '../../../utils';

export interface CollapsibleLinkProps extends HTMLAttributes<HTMLDivElement> {
    linkText: string;
    details: any;
    position?: 'fixed' | 'relative' | 'absolute';
}

const StyledDetail = styled.div<{
    $height: CSSUnit;
    $width: CSSUnit;
    $position: 'relative' | 'fixed' | 'absolute';
}>`
    > :first-child { margin-top: 0; }

    > :last-child { margin-bottom: 0; }

    height: ${props => `${parseCSSUnit(props.$height)} !important;`};
    margin: 0;
    color: gray;
    width: ${props => `${props.$height === 0 ? 0 : parseCSSUnit(props.$width)} !important;`};
    transition: all 200ms ease-in-out;
    overflow-y: hidden;
    position: ${props => props.$position};
    ${props => {
        if (props.$height === 0 || props.$height === 'auto')
            return `
            overflow-x: hidden; 
            visibility: hidden; 
            opacity: 0; 
            z-index: -1; 
            background-color: transparent !important; 
            overflow: auto !important; 
            ${props.$height === 0 && 'padding: 0 !important; overflow: hidden !important;'}`;
        else
            return `overflow-x: auto; visibility: visible; opacity: 1; z-index: 1; margin-top: 0.1rem;`;
    }};
`;

const CollapsibleLink: FC<CollapsibleLinkProps> = (props) => {
    const {
        linkText,
        details,
        className,
        style = {},
        position: props_position = 'relative'
    } = props;

    console.log('props_position:', props_position);

    const bRef = useRef<HTMLElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const heightRef = useRef<CSSUnit>('auto');
    const [height, setHeight] = useState<CSSUnit>('auto');
    const [width, setWidth] = useState<CSSUnit>('auto');
    const [position, setPosition] = useState<'fixed' | 'relative' | 'absolute'>('fixed');

    useOnClickOutside([bRef as RefObject<HTMLElement>, detailRef as RefObject<HTMLElement>], () => height !== 0 && setHeight(0));

    useEffect(() => {
        let timeout2: any = null;
        const timeout = setTimeout(() => {
            if (detailRef.current) {
                heightRef.current = detailRef.current.getBoundingClientRect().height;
                setHeight(0);
                timeout2 = setTimeout(() => setPosition(props_position), 300);
            }
            if (bRef.current) setWidth(bRef.current.getBoundingClientRect().width);
        }, 300);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setPosition(props_position), 300);
        return () => clearTimeout(timeout);
    }, [props_position]);

    useEffect(() => {
        if (!detailRef.current) return;
        if (hasHorizontalScrollbar(detailRef.current)) heightRef.current = +heightRef.current + 7;
        // eslint-disable-next-line
    }, [detailRef.current]);

    return <span className={'trim'}>
        <b style={{display: 'block'}} ref={bRef} className={'link disable-select'}
           onClick={() => setHeight(height === 0 ? heightRef.current : 0)}>{linkText}</b>
        <StyledDetail $position={position} $width={width} $height={height} ref={detailRef} className={className}
                      style={{...style}}>{details}</StyledDetail>
    </span>;
};

export default CollapsibleLink;