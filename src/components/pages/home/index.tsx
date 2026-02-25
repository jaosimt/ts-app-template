import { FC } from 'react';
import UnderConstruction from '../underConstruction';

const Home: FC = () => {

    return <div data-component={'home'} className={'width-100p'}>
        <div className={''}>
            <h1 className={'mt-0 line-height-1'}>Home</h1>
            <UnderConstruction/>
        </div>
    </div>
};

export default Home;