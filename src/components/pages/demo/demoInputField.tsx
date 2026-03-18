import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbBrandReact } from 'react-icons/tb';
import styled from 'styled-components';
import { ThemeProp } from '../../../constants/interfaces';
import { HSLString } from '../../../constants/types';
import { generateAnalogousPalette, hslToHex } from '../../../utils';
import { getBorderColor } from '../../../utils/themeUtils';
import Button from '../../partials/button';
import Dropdown from '../../partials/dropdown';
import InputField, { InputFieldProps } from '../../partials/inputField';
import * as z from 'zod';
import { DiCss3, DiHtml5, DiJsBadge } from 'react-icons/di';
import { SiTypescript } from 'react-icons/si';


interface InputProps extends HTMLAttributes<HTMLInputElement> {
    red: number;
    green: number;
    blue: number;
    size: number;
    stepShift: number;
    labelColor?: string;
    labelWidth?: number;
    width: number;
    labelAlign?: string;
}

const paletteValidation = z.object({
    red: z.number().min(0).max(255, 'Red value must be between 0 and 255'),
    green: z.number().min(0).max(255, 'Green value must be between 0 and 255'),
    blue: z.number().min(0).max(255, 'Blue value must be between 0 and 255'),
    size: z.number().min(1).max(100, 'Size must be between 1 and 100'),
    stepShift: z.number().min(0).max(360, 'Step shift must be between 0 and 360 degrees'),
    labelColor: z.string().optional(),
    labelWidth: z.number().optional(),
    width: z.number().min(50),
    labelAlign: z.string().optional()
});

const icons = [
    {label: 'react', value: 'react', icon: TbBrandReact},
    {label: 'html5', value: 'html5', icon: DiHtml5},
    {label: 'css3', value: 'css3', icon: DiCss3},
    {label: 'javascript', value: 'javascript', icon: DiJsBadge},
    {label: 'typeScript', value: 'typeScript', icon: SiTypescript}
];

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Red = styled.div`
`;
const Green = styled.div`
`;
const Blue = styled.div`
`;
const Size = styled.div`
`;
const StepShift = styled.div`
`;

const PaletteGrid = styled.div`
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(91px, 1fr));
`;

const DemoInputField: FC<{theme: ThemeProp}> = ({theme}) => {
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

    const [icon, setIcon] = useState(icons[0]);
    const [enableIcon, setEnableIcon] = useState(false);
    const [paletteProps, setPaletteProps] = useState({
        red: 255,
        green: 0,
        blue: 0,
        size: 7,
        stepShift: 7
    });

    const [palette, setPalette] = useState<any>(generateAnalogousPalette({
        r: paletteProps.red,
        g: paletteProps.green,
        b: paletteProps.blue
    }, paletteProps.size, paletteProps.stepShift));

    const [option, setOption] = useState({
        width: 70,
        icon: icon.icon,
        labelWidth: 130,
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

    useEffect(() => {
        setOption({...option, icon: icon.icon});
        // eslint-disable-next-line
    }, [icon]);

    const optionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setOption({...option, [name]: value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setOption({...option, [name]: value});

    const paletteChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, min, max} = e.target as HTMLInputElement;
        if (!value) return;

        if (min && max && (parseFloat(value) >= parseFloat(min) && parseFloat(value) <= parseFloat(max))) {
            setPaletteProps({...paletteProps, [e.target.name]: parseInt(e.target.value)});
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => inputRefs.current[name]?.focus(), 100);
    };

    return <div data-component={'input-field-demo'} className={'height-100p'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<InputField />`}</h2>

                <div className="display-flex flex-direction-column">
                    <form noValidate>
                        <GridContainer>
                            <Red>
                                <InputField
                                    icon={enableIcon ? option.icon : undefined}
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Red'}
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
                            </Red>
                            <Green>
                                <InputField
                                    icon={enableIcon ? option.icon : undefined}
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Green'}
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
                            </Green>
                            <Blue>
                                <InputField
                                    icon={enableIcon ? option.icon : undefined}
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Blue'}
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
                            </Blue>
                            <Size>
                                <InputField
                                    icon={enableIcon ? option.icon : undefined}
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Size'}
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
                            </Size>
                            <StepShift>
                                <InputField
                                    icon={enableIcon ? option.icon : undefined}
                                    showErrorTooltipOnCreate={option.showErrorTooltipOnCreate}
                                    width={option.width}
                                    labelWidth={option.labelWidth}
                                    labelAlign={option.labelAlign}
                                    label={'Shift degrees'}
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
                            </StepShift>
                        </GridContainer>
                    </form>
                    <PaletteGrid className={'border-top mt-1 pt-1 justify-content-space-between'}>
                        {palette.map((color: HSLString, index: number) => <span
                            key={index}
                            className={'color-box transition-200 display-inline-flex justify-content-center align-items-center'}
                            style={{
                                backgroundColor: hslToHex(color),
                                width: '91px',
                                height: '91px'
                            }}>
                            <b className={'font-size-x-small text-shadow-black'}>{hslToHex(color)}</b>
                        </span>)}
                    </PaletteGrid>
                </div>

            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    labelWidth={165}
                    type={'number'}
                    label={'width'}
                    width={70}
                    min={50}
                    fieldRegister={register('width', {
                        valueAsNumber: true,
                        value: option.width as number,
                        onChange: optionChangeHandler
                    })}
                />
                <InputField
                    labelWidth={165}
                    type={'number'}
                    label={'labelWidth'}
                    width={70}
                    fieldRegister={register('labelWidth', {
                        valueAsNumber: true,
                        value: option.labelWidth as number,
                        onChange: optionChangeHandler
                    })}
                />
                <InputField
                    labelWidth={165}
                    label={'labelColor'}
                    fieldRegister={register('labelColor', {
                        value: option.labelColor,
                        onChange: optionChangeHandler
                    })}
                />
                <Dropdown
                    labelWidth={165}
                    options={['left', 'right', 'center', 'space-between']}
                    selected={option.labelAlign}
                    label={'labelAlign'}
                    onChange={(value: string) => dropDownChangeHandler('labelAlign', value)}
                />

                <div className={'display-flex gap-0p3 align-items-center'}>
                    <div style={{width: '165px', marginLeft: '-0.3rem'}}>
                        <Button
                            className={'white-space-nowrap'}
                            onClick={() => setEnableIcon(!enableIcon)}
                        >
                            {enableIcon ? 'Disable' : 'Enable'} icon
                        </Button>
                    </div>

                    <Dropdown
                        disabled={!enableIcon}
                        options={icons}
                        selected={icon}
                        onChange={(value: any) => setIcon(value)}
                    />
                </div>
            </div>
        </div>
    </div>;
};

export default DemoInputField;