import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `import { toast } from './components/partials/slices/toast'; /* assuming the call is initiated inside src */

...

const dispatch = useAppDispatch();

dispatch(toast({message: 'Hello, world!'})
`;

const toastSpecsData: PropsListProps[] = [
    {
        name: 'id',
        types: 'string',
        values: <i>randomUUID will be automatically supplied by default</i>,
        description: ['Specifies id of the toast message']
    }, {
        name: 'message',
        types: 'string',
        values: '',
        description: ['Sets the toast message to be displayed']
    }, {
        name: 'options',
        types: 'ToastOptions',
        values: <pre className={'m-0 font-monospace font-size-small'}>{JSON.stringify({type: 'string', theme: 'string', duration: 'number'}, null, 2)}</pre>,
        description: ['Sets the toast options']
    }
];

const toastOptions: PropsListProps[] = [
   {
        name: 'type',
        types: 'string',
        values: 'info|success|warning|error',
        description: ['Sets the type of the toast message']
    }, {
        name: 'theme',
        types: 'string',
        values: 'default|vibrant',
        description: ['Sets the toast message theme']
    }, {
        name: 'duration',
        types: <span>number <i>(in milliseconds)</i></span>,
        values: 'e.g. 5000',
        description: ['Sets the display duration of the toast message']
    }
];

const ToastSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            border={'label-only'}
            tight={true}
            label={'Demo'}
            labelSize={'large'}
            labelPosition={'top-right'}
            backgroundColor={'transparent'}
            labelColor={'magenta'}
            onLabelClick={() => navigate('/demo/toast')}
        >
            <SyntaxHighlighter
                codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                showLineNumbers={true}
                language="ts"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {code}
            </SyntaxHighlighter>
        </Box>
        <h3 className={'properties color-gray display-flex justify-content-space-between align-items-center'}>
            Properties
        </h3>
        {propsList(toastSpecsData)}
        <h3 className={'mb-0p5 color-gray display-flex justify-content-space-between align-items-center'}>
            options
        </h3>
        {propsList(toastOptions)}
    </>;
};

export default ToastSpecs;