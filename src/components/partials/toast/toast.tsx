import { FC, useEffect, useRef, useState } from 'react';
import {
    IoIosCloseCircle,
    IoIosWarning,
    IoIosInformationCircle,
    IoIosAlert,
    IoIosCheckmarkCircle
} from 'react-icons/io';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks';
import { CSSUnit } from '../../../types';
import { ReactIcon } from '../index';
import { removeToast } from '../slices/toast';
import { ToastPosition, ToastTheme, ToastType } from './index';

const Container = styled.div<{
    $type: ToastType,
    $theme: ToastTheme,
    $position: ToastPosition
}>`
    overflow: hidden;
    position: fixed;
    transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
    padding: 0.5rem 0.1rem 0.5rem 0.5rem;
    border: 1px solid whitesmoke;
    border-radius: 0.5rem;
    box-shadow: -1px 1px 7px 0 rgba(0, 0, 0, 0.2);
    ${props => {
        switch(props.$type) {
            case 'success':
                return props.$theme === 'vibrant' ? 'color: white; background-color: #8de4a0;' : 'color: #8de4a0; background-color: white;';
            case 'warning':
                return props.$theme === 'vibrant' ? 'color: white; background-color: #e9de81;' : 'color: #e9de81; background-color: white;';
            case 'error':
                return props.$theme === 'vibrant' ? 'color: white; background-color: #ec76a4;' : 'color: #ec76a4; background-color: white;';
            default:
                return props.$theme === 'vibrant' ? 'color: white; background-color: #85c9e9;' : 'color: #85c9e9; background-color: white;';
        }
    }};
    ${props => {
        if (['top-right', 'top-right'].includes(props.$position)) return 'right: 1rem;';
        else return 'left: 1rem;';
    }}
`;

const Message = styled.div`
    width: 196px;
    font-size: smaller;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    overflow-wrap: anywhere;
`;

const IconWrapper = styled.span`
    margin-top: -0.3rem;
    margin-right: 0.1rem;
    height: 16px;
    width: 16px;
`;

const ProgressBar = styled.div<{
    $type: ToastType,
    $theme: ToastTheme,
}>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
    transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
    background-color: ${props => {
        switch(props.$type) {
            case 'success':
                return props.$theme !== 'vibrant' ? '#8de4a0;' : 'white;';
            case 'warning':
                return props.$theme !== 'vibrant' ? '#e9de81;' : 'white;';
            case 'error':
                return props.$theme !== 'vibrant' ? '#ec76a4;' : 'white;';
            default:
                return props.$theme !== 'vibrant' ? '#85c9e9;' : 'white;';
        }
    }};
`;

const topZIndex = 7777778;
const defaultZIndex = 7777777;

const Toast: FC<any> = ({id: elId, toast, setIntervalIsPaused}) => {
    const dispatch = useAppDispatch();

    const {message, options} = toast;
    const {theme = 'default', type = 'info', position = 'top-right', duration = 0} = options || {};

    const progressRef = useRef<HTMLDivElement>(null);
    const hovered = useRef(false);

    const [icon] = useState(() => {
        switch (type) {
            case 'success':
                return IoIosCheckmarkCircle;
            case 'warning':
                return IoIosWarning;
            case 'error':
                return IoIosAlert;
            default:
                return IoIosInformationCircle;
        }
    });
    const [top, setTop] = useState<CSSUnit>('-7em');
    const [opacity, setOpacity] = useState<number>(1);
    const [zIndex, setZIndex] = useState<number>(defaultZIndex);

    useEffect(() => {
        setTop(`${toast.top}px`);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (type === 'error' || duration === 0 || top === '-7em' || progressRef.current === null) return;
        const elem: HTMLDivElement = progressRef.current;

        let width = 100;
        let intervalId: any = null;

        const frame = () => {
            if (hovered.current) return;

            const el: any = document.querySelector(`#${elId}`);
            if (el) {
                const idx = el.getAttribute('data-index');
                const zIndex = el.style.zIndex;
                if (idx) {
                    const sIdx = idx.split(':');
                    if (sIdx[0] !== sIdx[1] && +zIndex !== topZIndex) return;
                }
            }

            if (width <= 0) {
                clearInterval(intervalId);
                closeHandler();
            } else {
                width--;
                elem.style.width = width + '%';
            }
        };

        intervalId = setInterval(frame, (duration / 100));


        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, [top]);

    function closeHandler() {
        setIntervalIsPaused(true);

        setTop('110%');
        setOpacity(0);

        setTimeout(() => {
            dispatch(removeToast(toast.id));
            setIntervalIsPaused(false);
        }, 700);
    }

    return <Container
        data-component={'toast'}
        key={elId}
        id={elId}
        $type={type}
        $theme={theme}
        $position={position}
        style={{top: top, zIndex: zIndex, opacity: opacity}}
        className={'trim display-flex gap-0p5 align-items-start'}
        onClick={() => setZIndex(topZIndex)}
        onMouseEnter={() => hovered.current = true}
        onMouseLeave={() => hovered.current = false}
    >
        <ReactIcon icon={icon} size={42}/>
        <Message>{message}</Message>
        <IconWrapper className="hover-scale">
            <ReactIcon className={'cursor-pointer'} onClick={closeHandler} icon={IoIosCloseCircle}/>
        </IconWrapper>
        {type !== 'error' && duration > 0 && <ProgressBar
            $type={type}
            $theme={theme}
            ref={progressRef}/>}
    </Container>;
};

export default Toast;