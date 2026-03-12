import {FC} from 'react';
import {NavLink, Outlet, useLocation} from 'react-router';
import styled from 'styled-components';
import {classNames} from '../../../utils';
import UnderConstruction from '../underConstruction';
import {
    $headerBackgroundColor,
    $secondaryBackgroundColor,
    $secondaryBackgroundColorDark
} from '../../../styles/variables';
import {connect} from "react-redux";
import {getTheme} from "../../../slices/theme";

const Container = styled.div`
    display    : flex;
    gap        : 1rem;
    width      : 100%;
    min-height : 490px;

    @media (max-width : 768px) {
        flex-direction : column;
        gap            : 0.5rem;
    }
`;

// noinspection CssUnusedSymbol
const Nav = styled.nav`
    display        : flex;
    flex-direction : column;

    a {
        border  : 1px solid transparent;
        color   : inherit;
        padding : 0.5rem;

        &.active {
            border-bottom-color : ${$headerBackgroundColor};
            border-top-color    : ${$headerBackgroundColor};
            color               : ${$headerBackgroundColor};
        }
    }

    @media (max-width : 768px) {
        display               : grid;
        grid-template-columns : repeat(4, 1fr);
        font-size             : small;

        a {
            padding    : 0.1rem;
            text-align : center;
        }
    }
`;

const Wrapper = styled.div<{
    $theme:string;
}>`
    padding          : 1.5rem;
    border-radius    : 0.3rem;
    position         : relative;
    width            : calc(100% - 150px);
    background-color : ${props=>props.$theme === 'dark' ? $secondaryBackgroundColorDark : $secondaryBackgroundColor};

    @media (max-width : 768px) {
        width            : 100%;
        height           : 100%;
        padding          : 0;
        background-color : transparent;
    }
`;

const InnerWrapper = styled.div`
    display        : flex;
    flex-direction : column;
    gap            : 1rem;
    width          : 100%;
    height         : 100%;
`;

const Demo: FC<{ theme: string }> = ({theme}) => {
    const {pathname} = useLocation();

    return <Container data-component={'demo'}>
        <Nav>
            <NavLink to={`/demo/box`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Box</NavLink>
            <NavLink to={`/demo/checkbox`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Checkbox</NavLink>
            <NavLink to={`/demo/button`}
                     className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Button</NavLink>
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
        <Wrapper $theme={theme}>
            {pathname === `/demo` && <UnderConstruction/>}
            <InnerWrapper>
                <Outlet/>
            </InnerWrapper>
        </Wrapper>
    </Container>;
};

const mapStateToProps = (state: any) => ({
    theme: getTheme(state),
});

export default connect(mapStateToProps)(Demo);