import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '../store';

export const useDebounce = (callback: Function, delay: number = 700) => {
    const ref = useRef<any>(null);
    useEffect(() => {
        ref.current = setTimeout(callback, delay);

        return () => clearTimeout(ref.current);
    }, [callback, delay])
}

// export const useOutsideClick = (callback: () => void, parentTarget = false) => {
//     const ref = useRef(null);
//
//     useEffect(() => {
//         if (!ref) return;
//
//         const handleClickOutside = (event: { target: any; }) => {
//             // Check if the click occurred outside the referenced element
//             if (ref.current && !(ref.current as HTMLElement).contains(event.target)) {
//                 callback(); // Execute the provided callback function
//             }
//         };
//
//         const target = (() => {
//             if (parentTarget && ref.current)
//                 return (ref.current as HTMLElement).parentElement;
//
//             return document;
//         })();
//
//         // Attach the event listener to the document
//         target?.addEventListener('click', handleClickOutside, true);
//
//         // Clean up the event listener on component unmount
//         return () => {
//             target?.removeEventListener('click', handleClickOutside, true);
//         };
//     }, [callback, parentTarget]); // Re-run the effect if the callback changes
//
//     return ref;
// };

export const useKeyPress = (targetKey: string, callback: Function) => {
    const keyUpHandler = useCallback(({key}: { key: string }) => {
        console.log(`[useKeyPress][${key}] keyUpHandler`);

        if (key === targetKey) callback(true);
    }, [targetKey, callback]);

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => document.removeEventListener('keyup', keyUpHandler);
    }, [keyUpHandler]);
};

export const useOnScroll = (callback: EventListener, element: HTMLElement | Window = window) => {
    useEffect(() => {
        // Add the event listener when the component mounts
        element.addEventListener('scroll', callback);

        // Remove the event listener when the component unmounts (cleanup function)
        return () => {
            element.removeEventListener('scroll', callback);
        };
        // eslint-disable-next-line
    }, []);
}

export const usePrevious = (value: any) => {
    const ref = useRef<any>(null);
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()