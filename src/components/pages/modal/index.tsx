import React, { useEffect, useState } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useOutsideClick } from '../../../hooks';
import { ModalProps } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { ReactIcon } from '../../partials';

const Modal = ({children, title, showClose, closeOnOutsideClick, onClose, width}: ModalProps) => {
    const [show, setShow] = useState(false);
    const [uid] = useState(`modal-${uuidv4()}`);

    const modalRef = useOutsideClick(outsideClickCloseHandler, true);

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        if (show) return;
        onClose && onClose();
    }, [onClose, show]);

    function outsideClickCloseHandler() {
        if (!closeOnOutsideClick) return;

        closeHandler();
    }

    function closeHandler() {
        setShow(false);
    }

    const closeButton = <>
        {showClose && <span onClick={closeHandler}
                            className={`btn-icon btn-close ${title ? 'position-relative' : 'position-absolute'}`}
                            style={{right: `${title ? 0 : 3}px`, top: !title ? '3px' : ''}}><ReactIcon icon={FaCircleXmark}/></span>}
    </>;

    const modal = <div className={'modal-overlay'}>
        <div id={uid} ref={modalRef} data-component={'Modal'} style={{width: width, opacity: show ? 1 : 0}}>
            {title && <div className={'header'}><span className={'title'}>{title}</span>{closeButton}</div>}
            {!title && closeButton}
            <div className={'content'}>
                {children}
            </div>
        </div>
    </div>;

    return ReactDOM.createPortal(show ? modal : null, document.body);
};

export default Modal;

