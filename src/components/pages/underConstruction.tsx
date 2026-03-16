import { IoIosConstruct } from 'react-icons/io';
import styled from 'styled-components';
import { classNames, parseCSSUnit } from '../../utils';
import '../../styles/variables.module.scss';
import { ReactIcon } from '../partials';

const UC = styled.div<{ $padding: number }>`
    border: 3px solid #00cafd;
    padding: ${props => `${props.$padding}px`};
    border-radius: 01rem;
    display: inline-flex;
    gap: 1rem;
`;
const UnderConstruction = ({centered = true, fontSize = 56}: { centered?: boolean, fontSize?: number }) => <UC
    $padding={fontSize / 2}
    className={classNames(centered && 'translate absolute-center')}>
    <ReactIcon className={'spin-21'} size={fontSize * 2.2} icon={IoIosConstruct}/>
    <span style={{fontSize: parseCSSUnit(fontSize), fontFamily: 'courier new'}}
          className="monospace font-weight-bold">UNDER<br/>CONSTRUCTION</span>
</UC>;

export default UnderConstruction;