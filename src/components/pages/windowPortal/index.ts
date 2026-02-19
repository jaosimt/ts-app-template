import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import type { WindowPortalProps } from '../../../types';

const WindowPortal = ({children, title = `${window.document.title} portal`, onClose}: WindowPortalProps) => {
    const [, setExternalWindow] = useState<Window | null>(null);
    const container = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        // 1. Open a new window when the component mounts
        const newWindow = window.open();
        setExternalWindow(newWindow);

        if (newWindow) {
            // Create a div in the new window's body to render React content into
            newWindow.document.body.appendChild(container);

            // 2. Copy styles from the parent window
            const styleTags = document.head.getElementsByTagName('style');
            const linkTags = document.head.querySelectorAll('link[rel="stylesheet"]');

            const copyStyles = (
                tags: ArrayLike<HTMLElement> | Iterable<HTMLElement>,
                newWin: Window
            ): void => {
                Array.from(tags).forEach((tag: HTMLElement) => {
                    newWin.document.head.appendChild(tag.cloneNode(true));
                });
            };

            copyStyles(styleTags, newWindow);
            // @ts-ignore
            copyStyles(linkTags, newWindow);

            // Optional: Add a title to the new window
            newWindow.document.title = title;

            newWindow.addEventListener('beforeunload', () => {
                onClose && onClose();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    return ReactDOM.createPortal(
        children,
        container
    );
};

export default WindowPortal;