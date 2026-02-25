import React from 'react';
import { Route, Routes } from 'react-router';
import NotFound from '../components/pages/404/404';
import ComponentSpecs from '../components/pages/componentSpecs';
import Demo from '../components/pages/demo';
import ModalDemo from '../components/pages/demo/modal';
import TabsDemo from '../components/pages/demo/tab';
import Home from '../components/pages/home';
import Login from '../components/pages/login';

const ContentRouter = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/specs" element={<ComponentSpecs/>}/>
            <Route path="/demo" element={<Demo/>}>
                <Route path="/demo/login" element={<Login/>}/>
                <Route path="/demo/modal" element={<ModalDemo/>}/>
                <Route path="/demo/tab" element={<TabsDemo/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */