import { NavLink } from 'react-router';
import './index.scss';
import { classNames } from '../utils';

export const NavigationMain = () => {
    return <nav data-component={'main-nav'}>
        <NavLink to={'/'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Home</NavLink>
        <NavLink to={'/demo'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Demo</NavLink>
        <NavLink to={'/login'} className={({isActive}) => classNames(isActive && 'active', 'transition-200', 'ml-1')} >Login</NavLink>
    </nav>;
};

/* https://reactrouter.com/start/framework/navigating#navlink */