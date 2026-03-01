import { FC, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { SlReload, SlScreenDesktop } from 'react-icons/sl';
import styled from 'styled-components';
import { classNames } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
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

const PortalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Header = styled.h1`
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const WindowPortalDemo: FC = () => {
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = useState(0);

    return <div data-component={'window-portal-demo'} className={'width-100p'} style={{minHeight: '490px'}}>
        {showPortal && <WindowPortal
            openOnNextScreen={true}
            onClose={() => setShowPortal(false)}
        >
            <PortalContainer>
                <Header>Hello ctr <Counter>{ctr}</Counter> viewed in new window!</Header>
            </PortalContainer>
        </WindowPortal>}

        <Box
            boxClassName={'translate absolute-center'}
            borderRadius={4}
            className={classNames(
                'display-flex',
                'flex-direction-column',
                'gap-0p5',
                'align-items-center',
                'justify-content-center')}
        >
            <div className={'display-flex gap-0p5 align-items-center mb-1'}>
                <span>Counter</span>
                <div className={'display-flex gap-0p5 align-items-center'}>
                    <Button
                        align={'space-between'}
                        icon={FaMinus}
                        onClick={() => setCtr(ctr - 1)}
                    />
                    <Counter>{ctr}</Counter>
                    <Button
                        align={'space-between'}
                        icon={FaPlus}
                        onClick={() => setCtr(ctr + 1)}
                    />
                    <Button
                        icon={SlReload}
                        disabled={ctr === 0}
                        onClick={() => setCtr(0)}
                    />
                </div>
            </div>
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
        </Box>
    </div>;
};

export default WindowPortalDemo;