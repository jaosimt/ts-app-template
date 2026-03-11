import { FC } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaReact } from 'react-icons/fa6';
import { Link } from 'react-router';
import styled from 'styled-components';
import logo from '../../../images/logo.svg';
import redux from '../../../images/redux.svg';
import sass from '../../../images/sass.svg';
import usehooks from '../../../images/usehooks.svg';
import axios from '../../../images/axios.png';
import reactHookForm from '../../../images/react-hook-form.png';
import tippyjs from '../../../images/tippyjs.png';
import styledComponents from '../../../images/styled-components.png';
import reactRouter from '../../../images/react-router.png';
import { createLink } from '../../../utils/ext';
import { ReactIcon } from '../../partials';

const WrappingDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem 1rem;
    justify-content: space-between;

    > :first-child { width: 50%; }

    > :last-child { width: 40%; }

    & + div {justify-content: center}

    @media (max-width: 1000px) {
        flex-direction: column;
        > :first-child,
        > :last-child { width: 100%; }
    }
`;

const Home: FC = () => {
    return <div data-component={'home'}
                className={'trim display-flex gap-0p5-1 justify-content-space-between width-100p height-auto'}>
        <div className={'display-flex flex-direction-column gap-1 justify-content-space-between'}>
            <div>
                <h1 className={'m-0 color-magenta'}>Templates are good!</h1>
                <h5 className={'m-0'}>Why start from scratch? Templates will save a good amount of your time!</h5>
            </div>
            <WrappingDiv>
                <div>
                    <h3 className={'m-0 color-magenta'}>Apart from the libraries listed below, this app template also
                        contains custom components that you might need:</h3>
                    <pre className={'display-flex gap-0p5-1 flex-wrap font-weight-bold'}>
                        <span>{`<Box/>`}</span>
                        <span>{`<Button/>`}</span>
                        <span>{`<Checkbox/>`}</span>
                        <span>{`<Drawer/>`}</span>
                        <span>{`<Dropdown/>`}</span>
                        <span>{`<InputFied/>`}</span>
                        <span>{`<Loading/>`}</span>
                        <span>{`<Modal/>`}</span>
                        <span>{`<Tabs/>`}</span>
                        <span>{`<Toast/>`}</span>
                        <span>{`<WindowPortal/>`}</span>
                        <span>{`<CollapsibleLink/>`}</span>
                    </pre>
                    <h5 className={'color-magenta'}>Checkout <Link className={'white-space-nowrap'}
                                                                   to={{pathname: '/specs'}}>Component
                        Specs</Link> and/or <Link className={'white-space-nowrap'}
                                                  to={{pathname: '/demo'}}>Demo</Link> pages for more details.</h5>

                </div>
                <div className={'display-flex justify-content-center align-items-center'}>
                    <img className={'spin-700'} src={logo} alt=""/>
                </div>
            </WrappingDiv>
            <div className={'display-flex gap-0p5-2 flex-wrap'}>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><ReactIcon size={35}
                                                                                                     icon={FaReact}/><h3
                    className={'m-0'}>React</h3></>, '//react.dev/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><ReactIcon size={35}
                                                                                                     icon={BiLogoTypescript}/>
                    <h3 className={'m-0'}>TypeScript</h3></>, '//www.typescriptlang.org/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30}
                                                                                               src={reactRouter}
                                                                                               alt=""/><h3
                    className={'m-0'}>React
                    Router</h3></>, '//reactrouter.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30} src={redux}
                                                                                               alt=""/><h3
                    className={'m-0'}>Redux</h3></>, '//redux.js.org/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30} src={sass}
                                                                                               alt=""/><h3
                    className={'m-0'}>Sass</h3></>, '//sass-lang.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30}
                                                                                               src={usehooks} alt=""/>
                    <h3 className={'m-0'}>UseHooks</h3></>, '//usehooks-ts.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30} src={axios}
                                                                                               alt=""/><h3
                    className={'m-0'}>Axios</h3></>, '//axios-http.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30}
                                                                                               src={reactHookForm}
                                                                                               alt=""/><h3
                    className={'m-0'}>ReactHookForm</h3></>, '//react-hook-form.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30} src={tippyjs}
                                                                                               alt=""/><h3
                    className={'m-0'}>TippyJS</h3></>, '//atomiks.github.io/tippyjs/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
                <div className={'display-flex gap-0p5 align-items-center '}>{createLink(<><img height={30}
                                                                                               src={styledComponents}
                                                                                               alt=""/><h3
                    className={'m-0'}>Styled
                    Components</h3></>, '//styled-components.com/', 'display-flex white-space-nowrap gap-0p5 align-items-center')}</div>
            </div>
        </div>
    </div>;
};

export default Home;