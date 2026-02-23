import React, { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    propsList,
    PropsListProps,
    SelectedThemeProps,
    themes
} from '../../components/pages/home';
import Box from '../../components/partials/box';
import { createLink } from '../../utils/ext';

const codeTS = `interface LoginProps extends React.HTMLAttributes<HTMLInputElement> {
    email: string;
    password: string;
}

const loginValidation = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/, 'Please enter a valid email address!'),
    password: z.string().regex(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~\`!@#$%^&*()_\\-+={[}\\]|\\\\:;"'<,>.?/]).{8,}$/, 'Please enter a strong password!')
}).required();

const {
    register,
    formState: {errors}
} = useForm<LoginProps>(
    resolver: zodResolver(loginValidation)
);

const onsubmit = (data: LoginProps) => {
    console.log(data);
    /* do your stuff here! */
};`;

const codeJSX = `<form onSubmit={handleSubmit(onsubmit)}>
    <InputField
        fieldRegister={register('email')}
        error={errors.email?.message}
    />
    
    <InputField
        fieldRegister={register('password')}
        error={errors.password?.message}
    />
</form>

<Button type={'submit'}>Login</Button>`;

const inputFieldData: PropsListProps[] = [
    {
        name: 'error',
        types: 'string',
        values: '',
        description: ['Holds a message for the error tooltip - if any!']
    }, {
        name: 'fieldRegister',
        types: 'UseFormRegisterReturn',
        values: createLink('useForm.register', '//react-hook-form.com/docs/useform/register'),
        description: ['Allows you to register an input or select element and apply validation rules to React Hook Form']
    }, {
        name: 'icon',
        types: 'IconType',
        values: createLink('react-icons', '//react-icons.github.io/react-icons/'),
        description: ['Adds icon to the input label']
    }, {
        name: 'label',
        types: 'string',
        values: '',
        description: ['Adds label to the input field']
    }, {
        name: 'labelAlign',
        types: 'string',
        values: 'left|center|right',
        description: ['Sets the label alignment']
    }, {
        name: 'labelColor',
        types: 'HSLString|RGBString|HEXString',
        values: '',
        description: ['Sets the color of the label']
    }, {
        name: 'labelWith',
        types: 'number|`${number}${string}`',
        values: '',
        description: ['Sets the width of the label']
    }
];

const InputFieldsProps: FC<SelectedThemeProps> = ({selectedTheme}) => {
    return <>
        <h3 className={'m-0 mt-1 border-top border-color-gray pt-1 color-black mb-0p3 display-flex align-items-end justify-content-space-between'}>
            InputField
        </h3>
        <Box
            border={false}
            tight={true}
            label={'typescript'}
            labelSize={'large'}
            labelPosition={'top-right'}
            backgroundColor={'transparent'}
            labelColor={'magenta'}
        >
            <SyntaxHighlighter
                codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                showLineNumbers={true}
                language="typescript"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {codeTS}
            </SyntaxHighlighter>
        </Box>
        <br/>
        <Box
            border={false}
            tight={true}
            label={'tsx'}
            labelSize={'large'}
            labelPosition={'top-right'}
            backgroundColor={'transparent'}
            labelColor={'magenta'}
        >
            <SyntaxHighlighter
                codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                showLineNumbers={true}
                language="jsx"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {codeJSX}
            </SyntaxHighlighter>
        </Box>
        <h3 className={'mt-0p5 color-gray mb-0p5 flex align-items-center'}>Properties [<span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLInputElement>`}</span>]
        </h3>
        {propsList(inputFieldData)}
    </>;
};

export default InputFieldsProps;