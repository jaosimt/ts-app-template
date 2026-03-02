import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import NotFound from '../components/pages/404/404';
import ComponentSpecs from '../components/pages/componentSpecs';
import Demo from '../components/pages/demo';
import DemoBox from '../components/pages/demo/demoBox';
import DemoButton from '../components/pages/demo/demoButton';
import DemoInputField from '../components/pages/demo/demoInputField';
import ModalDemo from '../components/pages/demo/demoModal';
import TabsDemo from '../components/pages/demo/demoTab';
import WindowPortalDemo from '../components/pages/demo/demoWindowPortal';
import LoadingDemo from '../components/pages/demo/loadingDemo';
import Home from '../components/pages/home';
import Login from '../components/pages/login';

const ContentRouter = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/specs" element={<ComponentSpecs/>}/>
            <Route path="/demo" element={<Demo/>}>
                <Route index element={<Navigate to="/demo/box" replace />} />
                <Route path="/demo/loading" element={<LoadingDemo/>}/>
                <Route path="/demo/box" element={<DemoBox/>}/>
                <Route path="/demo/button" element={<DemoButton/>}/>
                <Route path="/demo/input-field" element={<DemoInputField/>}/>
                <Route path="/demo/login" element={<Login/>}/>
                <Route path="/demo/modal" element={<ModalDemo/>}/>
                <Route path="/demo/tab" element={<TabsDemo/>}/>
                <Route path="/demo/window-portal" element={<WindowPortalDemo/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */