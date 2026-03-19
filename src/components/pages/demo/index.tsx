import { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import Loading from '../../partials/loading';

const Container = styled.div`
    display: grid;
    overflow: hidden;
    
    > * {
        height: 100%;
        overflow: hidden;
    }
`;

const Demo: FC = () => {
    const {pathname} = useLocation();

    return <Container data-component={'demo'}>
        {pathname === `/demo` && <Loading position={'fixed'}/>}
        <Outlet/>
    </Container>;
};

export default Demo;