import Tippy from '@tippyjs/react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaDog, FaReact } from 'react-icons/fa6';
import { GiFox, GiRiver } from 'react-icons/gi';
import { LiaPoopSolid } from 'react-icons/lia';
import { RxSpaceBetweenHorizontally } from 'react-icons/rx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { isNullOrUndefined, isString } from '../../../utils';
import Box from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import Dropdown, { DropdownObjectOptions, DropdownProps } from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const objectOptionsCode = `[
    {label: <span className={'color-cyan'}>The quick brown fox</span>, value: 'The quick brown fox', icon: GiFox},
    {label: <span className={'color-magenta'}>jumps over the lazy dog</span>, value: 'jumps over the lazy dog', icon: FaDog},
    {label: <span className={'color-yellow'}>near the bunk of the river</span>, value: 'near the bunk of the river', icon: GiRiver},
    {label: <span className={'color-black'}>and I wonder who cares!</span>, value: 'and I wonder who cares!', icon: LiaPoopSolid}
]`;

const stringOptionsCode = `[
    'The quick brown fox', 
    'jumps over the lazy dog', 
    'near the bunk of the river',
    'and I wonder who cares!'
]`;

const disablePredicateCode = `(o: string) => {
    return o === 'and I wonder who cares!'
}`;
const disablePredicateCodeObject = `(o: DropdownObjectOptions) => {
    return o.value === 'and I wonder who cares!'   
}`;

const objectOptions = [
    {
        label: <span className={'color-cyan'}>The quick brown fox</span>,
        value: 'The quick brown fox',
        icon: GiFox
    }, {
        label: <span className={'color-magenta'}>jumps over the lazy dog</span>,
        value: 'jumps over the lazy dog',
        icon: FaDog
    }, {
        label: <span className={'color-yellow'}>near the bunk of the river</span>,
        value: 'near the bunk of the river',
        icon: GiRiver
    }, {
        label: <span className={'color-black'}>and I wonder who cares!</span>,
        value: 'and I wonder who cares!',
        icon: LiaPoopSolid
    }
];

const stringOptions = ['The quick brown fox', 'jumps over the lazy dog', 'near the bunk of the river', 'and I wonder who cares!'];

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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        
        > * {
            width: 100%;
        }
    }
`;

const DemoDropdown: FC<{ theme: ThemeProp }> = ({theme}) => {
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

    const [selected, setSelected] = useState(objectOptions[0]);

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
    const dropdownChangeHandler = (value: any) => setSelected(value);
    const selectedTheme = theme === Theme.DARK ? oneLight : oneDark;
    const themedBoxBorderColor = theme === Theme.LIGHT ? '#000' : '#ccc';

    return <div data-component={'checkbox-demo'} className={'display-flex align-items-center flex-direction-column gap-0p5-1'}>
        <Box label={'Dropdown Props'} className={'justify-self-center'} borderColor={themedBoxBorderColor}>
            <div className={'display-flex justify-content-center flex-wrap gap-0p5-1'}>
                <div>
                    <div className={'display-flex align-items-center gap-0p5'}>
                        <Checkbox onChange={optionChangeHandler} name={'asObj'} label={'options'}
                                  checked={options.asObj}/>
                        <span className={'font-monospace font-size-small color-magenta mt-0p1'}>as DropdownObjectOptions[]</span>
                    </div>
                    <Box tight={true} width={420} borderColor={themedBoxBorderColor}>
                        <SyntaxHighlighter
                            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                            showLineNumbers={true}
                            language="js"
                            customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                            style={selectedTheme}
                        >
                            {objectOptionsCode}
                        </SyntaxHighlighter>
                    </Box>
                </div>
                <div>
                    <div className={'display-flex align-items-center gap-0p5'}>
                        <Checkbox onChange={optionChangeHandler} name={'asStr'} label={'options'}
                                  checked={options.asStr}/>
                        <span className={'font-monospace font-size-small color-magenta mt-0p1'}>as string[]</span>
                    </div>

                    <Box tight={true} width={420} borderColor={themedBoxBorderColor}>
                        <SyntaxHighlighter
                            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                            showLineNumbers={true}
                            language="js"
                            customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                            style={selectedTheme}
                        >
                            {stringOptionsCode}
                        </SyntaxHighlighter>
                    </Box>
                </div>
            </div>
            <div className="display-flex flex-wrap gap-0p5-1 mt-0p5 justify-content-center">
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
            <div className={'display-flex justify-content-center mt-0p5'}>
                <Box tight={true} borderColor={themedBoxBorderColor} label={'disablePredicate'} labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {options.asObj ? disablePredicateCodeObject : disablePredicateCode}
                    </SyntaxHighlighter>
                </Box>
            </div>
        </Box>
        <Container>
            <Box width={395} label={'Dropdown'} className={'justify-self-center'}
                 contentClassName={'display-flex justify-content-center flex-wrap gap-0p5-1'} borderColor={themedBoxBorderColor}>
                <div className="pb-0p5">
                    <Dropdown
                        options={props.options as string[] | DropdownObjectOptions[]}
                        selected={props.selected}
                        icon={props.icon}
                        label={props.label}
                        labelAlign={props.labelAlign}
                        labelWidth={props.labelWidth}
                        disabled={props.disabled}
                        disablePredicate={(o: string|DropdownObjectOptions) => typeof o === 'object' ? o.value === 'and I wonder who cares!'  : o === 'and I wonder who cares!'}
                        onChange={dropdownChangeHandler}
                    />
                </div>
            </Box>
            <Box width={395} label={'selected'} className={'justify-self-center'}
                 contentClassName={'display-flex justify-content-center flex-wrap gap-0p5-1'} borderColor={themedBoxBorderColor}>
                <pre className={'pb-0p5'}>
                    {JSON.stringify(selected, (k, v) => k.startsWith('_') ? undefined : v, 2)}
                </pre>
            </Box>
        </Container>
    </div>;
};

export default DemoDropdown;