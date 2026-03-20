import { FC, HTMLAttributes, memo, useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { CSSUnit } from '../../../constants/types';
import { useKeyPress } from '../../../hooks';
import { v4 as uuidv4 } from 'uuid';
import { classNames, isElementOnTop, parseCSSUnit } from '../../../utils';
import { ReactIcon } from '../index';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    closeOnEscKey?: boolean;
    closeOnOutsideClick?: boolean;
    maxZIndex?: boolean;
    onClose?: Function
    showClose?: boolean;
    title?: string;
    width?: CSSUnit;
}

const StyledModal = styled.div<{
    $width: CSSUnit;
    $opacity: number;
    $margin: CSSUnit;
}>`
    transition: margin 300ms ease-in-out, opacity 300ms ease-in-out !important;
    width: ${props => props.$width};
    opacity: ${props => props.$opacity} !important;
    margin-top: ${props => props.$margin} !important;
`;

const Modal: FC<ModalProps> = (props) => {
    const {
        children,
        closeOnEscKey = true,
        closeOnOutsideClick = true,
        maxZIndex,
        onClose,
        showClose,
        title,
        width
    } = props;
    const [show, setShow] = useState(false);
    const [modalProps, setModalProps] = useState({
        opacity: 0,
        margin: '-2rem' as CSSUnit
    });
    const [uid] = useState(`modal-${uuidv4()}`);

    const overlayRef = useRef<any>(null);
    const modalRef = useRef<any>(null);


    const closeHandler = useCallback(() => {
        setShow(false);
        onClose && onClose();
    }, [onClose]);

    const preCloseHandler = useCallback(() => {
        setModalProps({
            opacity: 0,
            margin: '-2rem'
        })
    }, []);

    const escKeyPressHandler = useCallback((pressed: boolean) => {
        if (pressed) {
            const modal = modalRef.current as HTMLElement;
            isElementOnTop(modal) && modal.getAttribute('data-escape-key') === 'true' && preCloseHandler();
        }
    }, [preCloseHandler, modalRef]);

    useKeyPress('Escape', escKeyPressHandler);
    useOnClickOutside(modalRef, () => {
        if (!closeOnOutsideClick || !isElementOnTop(modalRef.current)) return;
        preCloseHandler();
    });

    useEffect(() => {
        setShow(true);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!show) return;
        setModalProps({
            opacity: 1,
            margin: 0
        })
    }, [show]);

    useEffect(() => {
        if (!(show && modalProps.opacity === 0)) return;

        const timeout = setTimeout(closeHandler, 350);
        return () => clearTimeout(timeout);

        //eslint-disable-next-line
    }, [modalProps.opacity]);

    const closeButton = <>
        {showClose && <span onClick={preCloseHandler}
                            className={`btn-icon btn-close ${title ? 'position-relative' : 'position-absolute'}`}
                            style={{marginRight: 0, right: `${title ? 0 : 3}px`, top: !title ? '3px' : ''}}><ReactIcon
            icon={FaCircleXmark}/></span>}
    </>;

    const modal = <div id={uid} ref={overlayRef} className={classNames('modal-overlay', maxZIndex && 'max-z-index')}>
        <StyledModal $width={parseCSSUnit(width as CSSUnit)} $opacity={modalProps.opacity}  $margin={modalProps.margin} ref={modalRef} data-component={'modal'} data-escape-key={closeOnEscKey}>
            {title && <div className={'header'}><span className={'title'}>{title}</span>{closeButton}</div>}
            {!title && closeButton}
            <div className={'content'}>
                {children}
            </div>
        </StyledModal>
    </div>;

    return ReactDOM.createPortal(show ? modal : null, document.body);
};

export default memo(Modal);

