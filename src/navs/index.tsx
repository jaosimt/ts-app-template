import {RefObject, useEffect, useRef, useState} from 'react';
import {NavLink, useLocation} from 'react-router';
import './index.scss';
import {useResizeObserver} from 'usehooks-ts';
import { Theme } from '../constants';
import { ThemeProp } from '../constants/interfaces';
import {useOnScroll} from '../hooks';
import {classNames, getRandStr} from '../utils';
import {$secondaryColor, $secondaryColorDark} from "../styles/variables";

export const NavigationMain = ({theme}: { theme: ThemeProp }) => {
    const navRef = useRef<HTMLElement>(null);

    const {pathname} = useLocation();

    const [abVisible, setAbVisible] = useState(true);
    const [activeBar, setActiveBar] = useState({
        left: 0,
        width: 0,
        opacity: 0,
        transition: 'transition-none'
    });

    useResizeObserver({
        ref: navRef as RefObject<HTMLElement>,
        box: 'content-box',
        onResize: () => setActiveBar({...activeBar, transition: getRandStr(7)})
    });

    useOnScroll(() => {
        if (!navRef.current) return;

        if (navRef.current.getBoundingClientRect().top < 0) setAbVisible(false);
        else setAbVisible(true);
    });

    useEffect(() => {
        if (!navRef.current) return;
        const activeNav = navRef.current.querySelector('a.active');

        if (!activeNav) return;
        const {left, width} = activeNav.getBoundingClientRect();

        const nextActiveBar = {left, width, opacity: 1, transition: ''};
        (JSON.stringify(nextActiveBar) !== JSON.stringify(activeBar)) && setActiveBar(nextActiveBar);

        // eslint-disable-next-line
    }, [pathname, navRef.current, activeBar.transition]);

    return <nav ref={navRef} data-nav={'top'} className={'position-relative'} style={{
        width: '100%',
        justifyContent: 'flex-end'
    }}>
        <NavLink to={`/`}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200', 'nav-link')}>Home</NavLink>
        <NavLink to={`/specs`}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200', 'nav-link')}>Component
            Specs</NavLink>
        <NavLink to={`/demo`}
                 className={({isActive}) => classNames(isActive && 'active', 'transition-200', 'nav-link')}>Demo</NavLink>

        {abVisible &&
            <div className={activeBar.transition} style={{
                position: 'fixed',
                left: `${activeBar.left}px`,
                height: '2px',
                width: `${activeBar.width}px`,
                marginBottom: '-21px',
                transition: 'all 300ms ease-in-out, opacity 1400ms ease-in-out',
                backgroundColor: theme === Theme.DARK ? $secondaryColorDark : $secondaryColor,
                opacity: `${activeBar.opacity}`
            }}></div>
        }
    </nav>;
};

/* https://reactrouter.com/start/framework/navigating#navlink */