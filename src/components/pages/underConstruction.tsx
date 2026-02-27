import { IoIosConstruct } from 'react-icons/io';
import styled from 'styled-components';
import ReactIcon from '../partials';
import '../../styles/variables.scss';

const UC = styled.div`
    border: 3px solid #61dafb;
    padding: 3rem;
    border-radius: 01rem;
`;
const UnderConstruction = () => <UC className={'translate absolute-center display-flex gap-2'}>
    <ReactIcon className={'spin-21'} size={121} icon={IoIosConstruct}/>
    <span style={{fontSize: '56px', fontFamily: 'courier new'}}
          className="monospace font-weight-bold">UNDER<br/>CONSTRUCTION</span>
</UC>;

export default UnderConstruction;