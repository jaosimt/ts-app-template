import { RefObject, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import './index.scss';
import { useResizeObserver } from 'usehooks-ts';
import { classNames, getRandStr } from '../utils';

export const NavigationMain = () => {
    const navRef = useRef<HTMLElement>(null);
    const location = useLocation();

    const [activeBar, setActiveBar] = useState({
        left: 0,
        width: 0,
        opacity: 0,
        transition: 'transition-none'
    });

    useResizeObserver({
        ref: navRef as RefObject<HTMLElement>,
        box:'content-box',
        onResize: () => setActiveBar({...activeBar, transition: getRandStr(7)})
    });

    useEffect(() => {
        if (!navRef.current) return;
        const activeNav = navRef.current.querySelector('a.active');

        if (!activeNav) return;
        const {left, width} = activeNav.getBoundingClientRect();

        const nextActiveBar = {left, width, opacity: 1, transition: ''};
        (JSON.stringify(nextActiveBar) !== JSON.stringify(activeBar)) && setActiveBar(nextActiveBar);

        // eslint-disable-next-line
    }, [location.pathname, navRef.current, activeBar.transition]);

    return <nav ref={navRef} data-nav={'top'} className={'position-relative'} style={{
        width: '100%',
        justifyContent: 'flex-end'
    }}>
        <NavLink to={'/'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Home</NavLink>
        <NavLink to={'/specs'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Component Specs</NavLink>
        <NavLink to={'/demo'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Demo</NavLink>

        <div className={activeBar.transition} style={{
            position: 'fixed',
            left: `${activeBar.left}px`,
            height: '2px',
            width: `${activeBar.width}px`,
            marginBottom: '-35px',
            transition: 'all 300ms ease-in-out, opacity 1400ms ease-in-out',
            backgroundColor: 'white',
            opacity: `${activeBar.opacity}`
        }}></div>
    </nav>;
};

/* https://reactrouter.com/start/framework/navigating#navlink */