import { FC, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { SlReload, SlScreenDesktop } from 'react-icons/sl';
import styled from 'styled-components';
import { beep, Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { useAppDispatch, useAppSelector, usePrevious } from '../../../hooks';
import { decrementCounter, getCounter, incrementCounter, resetCounter } from '../../../slices/counter';
import Box from '../../partials/box';
import Button from '../../partials/button';
import { toast } from '../../partials/toast';
import WindowPortal from '../windowPortal';

const Counter = styled.span`
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const DemoWindowPortal: FC<{ theme: ThemeProp }> = ({theme}) => {
    const dispatch = useAppDispatch();
    const ctr = useAppSelector(getCounter);

    const [showPortal, setShowPortal] = useState(false);
    const prev_showPortal = usePrevious(showPortal);

    useEffect(() => {
        if (prev_showPortal && !showPortal) {
            beep(2);
            toast({message: 'Portal is disconnected!', options: {type: 'warning', closeOnPageChange: false}});
        }
    }, [showPortal, prev_showPortal]);

    const themedBoxBorderColor = theme === Theme.LIGHT ? '#000' : '#ccc';

    return <div data-component={'window-portal-demo'}>
        {showPortal && <WindowPortal
            openOnNextScreen={true}
            onClose={() => setShowPortal(false)}
        >
            <div className={'translate absolute-center'}>
                <h1 className={'color-red display-flex flex-direction-column align-items-center'}>
                    Hello ctr <span
                    className={'p-2 border display-flex align-items-center justify-content-center font-weight-bold'}
                    style={{borderRadius: '50%', width: '3rem', height: '3rem',}}
                >{ctr}</span> viewed in new window!
                </h1>
            </div>
        </WindowPortal>}

        <Box className={'translate absolute-center'}
             contentClassName={'display-flex flex-direction-column justify-self-center'}
             borderColor={themedBoxBorderColor}>
            <div className={'display-flex justify-content-center align-items-center gap-0p5-1'}>
                <span>Counter</span>
                <div className={'display-flex gap-0p5 align-items-center'}>
                    <Button
                        icon={FaMinus}
                        onClick={() => dispatch(decrementCounter())}
                    />
                    <Counter>{ctr}</Counter>
                    <Button
                        icon={FaPlus}
                        onClick={() => dispatch(incrementCounter())}
                    />
                    <Button
                        icon={SlReload}
                        disabled={ctr === 0}
                        onClick={() => dispatch(resetCounter())}
                    />
                </div>
            </div>
            <div className={'display-flex flex-direction-column align-items-center mt-0p5'}>
                <Button
                    width={'90%'}
                    align={'space-between'}
                    icon={SlScreenDesktop}
                    disabled={showPortal}
                    onClick={() => setShowPortal(true)}
                >
                    <div className={'display-inline-flex flex-direction-column align-items-end'}>
                        <span>Show Portal</span>
                        <span className={'font-size-x-small'}>in second screen if available</span>
                    </div>
                </Button>
                <b className={'font-size-x-small mt-0p5'}>Above counter will be rendered in the portal window</b>
            </div>
        </Box>
    </div>;
};

export default DemoWindowPortal;