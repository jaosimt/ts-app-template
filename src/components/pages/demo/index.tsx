import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { RGBString } from '../../../types';
import { classNames, generateAnalogousPalette } from '../../../utils';
import { Box } from '../../partials/box';
import { Button } from '../../partials/button';
import { InputField } from '../../partials/inputField';
import Modal from '../../partials/modal';
import WindowPortal from '../windowPortal';

interface PaletteProps extends React.HTMLAttributes<HTMLInputElement> {
    red: number;
    green: number;
    blue: number;
    count: number;
    stepShift: number;
}

export const Demo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = React.useState(0);
    const [palette] = useState<any>(generateAnalogousPalette({r: 170, g: 160, b: 255}, 14, 26));

    const {register} = useForm<PaletteProps>();

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

        <section className={'translate-fixed-center display-flex gap-0p5 flex-direction-column align-items-center'}>
            <Box
                width={'100%'}
                borderRadius={4}
                borderColor={'rgb(255, 0, 0)'}
                title={'Buttons'}
                titleColor={'#ff0000'}
                className={classNames(
                    'display-flex',
                    'gap-0p5',
                    'flex-direction-column',
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
                <Button
                    width={'200px'}
                    align={'space-between'}
                    icon={FaPlus}
                    onClick={() => setCtr(ctr + 1)}
                >
                    Counter: {ctr}
                </Button>
            </Box>
            <Box
                width={'100%'}
                borderRadius={'4px'}
                title={'Analogous Palette'}
                className={classNames(
                    'display-flex',
                    'gap-0p5',
                    'flex-direction-column',
                    'align-items-center',
                    'justify-content-center')}
            >
                <div className={'display-flex gap-0p5'}>
                    {palette.map((color: RGBString, index: number) => <span
                        key={index} className={'color-box'}
                        style={{
                            backgroundColor: color,
                            width: '21px',
                            height: '21px'
                        }}
                    />)}
                </div>
                <InputField
                    type={'number'}
                    fieldRegister={register('red')}
                />
            </Box>

        </section>
    </div>;
};