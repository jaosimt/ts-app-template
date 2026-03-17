import { useEffect, useMemo, useState } from 'react';
import { FaTwitch } from 'react-icons/fa';
import { FaInstagram, FaReact } from 'react-icons/fa6';
import { IoIosMoon } from 'react-icons/io';
import {IoCloudOffline, IoLogoReact} from 'react-icons/io5';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';
import { ReactIcon } from './components/partials';
import CollapsibleLink from './components/partials/collapsibleLink';
import Dropdown, { DropdownObjectOptions } from './components/partials/dropdown';
import Modal from './components/partials/modal';
import ToastContainer, { toast } from './components/partials/toast';
import { targetUnicode, Theme } from './constants';
import { ThemeProp } from './constants/interfaces';
import { NavigationMain } from './navs';
import ContentRouter from './routes';
import { getError } from './slices/error';
import { RootState } from './store';
import { capitalize, classNames, hashCode } from './utils';
import './App.scss';
import './styles/animations.scss';
import './styles/tippy.scss';
import {getTheme, setTheme} from "./slices/theme";
import {useAppDispatch} from "./hooks";
import v from './styles/variables.module.scss';
import { themedBannerBase64 } from './utils/ext';
import { getAccentColor } from './utils/themeUtils';

const StyledBanner = styled.div<{
    $theme: ThemeProp;
}>`
    position: absolute;
    width: 100%;
    height: 168px;
    z-index: 1;
    background-color: transparent;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
`;

const StyledMain = styled.main<{
    $fixed?: boolean;
    $theme: ThemeProp;
}>`
    background-color: ${props => props.$theme === Theme.DARK ? v.baseColorDark : v.baseColor};
    ${props => props.$fixed ? 'height: calc(100vh - 100px)' : 'min-height: calc(100vh - 100px)'};
`;

const appThemes = [
    {
        label: capitalize(Theme.REACT),
        value: Theme.REACT,
        icon: FaReact
    }, {
        label: capitalize(Theme.DARK),
        value: Theme.DARK,
        icon: IoIosMoon
    }, {
        label: capitalize(Theme.INSTA),
        value: Theme.INSTA,
        icon: FaInstagram
    }, {
        label: capitalize(Theme.TWITCH),
        value: Theme.TWITCH,
        icon: FaTwitch
    }
];

const App = ({error, theme}: { error: any, theme: ThemeProp }) => {
    const dispatch = useAppDispatch();

    const [offline, setOffline] = useState(false);

    const setConnectionStatus = ({type}: { type: string }) => {
        if (!['online', 'offline'].includes(type)) return;
        setOffline(type === 'offline');
    };

    const {pathname} = useLocation();

    useEffect(() => {
        if (!sessionStorage.getItem('welcome-uc-shown')) {
            toast({
                id: 'under-construction-toast',
                message: <>
                    <h4 className="m-0">Welcome to the React + TypeScript started app template!</h4>
                    <p className={'mb-0'}>However, this site is still <b>Under Construction!</b> So you might be seeing some undesirables especially the color combinations as the theme feature is currently on going!</p>
                    <p className={'mb-0'}>Please bear with us, Thank you very much!</p>
                    <p className={'m-0'}>&nbsp;</p>
                </>,
                options: {theme: 'filled', type: 'info', omitIcon: false, duration: 21000}
            });
            sessionStorage.setItem('welcome-uc-shown', 'true');
        }

        window.addEventListener('online', setConnectionStatus);
        window.addEventListener('offline', setConnectionStatus);

        return () => {
            window.removeEventListener('online', setConnectionStatus);
            window.removeEventListener('offline', setConnectionStatus);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.body.setAttribute('class', String(theme));
    }, [theme]);

    useEffect(() => {
        if (error) {
            toast({
                id: `${error?.code || 'unknown-error-code'}-${hashCode(error?.message || error || 'unknown error')}`,
                message: error?.stack ? <span className={'display-flex flex-direction-column'}>
                    <span>{error?.message || error}</span>
                    <span className="font-size-smaller">
                        <CollapsibleLink
                            className={'background p-0p3 border-radius-0p2'}
                            linkText={'Details'}
                            details={<pre>{error?.stack}</pre>}
                            position={'relative'}
                        />
                    </span>
                </span> : error?.message || error,
                options: {type: 'error', omitIcon: false, theme: 'filled'}
            });
        }
    }, [error]);

    const MemoizedConnectionModal = useMemo(() => {
        return offline && <Modal closeOnEscKey={false} closeOnOutsideClick={false} showClose={false} maxZIndex={true}>
            <div className={'display-flex gap-1 align-content-center'} style={{width: '15rem'}}>
                <ReactIcon size={42} className={'color-red'} icon={IoCloudOffline}/>
                <div className={'display-flex flex-direction-column justify-content-center'}>
                    <p className={'color-red m-0'}>You are currently offline!</p>
                    <p style={{fontSize: '0.7rem', fontWeight: 700}} className={'m-0'}>Please check your
                        connection...</p>
                </div>
            </div>

        </Modal>;
    }, [offline]);

    let selectedTheme;
    const storedSelectedTheme = JSON.parse(sessionStorage.getItem('theme') as any) as DropdownObjectOptions | null;
    if (storedSelectedTheme) {
        const match = appThemes.find(t => t.value === storedSelectedTheme?.value)
        if (match) selectedTheme = match;
    }
    else selectedTheme = appThemes[0];

    const variableHeaderStyle = pathname !== '/' ? {
        backgroundColor : `${getAccentColor(theme)}`,
        borderBottom : `10 px solid ${v.$baseColor}`
    } : {};

    const themedBanner = themedBannerBase64(theme);
    console.log('themedBanner:', themedBanner);

    return (<>
        {MemoizedConnectionModal}
        {pathname === '/' && <StyledBanner className={'banner'} $theme={theme} style={{backgroundImage: `url("${themedBanner}")`}}/>}
        <header className={'grid cols-2 color-white'} style={{...variableHeaderStyle}}>
            <Link className={'white-space-nowrap display-flex align-items-center gap-0p5 color-inherit nav-link'}
                  to={{pathname: `/`}}>
                <ReactIcon size={35} className={classNames(pathname === `/` && 'spin', 'font-weight-bold')}
                           icon={IoLogoReact}/>
                <h3 className={'m-0'}>React TypeScript Template</h3>
            </Link>
            <NavigationMain theme={theme}/>
            <Dropdown
                className={'-ml-1p5'}
                valueClassName={'capitalize'}
                selected={selectedTheme}
                options={appThemes}
                onChange={(theme: DropdownObjectOptions) => {
                    dispatch(setTheme(theme.value as any));
                    sessionStorage.setItem('theme', JSON.stringify(theme));
                }}
            />
        </header>
        <StyledMain $theme={theme} $fixed={pathname === '/'}>
            <div className="content-wrapper">
                {<ContentRouter theme={theme}/>}
            </div>
        </StyledMain>
        <footer className={'display-flex justify-content-space-between align-items-center color-white'}>
            <span>&copy; ᜐᜒᜋᜓ {new Date().getFullYear()} {targetUnicode} All rights reserved.</span>
        </footer>
        <ToastContainer/>
    </>);
};

const mapStateToProps = (state: RootState) => ({
    error: getError(state),
    theme: getTheme(state),
});

export default connect(mapStateToProps)(App);