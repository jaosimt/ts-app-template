import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { FaTwitch } from 'react-icons/fa';
import { FaChevronLeft, FaInstagram, FaReact } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosMoon } from 'react-icons/io';
import { IoCloudOffline, IoLogoReact } from 'react-icons/io5';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';
import { ReactIcon } from './components/partials';
import Button from './components/partials/button';
import CollapsibleLink from './components/partials/collapsibleLink';
import Dropdown, { DropdownObjectOptions } from './components/partials/dropdown';
import Modal from './components/partials/modal';
import ToastContainer, { toast } from './components/partials/toast';
import { targetUnicode, Theme } from './constants';
import { ThemeProp } from './constants/interfaces';
import NavigationMain from './navs';
import NavigationDemo from './navs/demoNav';
import ContentRouter from './routes';
import { getError } from './slices/error';
import { RootState } from './store';
import { capitalize, classNames, hashCode, isMobile } from './utils';
import './App.scss';
import './styles/animations.scss';
import './styles/tippy.scss';
import { getTheme, setTheme } from './slices/theme';
import { useAppDispatch } from './hooks';
import v from './styles/variables.module.scss';
import { themedBannerBase64 } from './utils/ext';
import { getAccentColor, getBorderColor } from './utils/themeUtils';

const StyledBanner = styled.div<{
    $footer?: boolean;
}>`
    position: fixed;
    width: 100%;
    height: 154px;
    z-index: ${props => props.$footer ? 0 : 1};
    left: 0;
    background-color: transparent;
    background-position: ${props => props.$footer ? 'top' : 'bottom'};
    background-repeat: no-repeat;
    background-size: cover;
    ${props => props.$footer && `bottom: 0;`}
`;

const Header = styled.header<{
}>`
    position: fixed;
`;

const Main = styled.main<{
    $fixed?: boolean;
    $theme: ThemeProp;
}>`
    > * { z-index: 1; }

    margin: 60px 0 40px;
    background-color: ${props => props.$theme === Theme.DARK ? v.baseColorDark : v.baseColor};
    height: calc(100vh - 100px);

    /*margin   : 0;*/
    /*${props => props.$fixed ? 'height: calc(100vh - 100px)' : 'min-height: calc(100vh - 100px)'};*/

    @media (max-width: 768px) {
        height: auto;
        min-height: calc(100vh - 100px);
    }
`;

const Footer = styled.footer<{
}>`
    position: fixed;
    z-index: 1;
    bottom: 0;
`;

const ContentWrapper = styled.div<{
    $padRight?: boolean;
}>`
    overflow-x : ${props => props.$padRight ? 'hidden' : 'hidden'};
    overflow-y : ${props => props.$padRight ? 'auto' : 'hidden'};
    padding    : 0 ${props => props.$padRight ? '2rem' : 0} 2rem 0;
    
    @media (max-width: 768px) {
        padding : 0 ${props => props.$padRight ? '1rem' : 0} 1rem 0;
    }
`;

const SidePanel = styled.aside<{
    $theme: ThemeProp;
}>`
    position: relative;
    overflow: hidden;
    flex: none;
    background-color: ${props => getAccentColor(props.$theme)};
    z-index: 3;
    transition: all 0.3s ease-in-out;
    border-left: 1px solid ${props => getBorderColor(props.$theme)};
    padding: 0;

    @media (max-width: 768px) {
        position: fixed;
        right: 0;
        height: 100%;
    }
`;

const appThemes = [
    {
        label: capitalize(Theme.REACT),
        value: Theme.REACT,
        icon: FaReact
    }, {
        label: capitalize(Theme.INSTA),
        value: Theme.INSTA,
        icon: FaInstagram
    }, {
        label: capitalize(Theme.TWITCH),
        value: Theme.TWITCH,
        icon: FaTwitch
    }, {
        label: capitalize(Theme.DARK),
        value: Theme.DARK,
        icon: IoIosMoon
    }
];

const panelWidth = 196;

const App = ({error, theme}: { error: any, theme: ThemeProp }) => {
    const dispatch = useAppDispatch();

    const [offline, setOffline] = useState(false);
    const [sidePanelWidth, setSidePanelWidth] = useState(isMobile() ? 0 : panelWidth);

    const setConnectionStatus = ({type}: { type: string }) => {
        if (!['online', 'offline'].includes(type)) return;
        setOffline(type === 'offline');
    };

    const {pathname} = useLocation();

    useEffect(() => {
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

    const sidePanelHandler = () => setSidePanelWidth(sidePanelWidth === 0 ? panelWidth : 0);

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
        const match = appThemes.find(t => t.value === storedSelectedTheme?.value);
        if (match) selectedTheme = match;
    } else selectedTheme = appThemes[0];

    const variableHeaderStyle = pathname !== '/' ? {
        backgroundColor: `${getAccentColor(theme)}`,
        borderBottom: `10 px solid ${v.$baseColor}`
    } : {};

    const styles: CSSProperties = {width: `${sidePanelWidth}px`};
    if (sidePanelWidth === 0) styles.border = 'none';

    return <>
        {MemoizedConnectionModal}
        {
            pathname === '/' &&
            <StyledBanner className={'banner'} style={{backgroundImage: `url("${themedBannerBase64(theme)}")`}}/>
        }
        <div className={'app-container display-flex'}>
            <div className={'flex-auto width-100p'}>
                <Header className={'grid cols-2 color-white'} style={{...variableHeaderStyle}}>
                    <Link
                        className={'white-space-nowrap display-flex align-items-center gap-0p5 color-inherit nav-link'}
                        to={{pathname: `/`}}>
                        <ReactIcon size={35} className={classNames(pathname === `/` && 'spin', 'font-weight-bold')}
                                   icon={IoLogoReact}/>
                        <h2 className={'m-0'}>React TypeScript Template</h2>
                    </Link>
                    {sidePanelWidth === 0 &&
                        <Button icon={GiHamburgerMenu} className={'display-none'} onClick={sidePanelHandler}/>}
                </Header>
                <Main $theme={theme} $fixed={true}>
                    <ContentWrapper $padRight={!pathname.startsWith('/demo')} className="content-wrapper">
                        {<ContentRouter theme={theme}/>}
                    </ContentWrapper>
                </Main>
                <Footer className={'display-flex justify-content-space-between align-items-center color-white'}>
                    <span>&copy; ᜐᜒᜋᜓ {new Date().getFullYear()} {targetUnicode} All rights reserved.</span>
                </Footer>
            </div>
            <SidePanel style={styles} $theme={theme} className="side-panel">
                <div className={'m-1 display-flex flex-direction-column gap-1 justify-content-space-between'} style={{height: 'calc(100% - 2rem)', marginRight: '1.5rem'}}>
                    <div>
                        <div className={'display-flex justify-content-space-between mb-2'}>
                            <Button icon={FaChevronLeft} className={'display-none'} onClick={sidePanelHandler}/>
                            <Dropdown
                                dropShadow={'#fff'}
                                className={'-mr-0p3'}
                                valueClassName={'capitalize'}
                                selected={selectedTheme}
                                options={appThemes}
                                onChange={(theme: DropdownObjectOptions) => {
                                    dispatch(setTheme(theme.value as any));
                                    sessionStorage.setItem('theme', JSON.stringify(theme));
                                }}
                            />
                        </div>
                        <NavigationMain sidePanelHandler={sidePanelHandler} theme={theme}/>
                    </div>
                    {pathname.startsWith('/demo') && <NavigationDemo sidePanelHandler={sidePanelHandler} theme={theme}/>}
                    &nbsp;
                </div>
            </SidePanel>
        </div>
        <ToastContainer/>
    </>;
};

const mapStateToProps = (state: RootState) => ({
    error: getError(state),
    theme: getTheme(state),
});

export default connect(mapStateToProps)(App);