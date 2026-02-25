import { MdConstruction } from 'react-icons/md';
import ReactIcon from '../partials';

const UnderConstruction = () => <div className={'translate absolute-center display-flex gap-2'}>
    <ReactIcon className={'color-orange spin'} size={121} icon={MdConstruction}/>
    <span style={{fontSize: '56px', fontFamily: 'courier new'}}
          className="monospace font-weight-bold color-orange">UNDER<br/>CONSTRUCTION</span>
</div>

export default UnderConstruction;