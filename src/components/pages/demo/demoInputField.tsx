import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { HSLString } from '../../../types';
import { generateAnalogousPalette, hslToHex } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import InputField, { InputFieldProps } from '../../partials/inputField';
import Tabs, { TabItemType } from '../../partials/tab';
import * as z from 'zod';
import Login from '../login';
import ToDo from './todo';
import './styles.scss';
import { DiCss3, DiHtml5, DiJsBadge, DiReact } from 'react-icons/di';
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
})

const icons = [{id: 'react', icon: DiReact}, {id: 'html5', icon: DiHtml5}, {id: 'css3', icon: DiCss3}, {
    id: 'javascript',
    icon: DiJsBadge
}, {id: 'typeScript', icon: SiTypescript}];

const getIcon = (id: string) => icons.find(x => x.id === id)?.icon as IconType;

const GridContainer = styled.div`
    display: grid;
    gap: 0 0.5rem;
    grid-template-areas: 
        "red green blue size stepShift"
        "note note note note note";
    grid-template-columns: auto auto auto auto auto 100%;
`;

const Red = styled.div`
    grid-area: red;
`;
const Green = styled.div`
    grid-area: green;
`;
const Blue = styled.div`
    grid-area: blue;
`;
const Size = styled.div`
    grid-area: size;
`;
const StepShift = styled.div`
    grid-area: stepShift;
`;
const Note = styled.i`
    margin-top: 1rem;
    padding-top: 0.3rem;
    border-top: 1px solid #ccc;
    grid-area: note;
`;

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

    const [icon, setIcon] = useState('react');
    const [enableIcon, setEnableIcon] = useState(false);
    const [paletteProps, setPaletteProps] = useState({
        red: 150,
        green: 200,
        blue: 255,
        size: 21,
        stepShift: 21
    });

    const [palette, setPalette] = useState<any>(generateAnalogousPalette({
        r: paletteProps.red,
        g: paletteProps.green,
        b: paletteProps.blue
    }, paletteProps.size, paletteProps.stepShift));

    const [option, setOption] = useState({
        width: 70,
        icon: icons[0].icon,
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

    const optionChangeHandler = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        if (name === 'icon') setIcon(value);
        setOption({...option, [name]: name === 'icon' ? getIcon(value) : value});
    };

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
                    <Box className={'display-flex gap-0p5'} label={'InputField Props'} borderRadius={7}
                         backgroundColor={'#fff'} labelBackgroundColor={'#fff'}>
                        <InputField
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
                            label={'labelColor'}
                            fieldRegister={register('labelColor', {
                                value: option.labelColor,
                                onChange: optionChangeHandler
                            })}
                        />
                        <div className={'display-flex gap-0p3 align-items-center'}>
                            <span>labelAlign</span>
                            <select name={'labelAlign'} value={option.labelAlign} onChange={optionChangeHandler}>
                                {['left', 'right', 'center', 'space-between'].map((t) => (
                                    <option disabled={t === 'space-between' && !enableIcon} key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={'display-flex gap-0p3 align-items-center'}>
                            <Button onClick={() => setEnableIcon(!enableIcon)}>{enableIcon ? 'Disable' : 'Enable'} icon</Button>
                            <select disabled={!enableIcon} name={'icon'} value={icon} onChange={optionChangeHandler}>
                                {icons.map((x: any) => (
                                    <option key={x.id} value={x.id}>{x.id}</option>
                                ))}
                            </select>
                        </div>
                    </Box>
                    <Box className={'display-flex gap-0p5'} label={'InputFields'} borderRadius={7} backgroundColor={'#fff'} labelBackgroundColor={'#fff'}>
                        <form noValidate>
                            <GridContainer className="colored-demo-label">
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
                                <Note className={'color-red font-size-small'}>
                                    * Above label's are background-colored for the purpose of this demo! Otherwise, filters <b>labelAlign</b> & <b>labelWidth</b> won't make much sense.
                                </Note>
                            </GridContainer>
                        </form>
                    </Box>
                    <div className={'display-inline-flex gap-0p1 flex-wrap'} style={{maxWidth: '647px', margin: '0 auto'}}>
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
        type={'plain'}
        width={'100%'}
        color={'red'}
        minContentHeight={'455'}
        data={tabItems}
        moveSelectedOnScroll={true}
        activeItemColor={'#963999'}/>;
};

export default DemoInputField;