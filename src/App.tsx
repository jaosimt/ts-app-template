import { useEffect, useMemo, useState } from 'react';
import { IoIosMoon } from 'react-icons/io';
import {IoCloudOffline, IoLogoReact, IoSunny} from 'react-icons/io5';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router';
import { ReactIcon } from './components/partials';
import CollapsibleLink from './components/partials/collapsibleLink';
import Modal from './components/partials/modal';
import ToastContainer, { toast } from './components/partials/toast';
import { targetUnicode } from './constants';
import { NavigationMain } from './navs';
import ContentRouter from './routes';
import { getError } from './slices/error';
import { RootState } from './store';
import { classNames, hashCode } from './utils';
import './App.scss';
import './styles/animations.scss';
import './styles/tippy.scss';
import {getTheme, toggleTheme} from "./slices/theme";
import {useAppDispatch} from "./hooks";

export interface ThemeProp {
    theme: 'dark' | 'light';
}

const App = ({error, theme}: { error: any, theme: ThemeProp }) => {
    const dispatch = useAppDispatch();

    const [offline, setOffline] = useState(false);

    const setConnectionStatus = ({type}: { type: string }) => {
        if (!['online', 'offline'].includes(type)) return;
        setOffline(type === 'offline');
    };

    const {pathname} = useLocation();

    useEffect(() => {
        if (!sessionStorage.getItem('welcome-uc-shown')) {
            toast({
                id: 'under-construction-toast',
                message: <>
                    <h4 className="m-0">Welcome to the React + TypeScript started app template!</h4>
                    <p className={'mb-0'}>However, this site is still <b>Under Construction!</b> So you might be seeing some undesirables especially the color combinations as the theme feature is currently on going!</p>
                    <p className={'mb-0'}>Please bear with us, Thank you very much!</p>
                    <p className={'m-0'}>&nbsp;</p>
                </>,
                options: {theme: 'filled', type: 'info', omitIcon: false, duration: 21000}
            });
            sessionStorage.setItem('welcome-uc-shown', 'true');
        }

        window.addEventListener('online', setConnectionStatus);
        window.addEventListener('offline', setConnectionStatus);

        return () => {
            window.removeEventListener('online', setConnectionStatus);
            window.removeEventListener('offline', setConnectionStatus);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.body.setAttribute('class', String(theme));
    }, [theme]);

    useEffect(() => {
        if (error) {
            toast({
                id: `${error?.code || 'unknown-error-code'}-${hashCode(error?.message || error || 'unknown error')}`,
                message: error?.stack ? <span className={'display-flex flex-direction-column'}>
                    <span>{error?.message || error}</span>
                    <span className="font-size-smaller">
                        <CollapsibleLink detailsClassName={'background p-0p3 border-radius-0p2'} linkText={'Details'} details={error?.stack}/>
                    </span>
                </span> : error?.message || error,
                options: {type: 'error', omitIcon: false, theme: 'filled'}
            });
        }
    }, [error]);

    const MemoizedConnectionModal = useMemo(() => {
        return offline && <Modal closeOnEscKey={false} closeOnOutsideClick={false} showClose={false} maxZIndex={true}>
            <div className={'display-flex gap-1 align-content-center'} style={{width: '15rem'}}>
                <ReactIcon size={42} className={'color-red'} icon={IoCloudOffline}/>
                <div className={'display-flex flex-direction-column justify-content-center'}>
                    <p className={'color-red m-0'}>You are currently offline!</p>
                    <p style={{fontSize: '0.7rem', fontWeight: 700}} className={'m-0'}>Please check your
                        connection...</p>
                </div>
            </div>

        </Modal>;
    }, [offline]);

    return (<>
        {MemoizedConnectionModal}
        <header className={'grid cols-2'}>
            <Link className={'white-space-nowrap display-flex align-items-center gap-0p5 color-inherit nav-link'}
                  to={{pathname: `/`}}>
                <ReactIcon size={35} className={classNames(pathname === `/` && 'spin', 'font-weight-bold')}
                           icon={IoLogoReact}/>
                <h3 className={'m-0'}>React TypeScript Template</h3>
            </Link>
            <NavigationMain theme={theme}/>
            <ReactIcon className={'hover-scale'} style={{padding: 0, cursor: 'pointer'}} icon={theme === ('dark' as any) ? IoIosMoon : IoSunny}
                       size={28} onClick={() => dispatch(toggleTheme())}/>
        </header>
        <main>{<ContentRouter theme={theme}/>}</main>
        <footer className={'display-flex justify-content-space-between align-items-center'}>
            <span>&copy; ᜐᜒᜋᜓ {new Date().getFullYear()} {targetUnicode} All rights reserved.</span>
        </footer>
        <ToastContainer/>
    </>);
};

const mapStateToProps = (state: RootState) => ({
    error: getError(state),
    theme: getTheme(state),
});

export default connect(mapStateToProps)(App);