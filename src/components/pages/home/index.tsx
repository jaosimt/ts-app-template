import { FC } from 'react';
import UnderConstruction from '../underConstruction';

const Home: FC = () => {
    return <div data-component={'home'} className={'width-100p'}>
        <div className={''}>
            <h1 className={'mt-0 line-height-1'}>Home</h1>
            <div className="color-magenta">
                <p className={'mb-0'}><b>TODOs:</b></p>
                <ul className={'m-0'}>
                    <li>Add prop <b>rememberSelected</b> and <b>id</b> to tab</li>
                    <ul className={'m-0'}>
                        <li>Handle it inside Tab by storing active selection to localstorage mapped to prop <b>id</b></li>
                        <li>Check stored selected tab if it exist in the tab data before using it!</li>
                    </ul>
                    <li>Remove prop <b>activeTab</b> and all relevant handlers afterwards</li>
                </ul>
            </div>
            <UnderConstruction/>
        </div>
    </div>
};

export default Home;