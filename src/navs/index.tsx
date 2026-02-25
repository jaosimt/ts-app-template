import { RefObject, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import './index.scss';
import { useResizeObserver } from 'usehooks-ts';
import { classNames } from '../utils';

export const NavigationMain = () => {
    const navRef = useRef<HTMLDivElement>(null);

    const [activeBar, setActiveBar] = useState({
        left: 0,
        width: 0,
        opacity: 0,
        transition: ''
    });

    useResizeObserver({
        ref: navRef as RefObject<HTMLElement>,
        onResize: () => {
            if (!navRef.current) return;
            const activeNav = navRef.current.querySelector('a.active');

            if (!activeNav) return;

            const {left, width} = activeNav.getBoundingClientRect();
            setActiveBar({left, width, opacity: 1, transition: 'transition-none'});
        },
    });

    useEffect(() => {
        if (!navRef.current) return;
        const activeNav = navRef.current.querySelector('a.active');

        if (!activeNav) return;

        const {left, width} = activeNav.getBoundingClientRect();
        setActiveBar({left, width, opacity: 1, transition: ''});
    }, []);

    const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const {left, width} = e.currentTarget.getBoundingClientRect();
        setActiveBar({left, width, opacity: 1, transition: ''});
    };

    return <nav ref={navRef} data-nav={'top'} className={'position-relative'} style={{
        width: '100%',
        justifyContent: 'flex-end'
    }}>
        <NavLink onClick={linkClickHandler} to={'/'}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Home</NavLink>
        <NavLink onClick={linkClickHandler} to={'/specs'}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Component
            Specs</NavLink>
        <NavLink onClick={linkClickHandler} to={'/demo'}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Demo</NavLink>
        <div className={activeBar.transition} style={{
            position: 'fixed',
            left: `${activeBar.left}px`,
            height: '2px',
            width: `${activeBar.width}px`,
            marginBottom: '-35px',
            transition: 'all 300ms ease-in-out',
            backgroundColor: 'white',
            opacity: `${activeBar.opacity}`
        }}></div>
    </nav>;
};

/* https://reactrouter.com/start/framework/navigating#navlink */