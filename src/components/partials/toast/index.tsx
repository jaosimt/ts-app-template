import { FC, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { getToasts } from '../slices/toast';
import Toast from './toast';

export interface ToastProps {
    id?: string;
    message: string;
    options?: ToastOptions;
    top?: number;
}

export interface ToastOptions {
    type?: ToastType;
    position?: ToastPosition;
    theme?: ToastTheme;
    duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right'; // 'top-left' | 'bottom-left' | 'bottom-right';
export type ToastTheme = 'default' | 'vibrant'; // 'top-left' | 'bottom-left' | 'bottom-right';

export const firstToastTop = 64;

const Container = styled.div`
    position: fixed;
    top: -7rem;
    z-index: 77777;
`;

const ToastContainer: FC<any> = (props) => {
    const {toasts = []} = props;

    const paused = useRef(false);
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intervalId = setInterval(updatePosition, 1400);
        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, []);

    const setIntervalIsPaused = (pause: boolean) => paused.current = pause
    ;

    function updatePosition() {
        if (paused.current) return;

        const toasts = toastRef.current?.querySelectorAll('[data-component="toast"]');
        if (toasts?.length) {
            let b: number = firstToastTop;
            toasts.forEach((t: any, i: number) => {
                const top = parseFloat(getComputedStyle(t)['top']);
                if (top < window.innerHeight && top !== b) t.style.top = `${b}px`;
                t.setAttribute('data-index', `${i+1}:${toasts.length}`);
                b += 7;
            });
        }
    }

    return <Container ref={toastRef} data-component={'toast-container'}>
        {toasts.map((toast: ToastProps) => {
            return <Toast key={toast.id} id={toast.id} toast={toast} setIntervalIsPaused={setIntervalIsPaused}/>;
        })}
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    toasts: getToasts(state)
});

export default connect(mapStateToProps, null)(ToastContainer);