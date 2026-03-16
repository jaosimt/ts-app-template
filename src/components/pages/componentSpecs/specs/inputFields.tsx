// noinspection JSUnresolvedReference,JSXUnresolvedComponent

import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import './styles.scss';
import { Theme } from '../../../../constants';
import { CSSColors } from '../../../../constants/types';
import { createLink, CssColors } from '../../../../utils/ext';
import { getPrimaryColor } from '../../../../utils/themeUtils';
import { ReactIcon } from '../../../partials';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import v from '../../../../styles/variables.module.scss';

const codeJSX = `interface LoginProps extends HTMLAttributes<HTMLInputElement> {
    email: string;
    password: string;
}

const loginValidation = z.object({
    email: z.string().regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/, 
        'Please enter a valid email address!'
    ),
    password: z.string().regex(
        /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~\`!@#$%^&*()_\\-+={[}\\]|\\\\:;"'<,>.?/]).{8,}$/,
        'Please enter a strong password!'
     )
}).required();

const {
    register,
    formState: {errors}
} = useForm<LoginProps>({
    resolver: zodResolver(loginValidation)
})

const onsubmit = (data: LoginProps) => {
    console.log(data);
    /* do your stuff here! */
};

return <>
    <form onSubmit={handleSubmit(onsubmit)}>
        <InputField
            fieldRegister={register('email')}
            error={errors.email?.message}
        />
        
        <InputField
            fieldRegister={register('password')}
            error={errors.password?.message}
        />
    </form>
    
    <Button type={'submit'}>Login</Button>
</>`;

const inputFieldData: PropsListProps[] = [
    {
        name: 'error',
        types: 'string',
        values: '',
        description: ['Holds a message for the error tooltip - if any!']
    }, {
        name: <Tippy
            content={'Can be opted with bellow alternative props!'}
            placement="right"
            className={'custom-tippy'}>
            <span className={'cursor-pointer'}>fieldRegister <ReactIcon className={'color-magenta'} icon={FaCircleInfo}/></span>
        </Tippy>,
        types: createLink('UseFormRegisterReturn', '//react-hook-form.com/docs/useform/register'),
        values: '',
        description: ['Allows you to register an input or select element and apply validation rules to React Hook Form']
    }, {
        name: 'icon',
        types: createLink('ReactNode', '//reactnative.dev/docs/react-node'),
        values: createLink('react-icons', '//react-icons.github.io/react-icons'),
        description: ['Adds icon to the input label']
    }, {
        name: 'label',
        types: 'string',
        values: '',
        description: ['Adds label to the input field']
    }, {
        name: 'labelAlign',
        types: 'string',
        values: 'left|center|right|space-between',
        description: ['Sets the label alignment.', <ul className="m-0"><li><b><i>space-between</i></b> is intended for label's <b>with icon</b> only!</li></ul>]
    }, {
        name: 'labelColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the color of the label']
    }, {
        name: 'labelWidth',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the label']
    }, {
        name: 'max',
        types: 'number',
        values: '',
        description: ['Sets the maximum value of the input field']
    }, {
        name: 'min',
        types: 'number',
        values: '',
        description: ['Sets the minimum value of the input field']
    }, {
        name: 'placeHolder',
        types: 'string',
        values: '',
        description: ['Sets the placeholder of the input field']
    }, {
        name: 'setRef',
        types: 'Function',
        values: 'e.g. (ref: HTMLInputElement) => void',
        description: ['Allows you to set an access reference to the input field']
    }, {
        name: 'type',
        types: 'string',
        values: createLink('HTMLInputTypes', '//www.w3schools.com/html/html_form_input_types.asp'),
        description: ['Define the kind or behavior of the input element']
    }, {
        name: 'width',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the input field']
    }, {
        name: 'disabled',
        types: 'boolean',
        values: '',
        description: ['Specifies that an input field should be disabled']
    }
];

const fieldRegisterAlternative: PropsListProps[] = [
    {
        name: 'name',
        types: 'string',
        values: '',
        description: ['Sets the name of the input field']
    }, {
        name: 'value',
        types: 'string',
        values: '',
        description: ['Sets the value of the input field']
    }
];

const SpecsInputField: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            labelBackgroundColor={(theme === Theme.DARK ? v.baseColorDark : v.baseColor) as CSSColors}
            labelColor={getPrimaryColor(theme)}
            label={'Demo'}
            labelPosition={'top-right'}
            // backgroundColor={'transparent'}
            onLabelClick={() => navigate(`/demo/input-field`)}
        >
            <SyntaxHighlighter
                wrapLines={true}
                wrapLongLines={true}
                codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                showLineNumbers={true}
                language="jsx"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {codeJSX}
            </SyntaxHighlighter>
        </Box>
        <h3 className={'properties display-flex justify-content-space-between align-items-center'}>Properties <span
            className={'extends font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLInputElement>`}</span>
        </h3>
        {propsList(inputFieldData, theme)}
        <h3 className={'alternate-properties mb-0p5'}>fieldRegister prop alternate</h3>
        {propsList(fieldRegisterAlternative, theme)}
    </>;
};

export default SpecsInputField;