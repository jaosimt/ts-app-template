import { FC, HTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { useKeyPress } from '../../../hooks';
import { CSSColors, CSSUnit } from '../../../types';
import { isElementOnTop, parseCSSUnit, classNames, isString } from '../../../utils';
import { ReactIcon } from '../index';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    position?: 'top' | 'left' | 'bottom' | 'right';
    width?: CSSUnit;
    height?: CSSUnit;
    backgroundColor?: CSSColors;
    onOpen?: Function;
    onClose?: Function;
    showOnCreate?: boolean;
}

const Container = styled.div<{
    $backgroundColor?: CSSColors;
    $position: 'top' | 'left' | 'bottom' | 'right';
    $width: CSSUnit;
    $height: CSSUnit;
}>`
    overflow: hidden;
    z-index: 776;
    position: fixed;
    transition: all 700ms ease-in-out;
    background-color: ${props => props.$backgroundColor};
    opacity: 1;
    color: white;
    padding: 0.2rem;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2);
    width: ${props => parseCSSUnit(props.$width)};
    height: ${props => parseCSSUnit(props.$height)};
    ${props => {
        switch (props.$position) {
            case 'top':
                return 'opacity:0; top:-100%; left: 0; width:100%; border-radius: 0 0 0.4rem 0.4rem;';
            case 'right':
                return 'opacity:0; top:0; right: -100%; height:100%; border-radius: 0.4rem 0 0 0.4rem;';
            case 'bottom':
                return 'opacity:0; bottom:-100%; left: 0; width:100%; border-radius: 0 0 0.4rem 0.4rem;';
            default:
                return 'opacity:0; top:0; left: -100%; height:100%; border-radius: 0 0.4rem 0.4rem 0;'; //left
        }
    }}
`;

const Handle = styled.div<{
    $backgroundColor: CSSColors;
    $position: 'top' | 'left' | 'bottom' | 'right';
}>`
    z-index: 775;
    position: fixed;
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    border: 1px solid ${props => props.$backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.1s ease-in-out;
    opacity: 0.3;
    background-color: ${props => props.$backgroundColor};
    color: white;

    ${props => {
        switch (props.$position) {
            case 'top':
                return 'top: 0.5rem; right: calc(50% - 0.95rem);';
            case 'right':
                return 'bottom: calc(50% - 0.95rem); right: 0.5rem;';
            case 'bottom':
                return 'bottom: 0.5rem; right: calc(50% - 0.95rem);';
            default:
                return 'bottom: calc(50% - 0.95rem); left: 0.5rem;'; //left
        }
    }}
    &:hover {
        opacity: 1;

        &:active {
            opacity: 0.3;
        }
    }
`;

const drawer: Record<string, any> = {
    top: {opacity: 1, top: 0, left: 0, width: '100%', borderRadius: '0 0 0.4rem 0.4rem'},
    right: {opacity: 1, top: 0, right: 0, height: '100%', borderRadius: '0.4rem 0 0 0.4rem'},
    bottom: {opacity: 1, bottom: 0, left: 0, width: '100%', borderRadius: '0.4rem 0.4rem 0 0 '},
    left: {opacity: 1, top: 0, left: 0, height: '100%', borderRadius: '0 0.4rem 0.4rem 0'},
    hide: {
        top: {opacity: 0, top: '-100%', left: 0, width: '100%', borderRadius: '0 0 0.4rem 0.4rem'},
        right: {opacity: 0, top: 0, right: '-100%', height: '100%', borderRadius: '0.4rem 0 0 0.4rem'},
        bottom: {opacity: 0, bottom: '-100%', left: 0, width: '100%', borderRadius: '0.4rem 0.4rem 0 0 '},
        left: {opacity: 0, top: 0, left: '-100%', height: '100%', borderRadius: '0 0.4rem 0.4rem 0'}
    }
};

const Drawer: FC<DrawerProps> = (props) => {
    let {
        children,
        width = 'auto',
        height = 'auto',
        position = 'left',
        backgroundColor = '#913794c7',
        className,
        style,
        showOnCreate = false,
        onOpen,
        onClose,
        ...restProps
    } = props;

    if (!isString(backgroundColor, true)) backgroundColor = '#913794c7';

    const containerRef = useRef<any>(null);

    const [show, setShow] = useState(showOnCreate);
    const [styles, setStyles] = useState<any>({});

    useOnClickOutside([containerRef], () => {
        isElementOnTop(containerRef.current) && setShow(false);
    });

    useKeyPress('Escape', escKeyPressHandler);

    useEffect(() => {
        if (show) {
            setStyles(drawer[String(position)]);
            onOpen && onOpen();
        } else {
            setStyles(drawer.hide[String(position)]);
            onClose && onClose();
        }
        //eslint-disable-next-line
    }, [position, show]);

    function escKeyPressHandler(pressed: boolean) {
        if (pressed && isElementOnTop(containerRef.current)) {
            setShow(false);
        }
    }

    return <>
        <Container
            data-component={'drawer'}
            ref={containerRef}
            className={classNames(className, 'trim')}
            style={{...style, ...styles}}
            $position={position}
            $width={width as CSSUnit}
            $height={height as CSSUnit}
            $backgroundColor={backgroundColor}
            {...restProps}
        >
            <div className={'trim'} style={{
                border: '1px double gainsboro',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: drawer[position].borderRadius
            }}>
                <div className={'trim'} style={{
                    width: 'calc(100% - 1.2rem)',
                    height: 'calc(100% - 2rem)',
                    margin: position === 'left' ? '1rem 1rem 1rem 0' : '1rem 0 1rem 1rem',
                    overflow: 'auto',
                    paddingRight: position === 'left' ? 0 : '1rem',
                    paddingLeft: position === 'left' ? '1rem' : 0,
                    direction: position === 'left' ? 'rtl' : 'ltr'
                }}>
                    <div className={'trim'} style={{direction: 'ltr'}}>
                        {children}
                    </div>
                </div>
            </div>
        </Container>
        {!show && <Handle onClick={() => setShow(true)} $position={position} $backgroundColor={backgroundColor}>
            <ReactIcon icon={RiArchiveDrawerFill}
                       style={{width: '21px', height: '21px', display: 'flex'}}/>
        </Handle>}
    </>;
};

export default memo(Drawer);