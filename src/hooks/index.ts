import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '../store';

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
        console.log('[useKeyPress] keyUpHandler');

        if (key === targetKey) callback(true);
    }, [targetKey, callback]);

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => document.removeEventListener('keyup', keyUpHandler);
    }, [keyUpHandler]);
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()