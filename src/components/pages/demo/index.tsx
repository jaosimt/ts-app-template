import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { Button } from '../../partials/button';
import Modal from '../../partials/modal';
import WindowPortal from '../windowPortal';

export const Demo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = React.useState(0);

    return <div data-component={'demo'} className={'width-100p'} style={{minHeight: '300px'}}>
        <h1 className={'mt-0 line-height-1'}>Demo Page</h1>

        {
            showModal && <Modal
                closeOnEscKey={true}
                closeOnOutsideClick={true}
                title={'Hello from a modal'}
                showClose={true}
                onClose={() => setShowModal(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h1 className={'m-0'}>Hello ctr from a modal {ctr}!</h1>
                    <div className={'display-flex gap-0p5'}>
                        <Button
                            align={'space-between'}
                            disabled={showPortal}
                            onClick={() => setShowPortal(true)}
                        >
                            Show Portal
                        </Button>
                        <Button
                            align={'space-between'}
                            onClick={() => setCtr(ctr + 1)}
                        >
                            Increment Counter
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
                    <h1 className={'color-red m-0 mb-2'}>Hello ctr from a new window {ctr}!</h1>
                </div>
            </WindowPortal>
        }

        <section className={'translate-fixed-center display-flex gap-0p5 flex-direction-column mt'}>
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
            <Button
                width={'200px'}
                align={'space-between'}
                icon={FaPlus}
                onClick={() => setCtr(ctr + 1)}
            >
                Counter: {ctr}
            </Button>
        </section>
    </div>;
};