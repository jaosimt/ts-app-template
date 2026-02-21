import React from 'react';
import { targetUnicode } from '../../../constants';
import { BoxComponentSpecs } from '../../../constants/specs/box';
import { ButtonComponentSpecs } from '../../../constants/specs/buttons';
import { Box } from '../../partials/box';

export const strongPropsStyles = {
    minWidth: '110px',
    display: 'inline-block'
}
export const TargetUnicode = <span className={'color-magenta'}>{targetUnicode}</span>;

const Home = () => {
    return <div data-component={'home'} className={'width-100p'}>
        <h1 className={'mt-0 line-height-1'}>Home</h1>
        <Box
            borderColor={'#000000'}
            className={'p-0p5'}
            width={'100%'}
            title={'COMPONENTS'}
            borderRadius={4}
        >
            <BoxComponentSpecs/>
            <ButtonComponentSpecs/>
        </Box>
    </div>
};

export default Home;