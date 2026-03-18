import { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import Loading from '../../partials/loading';

const Container = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100%;
    min-height: 490px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
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
        {pathname === `/demo` && <Loading position={'fixed'}/>}
        <InnerWrapper>
            <Outlet/>
        </InnerWrapper>
    </Container>;
};

export default Demo;