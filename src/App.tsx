import React from 'react';
import './App.scss';
import Login from "./components/pages/login";

function App() {
    return (
        <div className="ts-app-template">
            {/*<header className="header">*/}
            {/*    <img src={logo} className="logo" alt="logo"/>*/}
            {/*</header>*/}
            <div className="content">
                <Login/>
            </div>
        </div>
    );
}

export default App;
