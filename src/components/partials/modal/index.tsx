import { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useKeyPress, useOutsideClick } from '../../../hooks';
import { v4 as uuidv4 } from 'uuid';
import { CSSUnit } from '../../../types';
import { classNames, parseCSSUnit } from '../../../utils';
import ReactIcon from '../index';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    closeOnEscKey?: boolean;
    closeOnOutsideClick?: boolean;
    maxZIndex?: boolean;
    onClose?: Function
    showClose?: boolean;
    title?: string;
    width?: CSSUnit;
}

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
        <div ref={modalRef} data-component={'Modal'} data-escape-key={closeOnEscKey}
             style={{width: parseCSSUnit(width as CSSUnit), opacity: show ? 1 : 0}}>
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

