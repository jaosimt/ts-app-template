import { FC, useEffect, useState } from 'react';
import { IoIosCloseCircle, IoIosWarning } from 'react-icons/io';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks';
import { CSSUnit } from '../../../types';
import { ReactIcon } from '../index';
import { removeToast } from '../slices/toast';
import { ToastPosition, ToastType } from './index';

const Container = styled.div<{
    $type: ToastType,
    $position: ToastPosition
}>`
    position: fixed;
    z-index: 7777;
    transition: all 300ms ease-in-out;
    padding: 0.5rem 0.1rem 0.5rem 1rem;
    border: 1px solid whitesmoke;
    border-radius: 0.5rem;
    color: white;
    box-shadow: -1px 1px 7px 0 rgba(0, 0, 0, 0.2);
    ${props => {
        switch(props.$type) {
            case 'success': return 'background-color: #32bc50;';
            case 'error': return 'background-color:  #ff0063;';
            case 'info': return 'background-color:  #00adff;';
            case 'warning': return 'background-color:  #ffe300; color: inherit;';
        }
    }};
    ${props => {
        if (['top-right', 'bottom-right'].includes(props.$position)) return 'right: 1rem;';
        else return 'left: 1rem;';
    }}
`;

const Toast: FC<any> = ({id: elId, toast}) => {
    const dispatch = useAppDispatch();

    const {message, options} = toast;
    const {type = 'info', position = 'top-right', duration = 3} = options || {};

    const [bottom, setBottom] = useState<CSSUnit>('-3rem');

    useEffect(() => {
        setBottom('3rem')
    }, []);

    const closeHandler = () => {
        setBottom('-7rem');
        setTimeout(() => dispatch(removeToast(toast.id)), 700);
    }

    return <Container
        key={elId}
        id={elId}
        $type={type}
        $position={position}
        style={{bottom: bottom}}
        className={'trim display-flex gap-0p5 align-items-start'}
    >
        <ReactIcon icon={IoIosWarning} size={42}/>
        <div style={{marginTop: '0.6rem', width: '175px'}}>{message}</div>
        <ReactIcon className={'cursor-pointer hover-scale'} onClick={closeHandler} style={{marginTop: '-0.3rem'}} icon={IoIosCloseCircle}/>
    </Container>;
};

export default Toast;