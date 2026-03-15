import { FC, useEffect, useRef, useState } from 'react';
import {
    IoIosCloseCircle,
    IoIosWarning,
    IoIosInformationCircle,
    IoIosAlert,
    IoIosCheckmarkCircle
} from 'react-icons/io';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { CSSUnit } from '../../../constants/types';
import { useAppDispatch, usePrevious } from '../../../hooks';
import { isNullOrUndefined, isString, parseCSSUnit } from '../../../utils';
import { ReactIcon } from '../index';
import { removeToast } from '../slices/toast';
import { ToastPosition, ToastTheme, ToastType, toastTopZIndex } from './index';

const Container = styled.div<{
    $type: ToastType,
    $theme: ToastTheme,
    $position: ToastPosition
}>`
    display: flex;
    gap: 0.3rem;
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
                return props.$theme === 'filled' ? 'color: white; background-color: #dada00;' : 'color: #dada00; background-color: white;';
            case 'error':
                return props.$theme === 'filled' ? 'color: white; background-color: #ff7979;' : 'color: #ff7979; background-color: white;';
            default:
                return props.$theme === 'filled' ? 'color: white; background-color: #44a5ea;' : 'color: #44a5ea; background-color: white;';
        }
    }};

    ${props => {
        if (['bottom-right', 'top-right'].includes(props.$position)) return 'right: 1rem;';
        else return 'left: 1rem;';
    }};

    & > :first-child { margin-top: 0; }

    & > :last-child { margin-bottom: 0; }
`;

const Message = styled.div<{
    $omitIcon: boolean,
    $messageIsString: boolean,
    $width: CSSUnit,
}>`
    width: ${props => !props.$omitIcon ? parseCSSUnit(props.$width) : `calc(${parseCSSUnit(props.$width)} + 63px)`};
    font-size: small;
    font-weight: 700;
    display: inline-flex;
    align-self: center;
    overflow-wrap: anywhere;
    ${props => !props.$messageIsString && `flex-direction: column; ${props.$omitIcon ? 'margin-right: -1rem;' : ''} > :first-child { margin-top: 0; } > :last-child { margin-bottom: 0; }`}
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
    transition: width 300ms linear;
    background-color: ${props => {
        switch(props.$type) {
            case 'success':
                return props.$theme !== 'filled' ? '#1acb1a;' : 'white;';
            case 'warning':
                return props.$theme !== 'filled' ? '#dada00;' : 'white;';
            case 'error':
                return props.$theme !== 'filled' ? '#ff7979;' : 'white;';
            default:
                return props.$theme !== 'filled' ? '#44a5ea;' : 'white;';
        }
    }};
`;

const Toast: FC<any> = ({id: elId, toast, zIndex, selectElementOnTop}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {message, options} = toast;
    const {theme = 'outlined', type = 'info', position = 'top-right', duration = 0, width = 200, omitIcon = false} = options || {};
    const {closeOnPageChange = type !== 'error'} = options || {};

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

    const prevPathname = usePrevious(location.pathname);

    useEffect(() => {
        if (isNullOrUndefined(prevPathname) || !closeOnPageChange) return;
        if (location.pathname !== prevPathname) closeHandler();
        // eslint-disable-next-line
    }, [location.pathname]);

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
        {!omitIcon && <ReactIcon icon={icon} size={42}/>}
        <Message $width={width} $messageIsString={isString(message)} $omitIcon={omitIcon}>{message}</Message>
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