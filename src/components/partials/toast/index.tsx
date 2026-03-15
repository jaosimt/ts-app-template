import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CSSUnit } from '../../../constants/types';
import { RootState, store } from '../../../store';
import { addToast, getToasts } from '../slices/toast';
import Toast from './toast';

export interface ToastProps {
    id?: string;
    message: string|ReactNode;
    options?: ToastOptions;
}

export interface ToastOptions {
    type?: ToastType;
    position?: ToastPosition;
    theme?: ToastTheme;
    duration?: number;
    closeOnPageChange?: boolean;
    width?: CSSUnit;
    omitIcon?: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
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

export const toast = (toastProps: ToastProps) => store.dispatch(addToast(toastProps));

const ToastContainer: FC<any> = (props) => {
    const {toasts = []} = props;

    const toastRef = useRef<HTMLDivElement>(null);

    const [zIndexes, setZIndexes] = useState<any>([]);

    useEffect(() => {
        const topRights = toasts.filter((t:any) => ['top-right', '', undefined, null].includes(t.options?.position));
        const topLefts = toasts.filter((t:any) => t.options?.position === 'top-left');
        const bottomRights = toasts.filter((t:any) => t.options?.position === 'bottom-right');
        const bottomLefts = toasts.filter((t:any) => t.options?.position === 'bottom-left');

        let countTR = 0;
        let countTL = 0;
        let countBR = 0;
        let countBL = 0;

        setZIndexes(
            toasts.map((toast: ToastProps) => {
                const position = toast.options?.position || 'top-right';
                const thisZIndex = (() => {
                    switch(position) {
                        case 'bottom-left':
                            countBL++;
                            return countBL === bottomLefts.length ? toastTopZIndex : toastDefaultZIndex
                        case 'bottom-right':
                            countBR++;
                            return countBR === bottomRights.length ? toastTopZIndex : toastDefaultZIndex
                        case 'top-left':
                            countTL++;
                            return countTL === topLefts.length ? toastTopZIndex : toastDefaultZIndex
                        default: // top-right
                            countTR++;
                            return countTR === topRights.length ? toastTopZIndex : toastDefaultZIndex
                    }
                })();

                return {id: toast.id, position, zIndex: thisZIndex}
            })
        );

        // eslint-disable-next-line
    }, [toasts]);

    const selectElementOnTop = (id: string) => {
        const position = zIndexes.find((z:any) => z.id === id).position;
        setZIndexes(zIndexes.map((zI: any) => {
            return zI.position !== position ? zI : {...zI, zIndex: id === zI.id ? toastTopZIndex : toastDefaultZIndex}
        }));
    };

    return <Container ref={toastRef} data-component={'toast-container'}>
        {toasts.map((toast: ToastProps) => {
            return <Toast key={toast.id} id={toast.id} toast={toast} zIndex={zIndexes.find((zi: any) => zi.id === toast.id)?.zIndex}
                          selectElementOnTop={selectElementOnTop}/>;
        })}
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    toasts: getToasts(state)
});

export default connect(mapStateToProps, null)(ToastContainer);