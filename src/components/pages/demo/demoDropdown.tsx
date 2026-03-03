import Tippy from '@tippyjs/react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaDog, FaReact } from 'react-icons/fa6';
import { GiFox, GiRiver } from 'react-icons/gi';
import { RxSpaceBetweenHorizontally } from 'react-icons/rx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { isNullOrUndefined, isString } from '../../../utils';
import Box from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import Dropdown, { DropdownObjectOptions, DropdownProps } from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const objectOptionsCode = `[
    {label: <span className={'color-red'}>...</span>, value: ..., icon: GiFox},
    {label: <span className={'color-green'}>...</span>, value: ..., icon: FaDog},
    {label: <span className={'color-blue'}>...</span>, value: ..., icon: GiRiver}
]`;
const stringOptionsCode = `[
    'The quick brown fox', 
    'jumps over the lazy dog', 
    'near the bunk of the river'
]`;

const objectOptions = [
    {
        label: <span className={'color-red'}>The quick brown fox</span>,
        value: 'The quick brown fox',
        icon: GiFox
    }, {
        label: <span className={'color-green'}>jumps over the lazy dog</span>,
        value: 'jumps over the lazy dog',
        icon: FaDog
    }, {
        label: <span className={'color-blue'}>near the bunk of the river</span>,
        value: 'near the bunk of the river',
        icon: GiRiver
    }
];

const stringOptions = ['The quick brown fox', 'jumps over the lazy dog', 'near the bunk of the river'];

const alignOptions = [
    {
        label: 'left',
        value: 'left',
        icon: FaAlignLeft
    }, {
        label: 'center',
        value: 'center',
        icon: FaAlignCenter
    }, {
        label: 'right',
        value: 'right',
        icon: FaAlignRight
    }, {
        label: 'space-between',
        value: 'space-between',
        icon: RxSpaceBetweenHorizontally
    }
];

const DemoDropdown: FC = () => {
    const {register} = useForm();

    const [props, setProps] = useState<Partial<DropdownProps>>({
        options: objectOptions,
        selected: objectOptions[0],
        icon: undefined,
        label: 'My Dropdown',
        labelAlign: 'left',
        labelWidth: undefined,
        disabled: false
    });

    const [options, setOptions] = useState({
        asObj: true,
        asStr: false
    });

    useEffect(() => {
        if (options.asObj) setProps({...props, options: objectOptions, selected: objectOptions[0]});
        else setProps({...props, options: stringOptions, selected: stringOptions[0]});
        // eslint-disable-next-line
    }, [options]);

    const propsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.currentTarget;
        if (name === 'icon') {
            setProps({...props, [name]: checked ? FaReact : undefined});
        } else setProps({...props, [name]: ['disabled'].includes(name) ? checked : value});
    };

    const optionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.currentTarget;
        const thisNewOptions = {} as { asObj: boolean, asStr: boolean };
        if (name === 'asObj') {
            thisNewOptions['asObj'] = checked;
            thisNewOptions['asStr'] = !checked;
        } else {
            thisNewOptions['asStr'] = checked;
            thisNewOptions['asObj'] = !checked;
        }

        setOptions(thisNewOptions);
    };

    const labelAlignChangeHandler = (value: any) => setProps({...props, labelAlign: value.value});
    const dropdownChangeHandler = (value: any) => console.log(value);

    return <div data-component={'checkbox-demo'} className={'display-flex gap-1 align-items-center flex-wrap'}>
        <Box label={'Dropdown Props'} boxClassName={'mb-1 with-fit-content'}>
            <div className="grid cols-2 no-padding gap-0p5-1">
                <div>
                    <Checkbox onChange={optionChangeHandler} name={'asObj'} label={'options as DropdownObjectOptions[]'}
                              checked={options.asObj}/>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0}}
                        style={xonokai}
                    >
                        {objectOptionsCode}
                    </SyntaxHighlighter>
                </div>
                <div>
                    <Checkbox onChange={optionChangeHandler} name={'asStr'} label={'options as string[]'}
                              checked={options.asStr}/>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0}}
                        style={xonokai}
                    >
                        {stringOptionsCode}
                    </SyntaxHighlighter>
                </div>
            </div>
            <div className="display-flex gap-0p5-1 mt-0p5">
                <InputField label={'label'}
                            fieldRegister={register('label', {value: props.label, onChange: propsChangeHandler})}/>
                <div className={'display-inline-flex gap-0p1 align-items-center'}>
                    <Checkbox onChange={propsChangeHandler} name={'icon'} label={'icon'}
                              labelPosition={'left'} checked={!isNullOrUndefined(props.icon)}/>
                    <Tippy content={'react-icons'} placement="top" className={'custom-tippy'}>
                        <span className={'font-monospace font-size-small color-light-gray'}>(FaReact)</span>
                    </Tippy>
                </div>
                <InputField label={'labelWidth'} type={'number'} width={60}
                            fieldRegister={register('labelWidth', {
                                value: props.labelWidth,
                                onChange: propsChangeHandler
                            })}/>
                <Dropdown
                    options={alignOptions}
                    selected={alignOptions[0]}
                    label={'labelAlign'}
                    disabled={!isString(props.label)}
                    onChange={labelAlignChangeHandler}
                />
                <Checkbox label={'disabled'} labelPosition={'left'} name={'disabled'}
                          checked={props.disabled} onChange={propsChangeHandler}/>

            </div>
        </Box>
        <Box className={'display-inline-flex width-fit-content'}>
            <Dropdown
                options={props.options as string[] | DropdownObjectOptions[]}
                selected={props.selected}
                icon={props.icon}
                label={props.label}
                labelAlign={props.labelAlign}
                labelWidth={props.labelWidth}
                disabled={props.disabled}
                onChange={dropdownChangeHandler}
            />
        </Box>
    </div>;
};

export default DemoDropdown;