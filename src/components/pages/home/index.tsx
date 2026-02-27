import { FC } from 'react';
import ToDo from '../demo/todo';

const Home: FC = () => {
    return <div data-component={'home'} className={'width-100p'}>
        <ToDo className={'translate absolute-center'} />
    </div>
};

export default Home;