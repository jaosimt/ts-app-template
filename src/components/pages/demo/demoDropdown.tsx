import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaDog, FaReact } from 'react-icons/fa6';
import { GiFox, GiRiver } from 'react-icons/gi';
import { LiaPoopSolid } from 'react-icons/lia';
import { RxSpaceBetweenHorizontally } from 'react-icons/rx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { isNullOrUndefined, isString } from '../../../utils';
import { getAccentColor, getBorderColor, getTextColor } from '../../../utils/themeUtils';
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

const disablePredicateCode = `(o: string) => 
o === 'and I wonder who cares!'`;

const disablePredicateCodeObject = `(o: DropdownObjectOptions) => 
o.value === 'and I wonder who cares!'`;

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
    const themedBoxBorderColor = theme === Theme.REACT ? '#000' : '#ccc';

    return <div data-component={'dropdown-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'}
                    style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Dropdown />`}</h2>

                <div className="position-relative" style={{height: '50px'}}>
                    <Dropdown
                        className={'position-absolute'}
                        options={props.options as string[] | DropdownObjectOptions[]}
                        selected={props.selected}
                        icon={props.icon}
                        label={props.label}
                        labelAlign={props.labelAlign}
                        labelWidth={props.labelWidth}
                        disabled={props.disabled}
                        disablePredicate={(o: string | DropdownObjectOptions) => typeof o === 'object' ? o.value === 'and I wonder who cares!' : o === 'and I wonder who cares!'}
                        onChange={dropdownChangeHandler}
                    />
                </div>
                <div className="position-relative">
                    <Box
                        backgroundColor={theme === Theme.DARK ? '#5e5e5e' : '#ccc'}
                        className={'position-absolute'}
                        width={'100%'}
                        label={'selected'}
                        labelColor={getTextColor(theme)}
                        tight={true}
                        border={'label-only'}
                        labelBackgroundColor={getAccentColor(theme)}
                        labelPosition={'top-right'}
                    >
                    <pre className={'p-1'}>
                        {JSON.stringify(selected, (k, v) => {
                            if (k.startsWith('_')) return undefined;
                            return v;
                        }, 2)}
                    </pre>
                    </Box>
                </div>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    labelWidth={'50%'}
                    label={'label'}
                    fieldRegister={register('label', {value: props.label, onChange: propsChangeHandler})}/>
                <Checkbox
                    className={'width-100p'}
                    labelWidth={'50%'}
                    onChange={propsChangeHandler}
                    name={'icon'}
                    label={'icon'}
                    labelPosition={'left'}
                    checked={!isNullOrUndefined(props.icon)}/>
                <InputField
                    labelWidth={'50%'}
                    label={'labelWidth'} type={'number'}
                    width={60}
                    fieldRegister={register('labelWidth', {
                        value: props.labelWidth,
                        onChange: propsChangeHandler
                    })}/>
                <Dropdown
                    labelWidth={'50%'}
                    options={alignOptions}
                    selected={alignOptions[0]}
                    label={'labelAlign'}
                    disabled={!isString(props.label)}
                    onChange={labelAlignChangeHandler}
                />
                <Checkbox
                    className={'width-100p'}
                    labelWidth={'50%'}
                    label={'disabled'}
                    labelPosition={'left'}
                    name={'disabled'}
                    checked={props.disabled}
                    onChange={propsChangeHandler}/>

                <div>
                    <div className={'display-flex align-items-center gap-0p5'}>
                        <Checkbox
                            onChange={optionChangeHandler}
                            name={'asObj'}
                            label={'options'}
                            checked={options.asObj}/>
                        <span className={'font-monospace font-size-small color-magenta mt-0p1'}>as DropdownObjectOptions[]</span>
                    </div>
                    <Box
                        tight={true}
                        width={'100%'}
                        borderColor={themedBoxBorderColor}>
                        <SyntaxHighlighter
                            codeTagProps={{
                                style: {
                                    margin: 0,
                                    background: 'transparent',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }
                            }}
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
                        <Checkbox
                            onChange={optionChangeHandler}
                            name={'asStr'}
                            label={'options'}
                            checked={options.asStr}/>
                        <span className={'font-monospace font-size-small color-magenta mt-0p1'}>as string[]</span>
                    </div>

                    <Box
                        tight={true}
                        width={'100%'}
                        borderColor={themedBoxBorderColor}
                    >
                        <SyntaxHighlighter
                            codeTagProps={{
                                style: {
                                    margin: 0,
                                    background: 'transparent',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }
                            }}
                            showLineNumbers={true}
                            language="js"
                            customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                            style={selectedTheme}
                        >
                            {stringOptionsCode}
                        </SyntaxHighlighter>
                    </Box>

                    <div className={'mt-0p5'}>
                        disablePredicate
                    </div>
                    <Box
                        tight={true}
                        width={'100%'}
                        borderColor={themedBoxBorderColor}>
                        <SyntaxHighlighter
                            codeTagProps={{
                                style: {
                                    margin: 0,
                                    background: 'transparent',
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }
                            }}
                            showLineNumbers={true}
                            language="js"
                            customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                            style={selectedTheme}
                        >
                            {options.asObj ? disablePredicateCodeObject : disablePredicateCode}
                        </SyntaxHighlighter>
                    </Box>
                </div>
            </div>
        </div>
    </div>;
};

export default DemoDropdown;