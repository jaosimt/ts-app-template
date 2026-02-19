import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: () => void, parentTarget = false) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref) return;

        const handleClickOutside = (event: { target: any; }) => {
            // Check if the click occurred outside the referenced element
            if (ref.current && !(ref.current as HTMLElement).contains(event.target)) {
                callback(); // Execute the provided callback function
            }
        };

        const target = (() => {
            if (parentTarget && ref.current)
                return (ref.current as HTMLElement).parentElement;

            return document;
        })();

        // Attach the event listener to the document
        target?.addEventListener('click', handleClickOutside, true);

        // Clean up the event listener on component unmount
        return () => {
            target?.removeEventListener('click', handleClickOutside, true);
        };
    }, [callback, parentTarget]); // Re-run the effect if the callback changes

    return ref;
};

// const useKeyPress = (targetKey: string, callback: Function, options?: { listen: boolean, targetSelector: string }) => {
//     const {listen, targetSelector} = Object.assign({listen: true}, options);
//
//     const [keyPressed, setKeyPressed] = useState(false);
//     const [target, setTarget] = useState<HTMLElement | null>(null);
//
//     const downHandler = (event: { target: any; }) => {
//         console.log(event);
//         // const myKey = key === targetKey;
//         // if (myKey) setKeyPressed(true);
//     };
//
//     const upHandler = (event: { target: any; }) => {
//         // if (key === targetKey) setKeyPressed(false);
//         console.log(event);
//     };
//
//     const disengage = () => {
//         if (!target) return;
//         target.removeEventListener('keydown', downHandler);
//         target.removeEventListener('keyup', upHandler);
//     };
//
//     useEffect(() => {
//         if (!listen) {
//             disengage();
//             return;
//         }
//
//         const _target = document.querySelector(targetSelector) || document;
//         setTarget(_target as HTMLElement);
//
//         console.log('_target:', _target)
//
//         _target.addEventListener('keydown', downHandler);
//         _target.addEventListener('keyup', upHandler);
//
//         return disengage;
//     }, []);
//
//     if (keyPressed) {
//         if (callback) callback(keyPressed);
//         else return keyPressed;
//     }
//
//     return null;
// };

export { useOutsideClick };