import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HSLString } from '../../../types';
import { generateAnalogousPalette, hslToHex } from '../../../utils';
import InputField, { InputFieldProps } from '../../partials/inputField';
import Tabs, { TabItemType } from '../../partials/tab';
import Login from '../login';
import * as z from 'zod';
import ToDo from './todo';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    red: number;
    green: number;
    blue: number;
    size: number;
    stepShift: number;
}

const paletteValidation = z.object({
    red: z.number().min(0).max(255, 'Red value must be between 0 and 255'),
    green: z.number().min(0).max(255, 'Green value must be between 0 and 255'),
    blue: z.number().min(0).max(255, 'Blue value must be between 0 and 255'),
    size: z.number().min(1).max(100, 'Size must be between 1 and 100'),
    stepShift: z.number().min(0).max(360, 'Step shift must be between 0 and 360 degrees')
})

const DemoInputField: FC = () => {
    const {
        register,
        formState: {errors}
    } = useForm<InputProps>(
        {
            resolver: zodResolver(paletteValidation),
            mode: 'onChange'
        }
    );

    const timeoutRef = useRef<any>(0);
    const inputRefs = useRef<Record<string, HTMLElement>>({});

    const [paletteProps, setPaletteProps] = useState({
        red: 150, //0, //170,
        green: 200, //0, //160,
        blue: 255, //255,
        size: 36, //14,
        stepShift: 21 //7 //26
    });

    const [palette, setPalette] = useState<any>(generateAnalogousPalette({
        r: paletteProps.red,
        g: paletteProps.green,
        b: paletteProps.blue
    }, paletteProps.size, paletteProps.stepShift));

    const [option, setOption] = useState({
        width: 70,
        labelWidth: 'auto',
        labelAlign: 'left',
        labelColor: 'inherit',
        showErrorTooltipOnCreate: true
    } as Partial<InputFieldProps>);

    useEffect(() => {
        setPalette(generateAnalogousPalette({
            r: paletteProps.red,
            g: paletteProps.green,
            b: paletteProps.blue
        }, paletteProps.size, paletteProps.stepShift));
    }, [paletteProps]);

    const paletteChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, min, max} = e.target as HTMLInputElement;
        if (!value) return;

        if (min && max && (parseFloat(value) >= parseFloat(min) && parseFloat(value) <= parseFloat(max))) {
            setPaletteProps({...paletteProps, [e.target.name]: parseInt(e.target.value)});
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => inputRefs.current[name]?.focus(), 100);
    };

    const tabItems: TabItemType[] = [
        {
            name: 'Color Palette Generator',
            content: <>
                <div className={'display-flex flex-direction-column gap-1 height-100p'}>
                    <div>
                        <form noValidate>
                            <div className="display-inline-flex gap-0p5">
                                <InputField
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Red:'}
                                    labelColor={option.labelColor}
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
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Green:'}
                                    labelColor={option.labelColor}
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
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Blue:'}
                                    labelColor={option.labelColor}
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
                                <InputField
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Size:'}
                                    labelColor={option.labelColor}
                                    type={'number'}
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
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Shift degrees:'}
                                    labelColor={option.labelColor}
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
                    </div>
                    <div className={'display-inline-flex gap-0p1 flex-wrap'} style={{maxWidth: '1295px'}}>
                        {palette.map((color: HSLString, index: number) => <span
                            key={index}
                            className={'color-box transition-200 display-inline-flex justify-content-center align-items-center'}
                            style={{
                                backgroundColor: hslToHex(color),
                                width: '91px',
                                height: '91px'
                            }}>
                    <b className={'font-size-x-small color-black'}>{hslToHex(color)}</b>
                </span>)}
                    </div>
                </div>
            </>
        }, {
            name: 'Login Dialog',
            content: <Login/>
        }, {
            name: 'ToDo',
            content: <>
                <ToDo/>
            </>
        }
    ];


    return <Tabs
        type={'boxed-tabs'}
        color={'red'}
        minContentHeight={'455'}
        data={tabItems}
        moveSelectedOnScroll={true}
        activeItemColor={'#963999'}/>;
};

export default DemoInputField;