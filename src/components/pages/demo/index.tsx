import { FC } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import { deploymentRoot } from '../../../App';
import { classNames } from '../../../utils';
import UnderConstruction from '../underConstruction';
import { $headerBackgroundColor } from '../../../styles/variables';

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
const Nav = styled.nav`
    display: flex;
    flex-direction: column;

    a {
        border: 1px solid transparent;
        color: inherit;
        padding: 0.5rem;

        &.active {
            border-bottom-color: ${$headerBackgroundColor};
            border-top-color: ${$headerBackgroundColor};
            color: ${$headerBackgroundColor};
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

const Wrapper = styled.div`
    padding: 1.5rem;
    border-radius: 0.3rem;
    position: relative;
    width: calc(100% - 150px);
    background-color: #f8f8f8;

    @media (max-width: 768px) {
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

const Demo: FC = () => {
    const {pathname} = useLocation();

    return <Container data-component={'demo'}>
        <Nav>
            <NavLink to={`${deploymentRoot}/demo/box`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Box</NavLink>
            <NavLink to={`${deploymentRoot}/demo/checkbox`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Checkbox</NavLink>
            <NavLink to={`${deploymentRoot}/demo/button`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Button</NavLink>
            <NavLink to={`${deploymentRoot}/demo/drawer`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Drawer</NavLink>
            <NavLink to={`${deploymentRoot}/demo/dropdown`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Dropdown</NavLink>
            <NavLink to={`${deploymentRoot}/demo/input-field`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>InputFields</NavLink>
            <NavLink to={`${deploymentRoot}/demo/loading`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Loading</NavLink>
            <NavLink to={`${deploymentRoot}/demo/modal`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Modal</NavLink>
            <NavLink to={`${deploymentRoot}/demo/tabs`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Tabs</NavLink>
            <NavLink to={`${deploymentRoot}/demo/toast`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Toast</NavLink>
            <NavLink to={`${deploymentRoot}/demo/window-portal`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>WindowPortal</NavLink>
        </Nav>
        <Wrapper>
            {pathname === `${deploymentRoot}/demo` && <UnderConstruction/>}
            <InnerWrapper>
                <Outlet/>
            </InnerWrapper>
        </Wrapper>
    </Container>;
};

export default Demo;