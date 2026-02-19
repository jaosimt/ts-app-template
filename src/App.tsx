import React, { useEffect, useState } from 'react';
import './App.scss';
import { FaPlus } from 'react-icons/fa';
import { IoCloudOffline } from 'react-icons/io5';
import { SlScreenDesktop } from 'react-icons/sl';
import Login from './components/pages/login';
import Modal from './components/pages/modal';
import WindowPortal from './components/pages/windowPortal';
import { ReactIcon } from './components/partials';
import { Button } from './components/partials/button';

const App = () => {
    const [ctr, setCtr] = React.useState(0);
    const [showPortal, setShowPortal] = useState(false);
    const [offline, setOffline] = useState(false);

    const setConnectionStatus = ({type}: { type: string }) => {
        console.log(type);
        if (!['online', 'offline'].includes(type)) return;
        setOffline(type === 'offline');
    };

    useEffect(() => {
        window.addEventListener('online', setConnectionStatus);
        window.addEventListener('offline', setConnectionStatus);

        return () => {
            window.removeEventListener('online', setConnectionStatus);
            window.removeEventListener('offline', setConnectionStatus);
        };
    }, []);

    return (
        <div className="ts-app-template">
            {/* <header className="header">
                <img src={logo} className="logo spin" alt="logo"/>
            </header>*/}
            <div className="content">
                <Login childrenContainerClassName={'display-flex gap-1 align-items-center justify-content-center'}>
                    <Button width={'50%'} align={'space-between'} icon={SlScreenDesktop} disabled={showPortal}
                            onClick={() => setShowPortal(true)}>Show Portal</Button>
                    <Button width={'50%'} align={'space-between'} icon={FaPlus}
                            onClick={() => setCtr(ctr + 1)}>Counter: {ctr}</Button>
                </Login>
            </div>
            {
                offline && <Modal>
                    <div className={'display-flex gap-1 align-content-center'} style={{width: '15rem'}}>
                        <ReactIcon size={42} className={'color-red'} icon={IoCloudOffline}/>
                        <div className={'display-flex flex-direction-column justify-content-center'}>
                            <p className={'color-red m-0'}>You are currently offline!</p>
                            <p style={{fontSize: '0.7rem', fontWeight: 700}} className={'m-0'}>Please check your
                                connection...</p>
                        </div>
                    </div>

                </Modal>
            }
            {
                showPortal && <WindowPortal onClose={() => setShowPortal(false)}>
                    <div className={'p-2'}>
                        <h1 className={'color-red m-0 mb-2'}>Hello ctr from a new window {ctr}!</h1>
                    </div>
                </WindowPortal>
            }
        </div>
    );
};

export default App;
