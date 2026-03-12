import { useEffect, useMemo, useState } from 'react';
import { IoCloudOffline, IoLogoReact } from 'react-icons/io5';
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
import { classNames, hashCode } from './utils';
import './App.scss';
import './styles/animations.scss';
import './styles/tippy.scss';
import {getTheme, toggleTheme} from "./slices/theme";
import {MdOutlineInvertColors} from "react-icons/md";
import {useAppDispatch} from "./hooks";

const App = ({error, theme}: { error: any, theme: string }) => {
    const dispatch = useAppDispatch();

    const [offline, setOffline] = useState(false);

    const setConnectionStatus = ({type}: { type: string }) => {
        if (!['online', 'offline'].includes(type)) return;
        setOffline(type === 'offline');
    };

    const {pathname} = useLocation();

    useEffect(() => {
        window.addEventListener('online', setConnectionStatus);
        window.addEventListener('offline', setConnectionStatus);

        return () => {
            window.removeEventListener('online', setConnectionStatus);
            window.removeEventListener('offline', setConnectionStatus);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.body.setAttribute('class', theme);
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

    console.log('theme:', theme);

    return (<>
        {MemoizedConnectionModal}
        <header className={'grid cols-2'}>
            <Link className={'white-space-nowrap display-flex align-items-center gap-0p5 color-inherit'}
                  to={{pathname: `/`}}>
                <ReactIcon size={35} className={classNames(pathname === `/` && 'spin', 'font-weight-bold')}
                           icon={IoLogoReact}/>
                <h3 className={'m-0'}>React TypeScript Template</h3>
            </Link>
            <NavigationMain/>
        </header>
        <main>{<ContentRouter/>}</main>
        <footer className={'display-flex justify-content-space-between align-items-center'}>
            <span>&copy; ᜐᜒᜋᜓ {new Date().getFullYear()} {targetUnicode} All rights reserved.</span>
            <ReactIcon icon={MdOutlineInvertColors} size={28} onClick={()=> dispatch(toggleTheme())}/>
        </footer>
        <ToastContainer/>
    </>);
};

const mapStateToProps = (state: any) => ({
    error: getError(state),
    theme: getTheme(state),
});

export default connect(mapStateToProps)(App);