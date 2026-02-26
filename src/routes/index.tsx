import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import NotFound from '../components/pages/404/404';
import ComponentSpecs from '../components/pages/componentSpecs';
import Demo from '../components/pages/demo';
import BoxDemo from '../components/pages/demo/box';
import ButtonDemo from '../components/pages/demo/button';
import ModalDemo from '../components/pages/demo/modal';
import TabsDemo from '../components/pages/demo/tab';
import WindowPortalDemo from '../components/pages/demo/windowPortal';
import Home from '../components/pages/home';
import Login from '../components/pages/login';

const ContentRouter = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/specs" element={<ComponentSpecs/>}/>
            <Route path="/demo" element={<Demo/>}>
                <Route index element={<Navigate to="/demo/box" replace />} />
                <Route path="/demo/box" element={<BoxDemo/>}/>
                <Route path="/demo/button" element={<ButtonDemo/>}/>
                <Route path="/demo/login" element={<Login/>}/>
                <Route path="/demo/modal" element={<ModalDemo/>}/>
                <Route path="/demo/tab" element={<TabsDemo/>}/>
                <Route path="/demo/windowportal" element={<WindowPortalDemo/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */