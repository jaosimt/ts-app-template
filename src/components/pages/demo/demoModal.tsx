import { FC, useState } from 'react';
import {  SlScreenDesktop } from 'react-icons/sl';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Modal from '../../partials/modal';
import UnderConstruction from '../underConstruction';

const ModalDemo: FC = () => {
    const [showModal, setShowModal] = useState(false);

    return <div data-component={'modal-demo'} style={{height: '100%', width: '100%'}}>
        {
            showModal && <Modal
                closeOnEscKey={true}
                closeOnOutsideClick={true}
                title={'Hello from a modal'}
                showClose={true}
                onClose={() => setShowModal(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h2 className={'display-flex m-0 color-magenta font-monospace flex-direction-column align-items-center'}>Hello, modal!</h2>
                    <div>
                        <h4 className={'m-0'}>This modal can be close by one of the following ways:</h4>
                        <ul className={'m-0'} style={{listStyle: 'disc'}}>
                            <li>Clicking the close button</li>
                            <li>Clicking outside the modal</li>
                            <li>Pressing the ESC key</li>
                        </ul>
                    </div>
                </div>
            </Modal>
        }

        <div className="display-flex flex-direction-column gap-1">
            <Box
                label={'Box props'}
                borderRadius={4}
                style={{minHeight: '500px'}}
            >
                <div className="display-flex justify-content-center">
                    <UnderConstruction centered={false} fontSize={35} />
                </div>
            </Box>
            <Button
                className={'font-size-large'}
                align={'space-between'}
                icon={SlScreenDesktop}
                disabled={showModal}
                onClick={() => setShowModal(true)}
            >
                Show Modal
            </Button>
        </div>
    </div>;
};

export default ModalDemo;