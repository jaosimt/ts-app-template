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
import { ToastPosition, ToastTheme, ToastType, toastTopZIndex } from './index';

const Container = styled.div<{
    $type: ToastType,
    $theme: ToastTheme,
    $position: ToastPosition
}>`
    display: flex;
    gap: 0.5rem;
    align-items: start;
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
                return props.$theme === 'filled' ? 'color: white; background-color: #1acb1a;' : 'color: #1acb1a; background-color: white;';
            case 'warning':
                return props.$theme === 'filled' ? 'color: white; background-color: #f2f22b;' : 'color: #f2f22b; background-color: white;';
            case 'error':
                return props.$theme === 'filled' ? 'color: white; background-color: #ff7979;' : 'color: #ff7979; background-color: white;';
            default:
                return props.$theme === 'filled' ? 'color: white; background-color: #459eff;' : 'color: #459eff; background-color: white;';
        }
    }};

    ${props => {
        if (['bottom-right', 'top-right'].includes(props.$position)) return 'right: 1rem;';
        else return 'left: 1rem;';
    }};

    & > :first-child { margin-top: 0; }

    & > :last-child { margin-bottom: 0; }
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
    background-color: ${props => {
        switch(props.$type) {
            case 'success':
                return props.$theme !== 'filled' ? '#1acb1a;' : 'white;';
            case 'warning':
                return props.$theme !== 'filled' ? '#f2f22b;' : 'white;';
            case 'error':
                return props.$theme !== 'filled' ? '#ff7979;' : 'white;';
            default:
                return props.$theme !== 'filled' ? '#459eff;' : 'white;';
        }
    }};
`;

const Toast: FC<any> = ({id: elId, toast, zIndex, selectElementOnTop}) => {
    const dispatch = useAppDispatch();

    const {message, options} = toast;
    const {theme = 'outlined', type = 'info', position = 'top-right', duration = 0} = options || {};

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

    useEffect(() => {
        setTop(`${toast.top}px`);
        // eslint-disable-next-line
    }, [toast]);

    useEffect(() => {
        if (type === 'error' || duration === 0 || top === '-7em' || progressRef.current === null) return;
        const elem: HTMLDivElement = progressRef.current;

        let width = 100;
        let intervalId: any = null;

        const frame = () => {
            if (hovered.current) return;

            const el: any = document.querySelector(`#${elId}`);
            if (el && +el.style.zIndex !== toastTopZIndex) return;

            if (width <= 0) {
                clearInterval(intervalId);
                closeHandler();
            } else {
                width--;
                elem.style.width = width + '%';
            }
        };

        intervalId = setInterval(frame, (duration/100));


        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, [top]);

    function closeHandler() {
        setTop('110%');
        setOpacity(0);
        setTimeout(() => dispatch(removeToast(toast.id)), 700);
    }

    const styles:{top?: number|string, bottom?: number|string, zIndex: number, opacity: number} = {zIndex: zIndex, opacity: opacity};
    if (position.startsWith('top')) styles.top = top;
    else styles.bottom = top;

    return <Container
        data-component={'toast'}
        data-position={position}
        key={elId}
        id={elId}
        $type={type}
        $theme={theme}
        $position={position}
        style={styles}
        onClick={() => selectElementOnTop(elId) }
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