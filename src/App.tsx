import React from 'react';
import './App.scss';
import { FaPlus } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import Login from './components/pages/login';
import WindowPortal from './components/pages/windowPortal';
import { Button } from './components/partials/button';

function App() {
    const [ctr, setCtr] = React.useState(0);
    const [showPortal, setShowPortal] = React.useState(false);

    return (
        <div className="ts-app-template">
            {/* <header className="header">
                <img src={logo} className="logo spin" alt="logo"/>
            </header>*/}
            <div className="content">
                <Login childrenContainerClassName={'display-flex gap-1 align-items-center justify-content-center'}>
                    <Button width={'50%'} align={'space-between'} icon={SlScreenDesktop} disabled={showPortal} onClick={() => setShowPortal(true)}>Show Portal</Button>
                    <Button width={'50%'} align={'space-between'} icon={FaPlus} onClick={() => setCtr(ctr + 1)}>Counter: {ctr}</Button>
                </Login>
            </div>
            {showPortal && <WindowPortal onClose={() => setShowPortal(false)}>
                <div className={'p-2'}>
                    <h1 className={'color-red m-0 mb-2'}>Hello ctr from a new window {ctr}!</h1>
                </div>
            </WindowPortal>}
        </div>
    );
}

export default App;
