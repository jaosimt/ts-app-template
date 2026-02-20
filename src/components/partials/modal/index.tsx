import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useKeyPress, useOutsideClick } from '../../../hooks';
import { ModalProps } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { classNames } from '../../../utils';
import { ReactIcon } from '../index';

const Modal = ({
                   children,
                   title,
                   showClose,
                   closeOnOutsideClick,
                   closeOnEscKey,
                   onClose,
                   width,
                   maxZIndex
               }: ModalProps) => {
    const [show, setShow] = useState(false);
    const [uid] = useState(`modal-${uuidv4()}`);

    const modalRef = useOutsideClick(outsideClickCloseHandler, true);

    const closeHandler = useCallback(() => {
        setShow(false);
        onClose && onClose();
    }, [onClose]);

    const escKeyPressHandler = useCallback((pressed: boolean) => {
        if (pressed) {
            const modal = modalRef.current as unknown as HTMLElement;
            if (modal) {
                const closeOnEscKeyEnabled = modal.getAttribute('data-escape-key') === 'true';
                if (closeOnEscKeyEnabled) {
                    const nextModalOverlay = document.querySelector(`#${uid}.modal-overlay ~ .modal-overlay`);
                    !nextModalOverlay && closeHandler();
                }
            }
        }
    }, [closeHandler, modalRef, uid]);

    useKeyPress('Escape', escKeyPressHandler);

    useEffect(() => {
        setShow(true);
    }, []);

    function outsideClickCloseHandler() {
        if (!closeOnOutsideClick) return;
        closeHandler();
    }

    const closeButton = <>
        {showClose && <span onClick={closeHandler}
                            className={`btn-icon btn-close ${title ? 'position-relative' : 'position-absolute'}`}
                            style={{right: `${title ? 0 : 3}px`, top: !title ? '3px' : ''}}><ReactIcon
            icon={FaCircleXmark}/></span>}
    </>;

    const modal = <div id={uid} className={classNames('modal-overlay', maxZIndex && 'max-z-index')}>
        <div ref={modalRef} data-component={'Modal'} data-escape-key={closeOnEscKey === true}
             style={{width: width, opacity: show ? 1 : 0}}>
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

