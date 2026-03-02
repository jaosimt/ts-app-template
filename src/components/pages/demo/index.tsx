import { FC } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { classNames } from '../../../utils';
import UnderConstruction from '../underConstruction';

const Demo: FC = () => {
    const {pathname} = useLocation();

    return <div data-component={'demo'} className={'width-100p'} style={{minHeight: '490px'}}>
        <div className="display-flex gap-1" style={{height: '100%'}}>
            <nav data-nav={'left'} className={'px-0p2 py-0p4'} style={{width: '150px', height: '100%'}}>
                <NavLink to={'/demo/box'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Box</NavLink>
                <NavLink to={'/demo/button'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Button</NavLink>
                <NavLink to={'/demo/input-field'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>InputFields</NavLink>
                <NavLink to={'/demo/loading'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Loading</NavLink>
                <NavLink to={'/demo/modal'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Modal</NavLink>
                <NavLink to={'/demo/tab'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Tab</NavLink>
                <NavLink to={'/demo/window-portal'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>WindowPortal</NavLink>
            </nav>
            <div className={'p-1p5 border-radius-0p3 position-relative'} style={{width: 'calc(100% - 150px', backgroundColor: '#f8f8f8'}}>
                {pathname === '/demo' && <UnderConstruction/>}
                <div style={{overflow: 'auto', height: '100%'}}>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>;
};

export default Demo;