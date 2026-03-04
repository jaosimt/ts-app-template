import { FC, HTMLAttributes, memo, useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useOnClickOutside } from 'usehooks-ts';
import { useKeyPress } from '../../../hooks';
import { v4 as uuidv4 } from 'uuid';
import { CSSUnit } from '../../../types';
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

    const overlayRef = useRef<any>(null);
    const modalRef = useRef<any>(null);

    const closeHandler = useCallback(() => {
        setShow(false);
        onClose && onClose();
    }, [onClose]);

    const escKeyPressHandler = useCallback((pressed: boolean) => {
        if (pressed) {
            const modal = modalRef.current as HTMLElement;
            isElementOnTop(modal) && modal.getAttribute('data-escape-key') === 'true' && closeHandler();
        }
    }, [closeHandler, modalRef]);

    useKeyPress('Escape', escKeyPressHandler);
    useOnClickOutside(modalRef, () => {
        if (!closeOnOutsideClick || !isElementOnTop(modalRef.current)) return;
        closeHandler();
    });

    useEffect(() => {
        setShow(true);
    }, []);

    const closeButton = <>
        {showClose && <span onClick={closeHandler}
                            className={`btn-icon btn-close ${title ? 'position-relative' : 'position-absolute'}`}
                            style={{right: `${title ? 0 : 3}px`, top: !title ? '3px' : ''}}><ReactIcon
            icon={FaCircleXmark}/></span>}
    </>;

    const modal = <div id={uid} ref={overlayRef} className={classNames('modal-overlay', maxZIndex && 'max-z-index')}>
        <div ref={modalRef} data-component={'modal'} data-escape-key={closeOnEscKey}
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

export default memo(Modal);

