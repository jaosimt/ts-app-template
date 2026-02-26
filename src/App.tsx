import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { IoCloudOffline, IoLogoReact } from 'react-icons/io5';
import { Link, useLocation } from 'react-router';
import ReactIcon from './components/partials';
import Modal from './components/partials/modal';
import { targetUnicode } from './constants';
import { NavigationMain } from './navs';
import ContentRouter from './routes';
import { classNames } from './utils';

const App = () => {
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
    }, []);

    const MemoizedConnectionModal = useMemo(() => {
        return offline && <Modal maxZIndex={true}>
            <div className={'display-flex gap-1 align-content-center'} style={{width: '15rem'}}>
                <ReactIcon size={42} className={'color-red'} icon={IoCloudOffline}/>
                <div className={'display-flex flex-direction-column justify-content-center'}>
                    <p className={'color-red m-0'}>You are currently offline!</p>
                    <p style={{fontSize: '0.7rem', fontWeight: 700}} className={'m-0'}>Please check your
                        connection...</p>
                </div>
            </div>

        </Modal>
    }, [offline])

    return (<>
        {MemoizedConnectionModal}
        <header>
            <div className={'display-flex gap-0p5 align-items-center white-space-nowrap'}>
                <Link to={{ pathname: "/"}}><ReactIcon size={35} className={classNames(pathname === '/' && 'spin', 'font-weight-bold')} icon={IoLogoReact}/></Link>
                <h3 className={'m-0'}>React TypeScript Template</h3>
            </div>
            <NavigationMain/>
        </header>
        <main>{<ContentRouter/>}</main>
        <footer>&copy; ᜐᜒᜋᜓ {new Date().getFullYear()} {targetUnicode} All rights reserved.
        </footer>
    </>);
};

export default App;
