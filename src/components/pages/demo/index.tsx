import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { SlReload, SlScreenDesktop } from 'react-icons/sl';
import { NavLink } from 'react-router';
import styled from 'styled-components';
import { LabelPositionType, RGBString } from '../../../types';
import { classNames, generateAnalogousPalette } from '../../../utils';
import { paletteValidation } from '../../../validations';
import Box from '../../partials/box';
import Button from '../../partials/button';
import InputField from '../../partials/inputField';
import Modal from '../../partials/modal';
import WindowPortal from '../windowPortal';

interface PaletteProps extends HTMLAttributes<HTMLInputElement> {
    red: number;
    green: number;
    blue: number;
    size: number;
    stepShift: number;
}

const Demo: FC = () => {
    const {
        register,
        formState: {errors}
    } = useForm<PaletteProps>(
        {
            shouldUseNativeValidation: true,
            resolver: zodResolver(paletteValidation),
            mode: 'onChange'
        }
    );

    const timeoutRef = useRef<any>(0)
    const inputRefs = useRef<Record<string, HTMLElement>>({});

    const [boxLabelPosition, setBoxLabelPosition] = useState<LabelPositionType>('top-left')
    const [showModal, setShowModal] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [ctr, setCtr] = useState(0);
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

    const paletteChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, min, max} = e.target as HTMLInputElement;
        if (!value) return;

        if (min && max && (parseFloat(value) >= parseFloat(min) && parseFloat(value) <= parseFloat(max))) {
            setPaletteProps({...paletteProps, [e.target.name]: parseInt(e.target.value)});
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => inputRefs.current[name]?.focus(), 100);
    };

    useEffect(() => {
        setPalette(generateAnalogousPalette({
            r: paletteProps.red,
            g: paletteProps.green,
            b: paletteProps.blue
        }, paletteProps.size, paletteProps.stepShift))
    }, [paletteProps]);

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

    return <div data-component={'demo'} className={'width-100p'} style={{minHeight: '490px'}}>
        <h1 className={'mt-0 display-flex justify-content-space-between line-height-1'}>Demo Page <Counter>{ctr}</Counter></h1>

        {
            showModal && <Modal
                closeOnEscKey={true}
                closeOnOutsideClick={true}
                title={'Hello from a modal'}
                showClose={true}
                onClose={() => setShowModal(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h2 className={'m-0 color-magenta font-monospace flex-direction-column align-items-center'}>Hello ctr <Counter>{ctr}</Counter> viewed in modal!</h2>
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
                            <Counter>{ctr}</Counter>
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
                    <h1 className={'color-red flex-direction-column align-items-center'}>Hello ctr <Counter>{ctr}</Counter> viewed in new window!</h1>
                </div>
            </WindowPortal>
        }

        <NavLink to={'/demo/tabs'} className={({isActive}) => classNames(isActive && 'active', 'transition-200')}>Tabs</NavLink>

        <section className={'translate absolute-center display-flex gap-0p5 flex-direction-column align-items-center'}>
            <Box
                width={333}
                borderRadius={4}
                borderColor={'rgb(255, 0, 0)'}
                label={'Buttons'}
                labelPosition={boxLabelPosition}
                labelColor={'#ff0000'}
                className={classNames(
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

            <Box
                width={333}
                borderRadius={'4px'}
                label={'Analogous Palette'}
                labelPosition={boxLabelPosition}
                className={classNames(
                    'display-flex',
                    'gap-0p5',
                    'flex-direction-column',
                    'align-items-center',
                    'justify-content-center')}
            >
                <div className={'display-flex gap-0p1 flex-wrap'}>
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
                width={333}
                borderRadius={'4px'}
                backgroundColor={'yellow'}
                label={'InputFields'}
                labelColor={'#ff0000'}
                labelPosition={boxLabelPosition}
                labelBackgroundColor={'white'}
            >
                <form noValidate>
                    <div className="display-flex flex-wrap gap-0p3-5">
                        <InputField
                            label={'Red:'}
                            labelColor={'red'}
                            min={0}
                            max={255}
                            type={'number'}
                            fieldRegister={register('red', {
                                valueAsNumber: true,
                                value: paletteProps.red,
                                onChange: paletteChangeHandler
                            })}
                            error={errors.red?.message}
                            setRef={(ref: HTMLElement) => inputRefs.current.red = ref}
                        />
                        <InputField
                            label={'Green:'}
                            labelColor={'#008000'}
                            min={0}
                            max={255}
                            type={'number'}
                            fieldRegister={register('green', {
                                valueAsNumber: true,
                                value: paletteProps.green,
                                onChange: paletteChangeHandler
                            })}
                            error={errors.green?.message}
                            setRef={(ref: HTMLElement) => inputRefs.current.green = ref}
                        />
                        <InputField
                            label={'Blue:'}
                            labelColor={'#0000ff'}
                            min={0}
                            max={255}
                            type={'number'}
                            fieldRegister={register('blue', {
                                valueAsNumber: true,
                                value: paletteProps.blue,
                                onChange: paletteChangeHandler
                            })}
                            error={errors.blue?.message}
                            setRef={(ref: HTMLElement) => inputRefs.current.blue = ref}
                        />
                    </div>
                    <div
                        className="mt-0p3 display-flex flex-wrap gap-0p3-5"
                    >
                        <InputField
                            label={'Size:'}
                            type={'number'}
                            width={`100px`}
                            min={1}
                            max={56}
                            fieldRegister={register('size', {
                                valueAsNumber: true,
                                value: paletteProps.size,
                                onChange: paletteChangeHandler
                            })}
                            error={errors.size?.message}
                            setRef={(ref: HTMLElement) => inputRefs.current.size = ref}
                        />
                        <InputField
                            label={'Shift %:'}
                            min={0}
                            max={360}
                            type={'number'}
                            fieldRegister={register('stepShift', {
                                valueAsNumber: true,
                                value: paletteProps.stepShift,
                                onChange: paletteChangeHandler
                            })}
                            error={errors.stepShift?.message}
                            setRef={(ref: HTMLElement) => inputRefs.current.stepShift = ref}
                        />
                    </div>
                </form>
            </Box>
        </section>
    </div>;
};

export default Demo;