import { FC, memo, ReactNode, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';

interface WindowPortalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    onClose?: Function;
    openOnNextScreen?: boolean; // IF AVAILABLE!
    title?: string;
}

const WindowPortal: FC<WindowPortalProps> = ({openOnNextScreen = false, children, title = `${window.document.title} portal`, onClose}) => {
    const container = useMemo(() => document.createElement('div'), []);
    const timeoutRef = useRef<any>(null);

    useEffect(() => {
        let newWindow: Window | null = null;

        const beforeUnloadHandler = () => {
            console.log('[WindowPortal] beforeunload event listener!');
            onClose && onClose();
        };

        container.setAttribute('style', 'height: 100%; width: 100%;');
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const handler = (newWindow: Window | null) => {
                if (newWindow) {
                    newWindow.document.body.appendChild(container);

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
                    copyStyles(linkTags as Iterable<HTMLElement>, newWindow);

                    newWindow.document.title = title;
                    newWindow.addEventListener('beforeunload', beforeUnloadHandler);
                }
            }

            if ('getScreenDetails' in window && openOnNextScreen) {
                // @ts-ignore
                window.getScreenDetails().then(screenDetails => {
                    newWindow = window.open('','',`width=${screenDetails.currentScreen.width}, height=${screenDetails.currentScreen.height}`);
                    if (screenDetails.screens?.length > 1 && screenDetails.currentScreen === screenDetails.screens[0])
                        newWindow?.moveTo(screenDetails.currentScreen.width, 0)

                    handler(newWindow);
                });
            } else {
                const newWindow = window.open('','',`width=${window.screen.availWidth}, height=${window.screen.availWidth}`);
                newWindow?.moveTo(window.screen.availWidth, 0)
                handler(newWindow)
            }

        }, 700);

        return () => {
            clearTimeout(timeoutRef.current);
            if (newWindow) {
                newWindow.removeEventListener('beforeunload', beforeUnloadHandler);
                newWindow.close();
            }
        };

        // eslint-disable-next-line
    }, []); // Run once on mount

    return ReactDOM.createPortal(
        children,
        container
    );
};

export default memo(WindowPortal);