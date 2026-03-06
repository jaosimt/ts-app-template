import { FC } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { getToasts } from '../slices/toast';
import Toast from './toast';

export interface ToastProps {
    id?: string;
    message: string;
    options?: ToastOptions;
    isClosed?: boolean;
}

export interface ToastOptions {
    type?: ToastType;
    position?: ToastPosition;
    duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const Container = styled.div`
    position: fixed;
    bottom: -3rem;
    z-index: 777;
`;


const ToastContainer: FC<any> = (props) => {
    const {toasts = []} = props;
    console.log('toasts:', toasts);

    return <Container>
        {toasts.map((toast: ToastProps, i: number) => <Toast key={toast.id} id={toast.id} toast={toast}></Toast>)}
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    toasts: getToasts(state)
});

export default connect(mapStateToProps, null)(ToastContainer);