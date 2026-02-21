import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';
import { SlScreenDesktop } from 'react-icons/sl';
import { RGBString } from '../../../types';
import { classNames, generateAnalogousPalette } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import InputField from '../../partials/inputField';
import Modal from '../../partials/modal';
import WindowPortal from '../windowPortal';

interface PaletteProps extends React.HTMLAttributes<HTMLInputElement> {
    red: number;
    green: number;
    blue: number;
    size: number;
    stepShift: number;
}

const Demo: FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = React.useState(0);
    const [paletteProps, setPaletteProps] = useState({
        red: 150, //0, //170,
        green: 200, //0, //160,
        blue: 255, //255,
        size: 42, //14,
        stepShift: 21 //7 //26
    });
    const [palette, setPalette] = useState<any>(generateAnalogousPalette({
        r: paletteProps.red,
        g: paletteProps.green,
        b: paletteProps.blue
    }, paletteProps.size, paletteProps.stepShift));

    const {
        register,
        formState: {errors}
    } = useForm<PaletteProps>(
        /*{
            resolver: zodResolver(paletteValidation),
            mode: "onChange"
        }*/
    );

    const paletteChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaletteProps({...paletteProps, [e.target.name]: parseInt(e.target.value)});
    };

    useEffect(() => {
        setPalette(generateAnalogousPalette({
            r: paletteProps.red,
            g: paletteProps.green,
            b: paletteProps.blue
        }, paletteProps.size, paletteProps.stepShift))
    }, [paletteProps]);

    return <div data-component={'demo'} className={'width-100p'} style={{minHeight: '490px'}}>
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
                    <h2 className={'m-0 text-align-center color-magenta font-monospace'}>Hello ctr [{ctr}] viewed in modal!</h2>
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
                                align={'space-between'}
                                icon={FaMinus}
                                onClick={() => setCtr(ctr - 1)}
                            />
                            <strong style={{minWidth: '50px', textAlign: 'center', padding: '6px'}} className="border-radius-0p3 border font-family-monospace">{ctr}</strong>
                            <Button
                                align={'space-between'}
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
                    <h1 className={'color-red m-0 mb-2'}>Hello ctr [{ctr}] viewed in new window!</h1>
                </div>
            </WindowPortal>
        }

        <section className={'translate absolute-center display-flex gap-0p5 flex-direction-column align-items-center'}>
            <Box
                boxClassName={'background'}
                width={416}
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
                <div className={'display-flex gap-0p5 align-items-center'}>
                    <Button
                        align={'space-between'}
                        icon={FaMinus}
                        onClick={() => setCtr(ctr - 1)}
                    />
                    <strong style={{minWidth: '118px', textAlign: 'center', padding: '6px'}} className="border-radius-0p3 border font-family-monospace">{ctr}</strong>
                    <Button
                        align={'space-between'}
                        icon={FaPlus}
                        onClick={() => setCtr(ctr + 1)}
                    />
                </div>
            </Box>

            <Box
                width={416}
                borderRadius={'4px'}
                title={'Analogous Palette'}
                className={classNames(
                    'display-flex',
                    'gap-0p5',
                    'flex-direction-column',
                    'align-items-center',
                    'justify-content-center')}
            >
                <div className={'display-flex gap-0p5 flex-wrap'}>
                    {palette.map((color: RGBString, index: number) => <span
                        key={index} className={'color-box transition-200'}
                        style={{
                            backgroundColor: color,
                            width: '21px',
                            height: '21px'
                        }}
                    />)}
                </div>
            </Box>

            <Box
                width={416}
                borderRadius={'4px'}
                title={'InputFields'}
                className={classNames(
                    'display-flex',
                    'gap-0p5',
                    'flex-direction-column',
                    'align-items-center',
                    'justify-content-center')}
            >
                <div className="display-flex gap-1">
                    <InputField
                        label={'Red:'}
                        labelColor={'#ff0000'}
                        min={0}
                        max={255}
                        type={'number'}
                        fieldRegister={register('red', {value: paletteProps.red, onChange: paletteChangeHandler})}
                        error={errors.red?.message}
                    />
                    <InputField
                        label={'Green:'}
                        labelColor={'#008000'}
                        min={0}
                        max={255}
                        type={'number'}
                        fieldRegister={register('green', {value: paletteProps.green, onChange: paletteChangeHandler})}
                        error={errors.green?.message}
                    />
                    <InputField
                        label={'Blue:'}
                        labelColor={'#0000ff'}
                        min={0}
                        max={255}
                        type={'number'}
                        fieldRegister={register('blue', {value: paletteProps.blue, onChange: paletteChangeHandler})}
                        error={errors.blue?.message}
                    />
                </div>
                <div className="display-flex gap-1">
                    <InputField
                        label={'Size:'}
                        type={'number'}
                        fieldRegister={register('size', {value: paletteProps.size, onChange: paletteChangeHandler})}
                        error={errors.size?.message}
                    />
                    <InputField
                        label={'Shift %:'}
                        min={0}
                        max={360}
                        type={'number'}
                        fieldRegister={register('stepShift', {
                            value: paletteProps.stepShift,
                            onChange: paletteChangeHandler
                        })}
                        error={errors.stepShift?.message}
                    />
                </div>
            </Box>
        </section>
    </div>;
};

export default Demo;