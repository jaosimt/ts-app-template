import React from 'react';
import { Box } from '../../partials/box';

const Home = () => {
    return <div data-component={'home'}>
        <h1 className={'mt-0 line-height-1'}>Home</h1>
        <Box
            title={'COMPONENTS'}
            borderRadius={4}
        >
            <p className={'m-0'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>
        </Box>
    </div>
};

export default Home;