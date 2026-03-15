import React from 'react';
import {Navigate, Route, Routes} from 'react-router';
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
import { ThemeProp } from '../constants/interfaces';

const ContentRouter = ({theme}: { theme: ThemeProp }) => {
    return <>
        <Routes>
            <Route path={`/`} element={<Home theme={theme}/>}/>
            <Route path={`/specs`} element={<ComponentSpecs theme={theme}/>}/>
            <Route path={`/demo`} element={<Demo theme={theme}/>}>
                <Route index element={<Navigate to={`/demo/box`} replace/>}/>
                <Route path={`/demo/loading`} element={<DemoLoading theme={theme}/>}/>
                <Route path={`/demo/box`} element={<DemoBox theme={theme}/>}/>
                <Route path={`/demo/dropdown`} element={<DemoDropdown theme={theme}/>}/>
                <Route path={`/demo/checkbox`} element={<DemoCheckbox theme={theme}/>}/>
                <Route path={`/demo/button`} element={<DemoButton theme={theme}/>}/>
                <Route path={`/demo/input-field`} element={<DemoInputField theme={theme}/>}/>
                <Route path={`/demo/login`} element={<Login/>}/>
                <Route path={`/demo/drawer`} element={<DemoDrawer theme={theme}/>}/>
                <Route path={`/demo/modal`} element={<DemoModal theme={theme}/>}/>
                <Route path={`/demo/toast`} element={<DemoToast theme={theme}/>}/>
                <Route path={`/demo/tabs`} element={<DemoTabs/>}/>
                <Route path={`/demo/window-portal`} element={<DemoWindowPortal theme={theme}/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>;
}

export default ContentRouter;

/* https://reactrouter.com/start/framework/routing#component-routes */