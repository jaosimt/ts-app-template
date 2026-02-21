import React, { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SelectedThemeProps, themes } from '../../components/pages/home';

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

<Button type={'submit'}>Login</Button>
`;

export const InputFieldsProps: FC<SelectedThemeProps> = ({selectedTheme}) => {
    return <>
        <h4 className={'m-0 mt-1 border-top pt-1 color-black mb-0p3 display-flex align-items-end justify-content-space-between'}>
            InputField
            <strong className="m-0 color-magenta">typescript</strong>
        </h4>
        <SyntaxHighlighter
            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
            showLineNumbers={true}
            language="typescript"
            customStyle={{padding: '0.5rem', margin: 0}}
            style={themes[selectedTheme]}
        >
            {codeTS}
        </SyntaxHighlighter>
        <h4 className={'m-0 border-top pt-1 color-black mb-0p3 display-flex align-items-end justify-content-space-between'}>
            &nbsp;
            <strong className="m-0 color-magenta">tsx</strong>
        </h4>
        <SyntaxHighlighter
            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
            showLineNumbers={true}
            language="jsx"
            customStyle={{padding: '0.5rem', margin: 0}}
            style={themes[selectedTheme]}
        >
            {codeJSX}
        </SyntaxHighlighter>
        <h4 className={'mt-1 color-gray mb-0p3 flex align-items-center'}>Properties [<span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLInputElement>`}</span>]
        </h4>
        <ul className={'m-0 color-black font-monospace font-size-smaller line-height-normal'}>
        </ul>
    </>;
};