import { NavLink } from 'react-router';
import './index.scss';
import { classNames } from '../utils';

export const NavigationMain = () => {
    return <nav data-nav={'top'}>
        <NavLink to={'/'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Home</NavLink>
        <NavLink to={'/specs'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Component Specs</NavLink>
        <NavLink to={'/demo'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Demo</NavLink>
    </nav>;
};

/* https://reactrouter.com/start/framework/navigating#navlink */