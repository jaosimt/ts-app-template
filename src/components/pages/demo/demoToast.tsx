import Tippy from '@tippyjs/react';
import { FC, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoColorFill, IoColorFillOutline } from 'react-icons/io5';
import { RiResetLeftLine } from 'react-icons/ri';
import {
    TbBoxAlignBottomLeftFilled,
    TbBoxAlignBottomRightFilled,
    TbBoxAlignTopLeftFilled,
    TbBoxAlignTopRightFilled
} from 'react-icons/tb';
import styled from 'styled-components';
import { isString } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Dropdown, { DropdownObjectOptions } from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import { toast, ToastPosition, ToastProps, ToastTheme, ToastType } from '../../partials/toast';
import {
    IoIosWarning,
    IoIosInformationCircle,
    IoIosAlert,
    IoIosCheckmarkCircle
} from 'react-icons/io';

const toastTypes: DropdownObjectOptions[] = [
    {label: 'info', value: 'info', icon: IoIosInformationCircle},
    {label: 'success', value: 'success', icon: IoIosCheckmarkCircle},
    {label: 'warning', value: 'warning', icon: IoIosWarning},
    {label: 'error', value: 'error', icon: IoIosAlert},
];

const toastPosition: DropdownObjectOptions[] = [
    {label: 'top-right', value: 'top-right', icon: TbBoxAlignTopRightFilled},
    {label: 'top-left', value: 'top-left', icon: TbBoxAlignTopLeftFilled},
    {label: 'bottom-left', value: 'bottom-left', icon: TbBoxAlignBottomLeftFilled},
    {label: 'bottom-right', value: 'bottom-right', icon: TbBoxAlignBottomRightFilled},
];

const toastTheme: DropdownObjectOptions[] = [
    {label: 'outlined', value: 'outlined', icon: IoColorFillOutline},
    {label: 'filled', value: 'filled', icon: IoColorFill},
];

const Container = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto auto;
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const DemoToast: FC = () => {
    const [selectedType, setSelectedType] = useState<DropdownObjectOptions>(toastTypes[3]);
    const [selectedPosition, setSelectedPosition] = useState<DropdownObjectOptions>(toastPosition[0]);
    const [selectedTheme, setSelectedTheme] = useState<DropdownObjectOptions>(toastTheme[1]);

    const [toastProp, setToastProp] = useState<ToastProps>({
        message: 'The quick brown fox jumps over the lazy dog near the bunk of the river!',
        options: {
            type: toastTypes[3].value as ToastType,
            theme: toastTheme[0].value as ToastTheme,
            position: toastPosition[0].value as ToastPosition,
            duration: 0
        }
    });

    useEffect(() => {
        const {options} = toastProp;
        setToastProp({...toastProp, options: {...options, type: selectedType.value as ToastType}})

        // eslint-disable-next-line
    }, [selectedType]);

    useEffect(() => {
        const {options} = toastProp;
        setToastProp({...toastProp, options: {...options, position: selectedPosition.value as ToastPosition}})

        // eslint-disable-next-line
    }, [selectedPosition]);

    useEffect(() => {
        const {options} = toastProp;
        setToastProp({...toastProp, options: {...options, theme: selectedTheme.value as ToastTheme}})

        // eslint-disable-next-line
    }, [selectedTheme]);

    return <Container data-component={'toast-demo'}>
        <Box boxClassName={'width-100p pb-0'}>
            <div className="display-flex flex-direction-column gap-0p5 pb-0p5">
                <div className={'pb-0p5 display-flex flex-direction-column gap-0p5'}>
                    <InputField wrapperClassName={'flex-direction-column align-items-top-i'} type={'textarea'} labelWidth={110} width={'100%'} label={'Toast Message'} style={{flexDirection: 'column'}}
                                value={toastProp.message as string}
                                onChange={(e) => setToastProp({...toastProp, message: e.currentTarget.value})}/>

                    <h4 className={'m-0 border-bottom pb-0p3'}>Options:</h4>
                    <Dropdown labelWidth={110} label={'Toast Type'} selected={selectedType} onChange={(value: DropdownObjectOptions) => setSelectedType(value)} options={toastTypes}/>
                    <Dropdown labelWidth={110} label={'Toast Position'} selected={selectedPosition} onChange={(value: DropdownObjectOptions) => setSelectedPosition(value)} options={toastPosition}/>
                    <Dropdown labelWidth={110} label={'Toast Theme'} selected={selectedTheme} onChange={(value: DropdownObjectOptions) => setSelectedTheme(value)} options={toastTheme}/>
                    <div className={'display-flex gap-0p3 align-items-center justify-content-space-between'}>
                        <div className="display-flex gap-0p3 align-items-center">
                            <Tippy showOnCreate={false} content={'InputField is readonly.  Use the provided plus/minus buttons!'} className={'custom-tippy'}>
                                <InputField readOnly={true} disabled={selectedType.value === 'error'} labelWidth={110} label={'Duration'} type={'number'} width={70} step={1000} value={String(toastProp.options?.duration)}
                                            onChange={(e) => setToastProp({...toastProp, options: {...toastProp.options, duration: Number(e.currentTarget.value)}})}/>
                            </Tippy>
                            <Button disabled={toastProp.options?.duration === 0 || selectedType.value === 'error'} icon={FaMinus} onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: (toastProp.options?.duration || 0) - 1000}})}/>
                            <Button disabled={selectedType.value === 'error'} icon={FaPlus} onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: (toastProp.options?.duration || 0) + 1000}})}/>
                            <span className="color-gray">milliseconds</span>
                        </div>
                        <Button disabled={toastProp.options?.duration === 0} icon={RiResetLeftLine} onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: 0}})}/>
                    </div>
                </div>
                <div className="display-flex flex-direction-column gap-0p5 justify-content-center">
                    <Button className={'align-self-center'} disabled={!isString(toastProp.message, true)} onClick={() => toast(toastProp)}>Show Toast</Button>
                </div>
                <div className={'text-align-center border-top pt-0p5'}>
                    <Button
                        className={'align-self-center default'}
                        disabled={!isString(toastProp.message, true)}
                        onClick={
                            () => {
                                toast({
                                    message: <>
                                        <b>Test</b>
                                        <p>{toastProp.message}</p>
                                    </>
                                });
                            }
                        }>Show Non-optioned Toast</Button>
                </div>
            </div>
        </Box>
    </Container>;
};

export default DemoToast;