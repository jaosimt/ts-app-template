import { FC, useEffect, useRef, useState } from 'react';
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
export type ToastPosition = 'top-right' | 'top-left'; // | 'bottom-right' | 'bottom-left';
export type ToastTheme = 'outlined' | 'filled';

export const firstToastTop = 71;
export const toastGap = 21;

const Container = styled.div`
    position: fixed;
    top: -7rem;
    z-index: 77777;
`;

export const toastTopZIndex = 7777778;
export const toastDefaultZIndex = 7777777;

const ToastContainer: FC<any> = (props) => {
    const {toasts = []} = props;

    const delay = useRef(700);
    const paused = useRef(false);
    const toastRef = useRef<HTMLDivElement>(null);

    const [zIndexes, setZIndexes] = useState<any>([]);

    useEffect(() => {
        const intervalId = setInterval(updatePosition, delay.current);
        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setZIndexes(
            toasts.map((toast: ToastProps, i: number) => {
                const existing = zIndexes.find((zi: any) => zi.id === toast.id);
                const thisZIndex = (i+1 === toasts.length) ? toastTopZIndex : toastDefaultZIndex
                return existing ? {...existing, zIndex: thisZIndex} : {id: toast.id, zIndex: thisZIndex}
            })
        );

        // eslint-disable-next-line
    }, [toasts]);

    const setIntervalIsPaused = (pause: boolean) => paused.current = pause;

    const selectElementOnTop = (id: string) => {
        console.log('[selectElementOnTop] id:', id);
        setZIndexes(zIndexes.map((zI: any) => ({...zI, zIndex: id === zI.id ? toastTopZIndex : toastDefaultZIndex})));
    };

    function updatePosition() {
        if (paused.current) {
            delay.current = 100;
            return;
        }

        delay.current = 700;

        const toasts = toastRef.current?.querySelectorAll('[data-component="toast"]');
        if (toasts?.length) {
            let topRight: number = firstToastTop;
            let topLeft: number = firstToastTop;
            let thisTop = topRight;
            toasts.forEach((t: any) => {
                const top = parseFloat(getComputedStyle(t)['top']);
                switch(t.getAttribute('data-position') || 'top-right') {
                    case 'top-left':
                        thisTop = topLeft;
                        topLeft += toastGap;
                        break;
                    default: // top-right
                        thisTop = topRight;
                        topRight += toastGap;
                }
                if (top < window.innerHeight) t.style.top = `${thisTop}px`;
            });
        }
    }

    return <Container ref={toastRef} data-component={'toast-container'}>
        {toasts.map((toast: ToastProps) => {
            return <Toast key={toast.id} id={toast.id} toast={toast} zIndex={zIndexes.find((zi: any) => zi.id === toast.id)?.zIndex}
                          selectElementOnTop={selectElementOnTop} setIntervalIsPaused={setIntervalIsPaused}/>;
        })}
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    toasts: getToasts(state)
});

export default connect(mapStateToProps, null)(ToastContainer);