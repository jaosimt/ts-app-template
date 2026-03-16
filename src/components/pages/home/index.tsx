import Tippy from '@tippyjs/react';
import {FC} from 'react';
import {BiLogoTypescript} from 'react-icons/bi';
import {FaCircleInfo, FaReact} from 'react-icons/fa6';
import {Link} from 'react-router';
import styled from 'styled-components';
import { ThemeProp } from '../../../constants/interfaces';
import redux from '../../../images/redux.svg';
import sass from '../../../images/sass.svg';
import usehooks from '../../../images/usehooks.svg';
import axios from '../../../images/axios.png';
import reactHookForm from '../../../images/react-hook-form.png';
import tippyjs from '../../../images/tippyjs.png';
import styledComponents from '../../../images/styled-components.png';
import reactRouter from '../../../images/react-router.png';
import { createLink, themeLogoBase64 } from '../../../utils/ext';
import {ReactIcon} from '../../partials';
import './style.scss';

const WrappingDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem 1rem;
    justify-content: space-between;
    width: 100%;

    > :first-child {
        width : 70%;
    }

    > :last-child {
        width : 30%;
    }

    @media (max-width : 1000px) {
        flex-direction : column;
        > :first-child,
        > :last-child {
            width : 100%;
        }
    }
`;

const bundledLibs = () => <>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><ReactIcon size={35} icon={FaReact}/><h3 className={'m-0'}>React</h3></>,
                '//react.dev/', 'display-flex white-space-nowrap gap-0p5 align-items-center'
            )
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><ReactIcon size={35} icon={BiLogoTypescript}/><h3 className={'m-0'}>TypeScript</h3></>,
                '//www.typescriptlang.org/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={reactRouter} alt=""/><h3 className={'m-0'}>React Router</h3></>,
                '//reactrouter.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={redux} alt=""/><h3 className={'m-0'}>Redux</h3></>,
                '//redux.js.org/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={sass} alt=""/><h3 className={'m-0'}>Sass</h3></>,
                '//sass-lang.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={usehooks} alt=""/><h3 className={'m-0'}>UseHooks</h3></>,
                '//usehooks-ts.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={axios} alt=""/><h3 className={'m-0'}>Axios</h3></>,
                '//axios-http.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={reactHookForm} alt=""/><h3 className={'m-0'}>ReactHookForm</h3></>,
                '//react-hook-form.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={tippyjs} alt=""/><h3 className={'m-0'}>TippyJS</h3></>,
                '//atomiks.github.io/tippyjs/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
    <div className={'display-flex gap-0p5 align-items-center '}>
        {
            createLink(
                <><img height={30} src={styledComponents} alt=""/><h3 className={'m-0'}>Styled Components</h3></>,
                '//styled-components.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')
        }
    </div>
</>;

const Home: FC<{ theme: ThemeProp }> = ({theme}) => {
    return <div data-component={'home'}
                className={'trim display-flex gap-0p5-1 justify-content-space-between width-100p height-auto pb-3'}>
        <div className={'display-flex flex-direction-column gap-1 justify-content-space-between'}>
            <div>
                <h1 className={'m-0 accent-text'}>Templates are good!</h1>
                <h5 className={'m-0'}>Why start from scratch? Templates will save a good amount of your time!</h5>
            </div>
            <WrappingDiv>
                <div>
                    <div>
                        <h4 className={'m-0 accent-text'}>In addition to the bundled libraries listed below, this app
                            template also
                            contains custom components that you might need:</h4>
                        <pre className={'display-flex gap-0p3-1 flex-wrap font-weight-bold m-0'}>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/box`}}>{`<Box/>`}</Link>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/button`}}>{`<Button/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/checkbox`}}>{`<Checkbox/>`}</Link>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/drawer`}}>{`<Drawer/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/dropdown`}}>{`<Dropdown/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/input-field`}}>{`<InputFied/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/loading`}}>{`<Loading/>`}</Link>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/modal`}}>{`<Modal/>`}</Link>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/tabs`}}>{`<Tabs/>`}</Link>
                            <Link className={'white-space-nowrap'} to={{pathname: `/demo/toast`}}>{`<Toast/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/window-portal`}}>{`<WindowPortal/>`}</Link>
                            <Link className={'white-space-nowrap'}
                                  to={{pathname: `/demo/collapsible-link`}}>{`<CollapsibleLink/>`}</Link>
                            <h4 className={'secondary-text font-weight-normal m-0'}>
                                Checkout <Link className={'white-space-nowrap'}
                                               to={{pathname: `/specs`}}>ComponentSpecs</Link> and/or <Link
                                className={'white-space-nowrap'} to={{pathname: `/demo`}}>Demo</Link> pages for more details.
                            </h4>
                        </pre>
                    </div>
                    <div className={'mt-1'}>
                        <h4 className={'m-0 accent-text'}>Furthermore, the following bundled libraries are setup more
                            than enough i think 😎:</h4>
                        <ul className={'m-0'}>
                            <li>
                                <b>redux</b>
                                <ul className="m-0">
                                    <li>
                                        <Tippy className={'custom-tippy'}
                                               content={<span>Located in folder <b>src/store</b></span>}>
                                            <span className={'cursor-pointer'}>store is already configured according to suggested settings <ReactIcon
                                                className={'accent-text font-size-small'} icon={FaCircleInfo}/></span>
                                        </Tippy>
                                    </li>
                                    <li>
                                        <Tippy className={'custom-tippy'}
                                               content={<span>Located in folder <b>src/slices</b></span>}>
                                            <span className={'cursor-pointer'}>top level reducers <ReactIcon
                                                className={'accent-text font-size-small'} icon={FaCircleInfo}/></span>
                                        </Tippy>
                                        <ul className="m-0">
                                            <li>
                                                <b><i>counter</i></b> - currently use in <Link
                                                className={'white-space-nowrap'} to={{pathname: `/demo/window-portal`}}>windowPortal
                                                demo</Link>
                                                <ul className="m-0 font-size-small secondary-text">
                                                    <li>chances are you're not gonna be needing this and so of course
                                                        feel free to remove it along with whatever is using it... or
                                                        not, this won't bother you anyway! 😁
                                                    </li>
                                                    <li>if you do, be sure to remove 'counter' as well in
                                                        combinedReducer's object in <pre
                                                            className="m-0 display-inline">src/store/index.ts</pre></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <b><i>error</i></b> - use in TSAPI error handler
                                                <ul className="m-0 font-size-small secondary-text">
                                                    <li><b>best not to remove</b> as this will be populated with any
                                                        http error 400 and up from the axios interceptor service!
                                                    </li>
                                                    <li>once populated, a top level toast will handle the rest to inform
                                                        you whatever the error is.
                                                    </li>
                                                    <li>however, if you do need to filter the kind of errors to handle,
                                                        you can proceed and tweak the axios response interceptor in <pre
                                                            className={'m-0 display-inline'}>lines 52 to 56 of the file src/services/TSAPI.ts</pre>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        component level reducers
                                        <ul className="m-0">
                                            <li>
                                                <Tippy className={'custom-tippy'} content={
                                                    <span>Located in folder <b>src/components/pages/demo/slices</b></span>}>
                                                    <span className={'cursor-pointer'}><b><i><Link
                                                        className={'white-space-nowrap'} to={{
                                                        pathname: '/demo/drawer',
                                                        search: 'showOnCreate=true'
                                                    }}>todo</Link></i></b> - currently use in <pre
                                                        className="m-0 display-inline">src/components/pages/demo/todo</pre> <ReactIcon
                                                        className={'accent-text font-size-small'}
                                                        icon={FaCircleInfo}/></span>
                                                </Tippy>
                                                <ul className="m-0 font-size-small secondary-text">
                                                    <li>feel free to remove this including the demo component Todo</li>
                                                    <li>in <pre className="m-0 display-inline">src/store/index.ts</pre>,
                                                        make sure to remove 'todo' as well in the following:
                                                    </li>
                                                    <ul className="m-0">
                                                        <li>combinedReducer's object</li>
                                                        <li>persistConfig's whitelist</li>
                                                    </ul>
                                                </ul>
                                            </li>
                                            <li>
                                                <Tippy className={'custom-tippy'} content={
                                                    <span>Located in folder <b>src/components/partials/slices</b></span>}>
                                                    <span
                                                        className={'cursor-pointer'}><b><i>toast</i></b> - use in <Link
                                                        className={'white-space-nowrap'}
                                                        to={{pathname: `/demo/toast`}}>toast</Link> and <b>MUST NOT be remove</b>! <ReactIcon
                                                        className={'accent-text font-size-small'}
                                                        icon={FaCircleInfo}/></span>
                                                </Tippy>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Tippy className={'custom-tippy'} content={
                                    <span>Located in folder <b>src/services</b></span>}>
                                    <span className={'cursor-pointer'}><b>axios</b> <ReactIcon
                                        className={'accent-text font-size-small'}
                                        icon={FaCircleInfo}/></span>
                                </Tippy>
                                <ul className="m-0">
                                    <li>
                                        <b><i>class User</i></b> - a sample api class showcasing the usage of the
                                        provided TSAPI, APIService and APIPromise handlers that works for me and might
                                        work for you <span className="white-space-nowrap">too 😎</span>
                                        <ul className="m-0 font-size-small secondary-text">
                                            <li>of course, feel free to modify whatever suits your needs!</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={'display-flex justify-content-right align-items-center'}>
                    <img width={'100%'} className={'spin-700'} src={themeLogoBase64(theme)} alt=""/>
                </div>
            </WrappingDiv>

            <div className="marquee">
                <div className={'display-flex gap-0p5-2 justify-content-space-between'}>
                    {bundledLibs()}
                    {bundledLibs()}
                </div>
            </div>
        </div>
    </div>;
};

export default Home;