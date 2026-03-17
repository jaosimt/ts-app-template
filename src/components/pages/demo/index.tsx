import { FC } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { classNames } from '../../../utils';
import { getPrimaryColor } from '../../../utils/themeUtils';
import Loading from '../../partials/loading';
import v from '../../../styles/variables.module.scss';

const Container = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    min-height: 490px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

// noinspection CssUnusedSymbol
const Nav = styled.nav<{
    $theme: ThemeProp;
}>`
    display: flex;
    flex-direction: column;

    a {
        border: 1px solid transparent;
        padding: 0.5rem;
        color: ${props => props.$theme === Theme.DARK ? v.textColorDark : v.textColor} !important;

        &:hover {
            color: ${props => getPrimaryColor(props.$theme)} !important;
        }

        &.active {
            border-bottom-color: ${props => getPrimaryColor(props.$theme)};
            border-top-color: ${props => getPrimaryColor(props.$theme)};
            color: ${props => getPrimaryColor(props.$theme)} !important;
        }
    }

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        font-size: small;

        a {
            padding: 0.1rem;
            text-align: center;
        }
    }
`;

const Wrapper = styled.div<{
    $theme: ThemeProp;
}>`
    padding: 1.5rem;
    border-radius: 0.3rem;
    position: relative;
    width: calc(100% - 150px);
    background-color: ${props => props.$theme === Theme.DARK ? v.secondaryBaseColorDark : v.secondaryBaseColor};
    opacity: 0.9;
    min-height: calc(100vh - 9rem);

    @media (max-width: 768px) {
        min-height: unset;
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: transparent;
    }
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;

const Demo: FC<{ theme: ThemeProp }> = ({theme}) => {
    const {pathname} = useLocation();

    return <Container data-component={'demo'}>
        <Nav
            $theme={theme}
        >
            <NavLink to={`/demo/box`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Box</NavLink>
            <NavLink to={`/demo/button`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Button</NavLink>
            <NavLink to={`/demo/checkbox`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Checkbox</NavLink>
            <NavLink to={`/demo/collapsible-link`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>CollapsibleLink</NavLink>
            <NavLink to={`/demo/drawer`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Drawer</NavLink>
            <NavLink to={`/demo/dropdown`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Dropdown</NavLink>
            <NavLink to={`/demo/input-field`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>InputFields</NavLink>
            <NavLink to={`/demo/loading`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Loading</NavLink>
            <NavLink to={`/demo/modal`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Modal</NavLink>
            <NavLink to={`/demo/tabs`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Tabs</NavLink>
            <NavLink to={`/demo/toast`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Toast</NavLink>
            <NavLink to={`/demo/window-portal`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>WindowPortal</NavLink>
        </Nav>
        <Wrapper $theme={theme} className={'wrapper'}>
            {pathname === `/demo` && <Loading position={'fixed'}/>}
            <InnerWrapper>
                <Outlet/>
            </InnerWrapper>
        </Wrapper>
    </Container>;
};

export default Demo;