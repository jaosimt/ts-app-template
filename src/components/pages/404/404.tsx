import { IoHome } from 'react-icons/io5';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ReactIcon } from '../../partials';
import Button from '../../partials/button';

const NF = styled.div`
    border        : 3px solid magenta;
    padding       : 3rem;
    border-radius : 01rem;
    width         : 550px;
`;

const NotFound = () => {
    const navigate = useNavigate();

    return <NF className={'translate absolute-center display-flex flex-direction-column align-items-center'}>
        <h1 className={'text-align-center m-0'}>Page not found</h1>
        <ReactIcon className={'color-magenta'} icon={TbError404} size={300}/>
        <h4 className="mt-0 text-align-center">The page you are looking for might have been removed, has its named
            changed or just temporarily unavailable.</h4>
        <Button icon={IoHome} onClick={() => navigate(`/`)}>Go to Home</Button>
    </NF>
}

export default NotFound;