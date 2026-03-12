import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { deploymentRoot } from '../App';
import NotFound from '../components/pages/404/404';
import ComponentSpecs from '../components/pages/componentSpecs';
import Demo from '../components/pages/demo';
import DemoBox from '../components/pages/demo/demoBox';
import DemoButton from '../components/pages/demo/demoButton';
import DemoCheckbox from '../components/pages/demo/demoCheckbox';
import DemoDrawer from '../components/pages/demo/demoDrawer';
import DemoDropdown from '../components/pages/demo/demoDropdown';
import DemoInputField from '../components/pages/demo/demoInputField';
import DemoModal from '../components/pages/demo/demoModal';
import DemoTabs from '../components/pages/demo/demoTab';
import DemoToast from '../components/pages/demo/demoToast';
import DemoWindowPortal from '../components/pages/demo/demoWindowPortal';
import DemoLoading from '../components/pages/demo/demoLoading';
import Home from '../components/pages/home';
import Login from '../components/pages/login';

const ContentRouter = () => {
    return <>
        <Routes>
            <Route path={`${deploymentRoot}/`} element={<Home/>}/>
            <Route path={`${deploymentRoot}/specs`} element={<ComponentSpecs/>}/>
            <Route path={`${deploymentRoot}/demo`} element={<Demo/>}>
                <Route index element={<Navigate to={`${deploymentRoot}/demo/box`} replace />} />
                <Route path={`${deploymentRoot}/demo/loading`} element={<DemoLoading/>}/>
                <Route path={`${deploymentRoot}/demo/box`} element={<DemoBox/>}/>
                <Route path={`${deploymentRoot}/demo/dropdown`} element={<DemoDropdown/>}/>
                <Route path={`${deploymentRoot}/demo/checkbox`} element={<DemoCheckbox/>}/>
                <Route path={`${deploymentRoot}/demo/button`} element={<DemoButton/>}/>
                <Route path={`${deploymentRoot}/demo/input-field`} element={<DemoInputField/>}/>
                <Route path={`${deploymentRoot}/demo/login`} element={<Login/>}/>
                <Route path={`${deploymentRoot}/demo/drawer`} element={<DemoDrawer/>}/>
                <Route path={`${deploymentRoot}/demo/modal`} element={<DemoModal/>}/>
                <Route path={`${deploymentRoot}/demo/toast`} element={<DemoToast/>}/>
                <Route path={`${deploymentRoot}/demo/tabs`} element={<DemoTabs/>}/>
                <Route path={`${deploymentRoot}/demo/window-portal`} element={<DemoWindowPortal/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */