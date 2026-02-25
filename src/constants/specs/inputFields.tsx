import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../../components/pages/componentSpecs';
import Box from '../../components/partials/box';
import { createLink, CssColors } from '../../utils/ext';
import './styles.scss';

const codeJSX = `interface LoginProps extends React.HTMLAttributes<HTMLInputElement> {
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
} = useForm<LoginProps>(
    resolver: zodResolver(loginValidation)
)

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
        name: 'fieldRegister',
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
        values: 'left|center|right',
        description: ['Sets the label alignment']
    }, {
        name: 'labelColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the color of the label']
    }, {
        name: 'labelWith',
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
        description: ['']
    }, {
        name: 'width',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the input field']
    }
];

const InputFieldsProps: FC<SelectedThemeProps> = ({selectedTheme}) => {
    return <>
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
        <h3 className={'properties color-gray display-flex justify-content-space-between align-items-center'}>Properties <span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLInputElement>`}</span>
        </h3>
        {propsList(inputFieldData)}
    </>;
};

export default InputFieldsProps;