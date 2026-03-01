import { FC, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { SlReload, SlScreenDesktop } from 'react-icons/sl';
import styled from 'styled-components';
import { classNames } from '../../../utils';
import Box, { LabelPositionType } from '../../partials/box';
import Button from '../../partials/button';
import Modal from '../../partials/modal';
import WindowPortal from '../windowPortal';

const ModalDemo: FC = () => {
    const [boxLabelPosition, setBoxLabelPosition] = useState<LabelPositionType>('top-left')
    const [showModal, setShowModal] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = useState(0);

    useEffect(() => {
        const labelPositions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
        setBoxLabelPosition(labelPositions[Math.floor(Math.random() * labelPositions.length)] as LabelPositionType)

        // eslint-disable-next-line
    }, []);

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
    `

    return <div data-component={'modal-demo'} className={'width-100p'} style={{minHeight: '490px'}}>
        <h1 className={'mt-0 display-flex justify-content-space-between line-height-1'}>&nbsp;<Counter>{ctr}</Counter></h1>

        {
            showModal && <Modal
                closeOnEscKey={true}
                closeOnOutsideClick={true}
                title={'Hello from a modal'}
                showClose={true}
                onClose={() => setShowModal(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h2 className={'display-flex m-0 color-magenta font-monospace flex-direction-column align-items-center'}>Hello ctr <Counter>{ctr}</Counter> viewed in modal!</h2>
                    <div>
                        <h4 className={'m-0'}>This modal can be close by one of the following ways:</h4>
                        <ul className={'m-0'} style={{listStyle: 'disc'}}>
                            <li>Clicking the close button</li>
                            <li>Clicking outside the modal</li>
                            <li>Pressing the ESC key</li>
                        </ul>
                    </div>
                    <div className={'display-flex gap-0p5 justify-content-space-between'}>
                        <div className={'display-flex gap-0p5 align-items-center'}>
                            <Button
                                icon={FaMinus}
                                onClick={() => setCtr(ctr - 1)}
                            />
                            <Counter>{ctr}</Counter>
                            <Button
                                icon={FaPlus}
                                onClick={() => setCtr(ctr + 1)}
                            />
                        </div>

                        <Button
                            width={'180px'}
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
                    </div>
                </div>
            </Modal>
        }
        {
            showPortal && <WindowPortal
                openOnNextScreen={true}
                onClose={() => setShowPortal(false)}
            >
                <div className={'p-2'}>
                    <h1 className={'color-red display-flex flex-direction-column align-items-center'}>Hello ctr <Counter>{ctr}</Counter> viewed in new window!</h1>
                </div>
            </WindowPortal>
        }

        <section className={'translate absolute-center display-flex gap-0p5 flex-direction-column align-items-center'}>
            <Box
                width={333}
                borderRadius={4}
                borderColor={'rgb(255, 0, 0)'}
                label={'Buttons'}
                labelPosition={boxLabelPosition}
                labelColor={'#ff0000'}
                className={classNames(
                    'display-flex',
                    'flex-direction-column',
                    'gap-0p5',
                    'align-items-center',
                    'justify-content-center')}
            >
                <Button
                    width={'200px'}
                    align={'space-between'}
                    icon={SlScreenDesktop}
                    disabled={showModal}
                    onClick={() => setShowModal(true)}
                >
                    Show Modal
                </Button>
                <Button
                    width={'200px'}
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
            </Box>
        </section>
    </div>;
};

export default ModalDemo;