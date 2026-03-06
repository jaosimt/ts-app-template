import { FC, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { RiResetLeftLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../hooks';
import { isString } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Dropdown, { DropdownObjectOptions } from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import { toast } from '../../partials/slices/toast';
import { ToastProps, ToastTheme, ToastType } from '../../partials/toast';
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

const DemoToast: FC = () => {
    const dispatch = useAppDispatch();

    const [selectedType, setSelectedType] = useState<DropdownObjectOptions>(toastTypes[0]);
    const [selectedTheme, setSelectedTheme] = useState<ToastTheme>('default');
    const [toastProp, setToastProp] = useState<Partial<ToastProps>>({
        message: 'The quick brown fox jumps over the lazy dog near the bunk of the river!',
        options: {
            type: 'info',
            theme: 'default',
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
        setToastProp({...toastProp, options: {...options, theme: selectedTheme as ToastTheme}})

        // eslint-disable-next-line
    }, [selectedTheme]);

    return <div data-component={'toast-demo'} className={'width-100p height-100p display-flex align-items-center justify-content-center'}>
        <Box>
            <div className="display-flex flex-direction-column gap-0p5">
                <div className={'border-bottom pb-0p5 display-flex flex-direction-column gap-0p5'}>
                    <InputField type={'textarea'} labelWidth={110} width={300} label={'Toast Message'} value={toastProp.message}
                                onChange={(e) => setToastProp({...toastProp, message: e.currentTarget.value})}/>
                    <Dropdown labelWidth={110} label={'Toast Type'} selected={selectedType} onChange={(value: DropdownObjectOptions) => setSelectedType(value)} options={toastTypes}/>
                    <Dropdown labelWidth={110} label={'Toast Theme'} selected={selectedTheme} onChange={(value: ToastTheme) => setSelectedTheme(value)} options={['default', 'vibrant']}/>
                    <div className={'display-flex gap-0p3 align-items-center justify-content-space-between'}>
                        <div className="display-flex gap-0p3 align-items-center">
                            <InputField readOnly={true} disabled={selectedType.value === 'error'} labelWidth={110} label={'Duration'} type={'number'} width={70} step={1000} value={String(toastProp.options?.duration)}
                                        onChange={(e) => setToastProp({...toastProp, options: {...toastProp.options, duration: Number(e.currentTarget.value)}})}/>
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