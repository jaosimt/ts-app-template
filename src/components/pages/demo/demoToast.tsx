import Tippy from '@tippyjs/react';
import { FC, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoColorFill, IoColorFillOutline } from 'react-icons/io5';
import { RiResetLeftLine } from 'react-icons/ri';
import { TbBoxAlignTopLeftFilled, TbBoxAlignTopRightFilled } from 'react-icons/tb';
import { useAppDispatch } from '../../../hooks';
import { isString } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Dropdown, { DropdownObjectOptions } from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import { toast } from '../../partials/slices/toast';
import { ToastPosition, ToastProps, ToastTheme, ToastType } from '../../partials/toast';
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
];

const toastTheme: DropdownObjectOptions[] = [
    {label: 'outlined', value: 'outlined', icon: IoColorFillOutline},
    {label: 'filled', value: 'filled', icon: IoColorFill},
];

const DemoToast: FC = () => {
    const dispatch = useAppDispatch();

    const [selectedType, setSelectedType] = useState<DropdownObjectOptions>(toastTypes[0]);
    const [selectedPosition, setSelectedPosition] = useState<DropdownObjectOptions>(toastPosition[0]);
    const [selectedTheme, setSelectedTheme] = useState<DropdownObjectOptions>(toastTheme[0]);

    const [toastProp, setToastProp] = useState<Partial<ToastProps>>({
        message: 'The quick brown fox jumps over the lazy dog near the bunk of the river!',
        options: {
            type: toastTypes[0].value as ToastType,
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

    return <div data-component={'toast-demo'} className={'width-100p height-100p display-flex align-items-center justify-content-center'}>
        <Box>
            <div className="display-flex flex-direction-column gap-0p5">
                <div className={'border-bottom pb-0p5 display-flex flex-direction-column gap-0p5'}>
                    <InputField type={'textarea'} labelWidth={110} width={300} label={'Toast Message'} value={toastProp.message}
                                onChange={(e) => setToastProp({...toastProp, message: e.currentTarget.value})}/>
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
                <Button className={'align-self-center'} disabled={!isString(toastProp.message, true)} onClick={() => dispatch(toast({
                        message: toastProp.message as string,
                        options: toastProp.options
                    })
                )}>Show Toast Message</Button>
            </div>
        </Box>
    </div>;
};

export default DemoToast;