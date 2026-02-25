import React from 'react';
import { Route, Routes } from 'react-router';
import NotFound from '../components/pages/404/404';
import Demo from '../components/pages/demo';
import TabsDemo from '../components/pages/demo/tabs';
import Home from '../components/pages/home';
import Login from '../components/pages/login';

const ContentRouter = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/demo" element={<Demo/>}/>
            <Route path="/demo/tabs" element={<TabsDemo/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */