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
import { ApplicationError } from '../../../class';
import { ThemeProp } from '../../../constants/interfaces';
import { useAppDispatch } from '../../../hooks';
import { setError } from '../../../slices/error';
import { isString } from '../../../utils';
import { getBorderColor } from '../../../utils/themeUtils';
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

const DemoToast: FC<{theme: ThemeProp}> = ({theme}) => {
    const dispatch = useAppDispatch();

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


    return <div data-component={'toast-demo'} className={'height-100p'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`toast`}</h2>

                <div className={'display-flex gap-0p5 flex-wrap'}>
                    <Button
                        className={'align-self-center'}
                        disabled={!isString(toastProp.message, true)}
                        onClick={() => toast(toastProp)}
                    >
                        Show Toast
                    </Button>
                    <Button
                        className={'default'}
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
                        }
                    >
                        Show Non-optioned Toast
                    </Button>
                    <Button
                        className={'default'}
                        onClick={() => dispatch(setError(new ApplicationError('Test Error')))}
                    >
                        Trigger a Test Error
                    </Button>
                </div>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    wrapperClassName={'flex-direction-column align-items-top-i'}
                    type={'textarea'}
                    labelWidth={165}
                    width={'100%'}
                    label={'message'}
                    style={{flexDirection: 'column'}}
                    value={toastProp.message as string}
                    onChange={(e) => setToastProp({...toastProp, message: e.currentTarget.value})}/>

                <p className={'m-0 border-bottom pb-0p3'}>options:</p>
                <Dropdown
                    labelWidth={165}
                    label={'type'}
                    selected={selectedType}
                    onChange={(value: DropdownObjectOptions) => setSelectedType(value)} options={toastTypes}/>
                <Dropdown
                    labelWidth={165}
                    label={'position'}
                    selected={selectedPosition}
                    onChange={(value: DropdownObjectOptions) => setSelectedPosition(value)} options={toastPosition}/>
                <Dropdown
                    labelWidth={165}
                    label={'theme'}
                    selected={selectedTheme}
                    onChange={(value: DropdownObjectOptions) => setSelectedTheme(value)} options={toastTheme}/>
                <span>duration</span>
                <div className={'display-flex gap-0p3 align-items-center justify-content-space-between -mt-0p5'}>
                    <div className={'display-flex align-items-center'}>
                        <Button
                            disabled={toastProp.options?.duration === 0 || selectedType.value === 'error'}
                            icon={FaMinus}
                            onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: (toastProp.options?.duration || 0) - 1000}})}/>
                        <Tippy
                            showOnCreate={false}
                            content={'InputField is readonly.  Use the provided plus/minus buttons!'}
                            className={'custom-tippy'}>
                            <InputField
                                readOnly={true}
                                disabled={selectedType.value === 'error'}
                                labelWidth={165}
                                type={'number'}
                                width={70}
                                step={1000}
                                value={String(toastProp.options?.duration)}
                                onChange={(e) => setToastProp({...toastProp, options: {...toastProp.options, duration: Number(e.currentTarget.value)}})}/>
                        </Tippy>
                        <Button
                            disabled={selectedType.value === 'error'}
                            icon={FaPlus}
                            onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: (toastProp.options?.duration || 0) + 1000}})}/>
                        <span className="color-gray">milliseconds</span>
                    </div>
                    <Button
                        disabled={toastProp.options?.duration === 0}
                        icon={RiResetLeftLine}
                        onClick={() => setToastProp({...toastProp, options: {...toastProp.options, duration: 0}})}/>
                </div>
            </div>
        </div>
    </div>;
};

export default DemoToast;