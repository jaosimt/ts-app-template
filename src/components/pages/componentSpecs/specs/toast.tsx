import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { createLink } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import {$baseColor, $baseColorDark, $primaryColor, $primaryColorDark} from "../../../../styles/variables";

const code = `import { toast } from './components/partials/toast'; /* assuming the call is initiated inside src */

...

<Button onClick={() => toast({message: 'Hello, world!'};}></Button>
`;

const SpecsToastData: PropsListProps[] = [
    {
        name: 'id',
        types: 'string',
        values: <i>randomUUID will be automatically supplied by default</i>,
        description: ['Specifies id of the toast message']
    }, {
        name: 'message',
        types: <span>string|{createLink('ReactNode', '//reactnative.dev/docs/react-node')}</span>,
        values: '',
        description: ['Sets the toast message to be displayed']
    }, {
        name: 'options',
        types: 'ToastOptions',
        values: <pre className={'m-0 font-monospace font-size-small'}>{
            JSON.stringify({
                type: 'string',
                position: 'string',
                theme: 'string',
                duration: 'number',
                // eslint-disable-next-line no-template-curly-in-string
                width: 'number|`${number}${string}`',
                omitIcon: 'boolean'
            }, null, 2)
        }</pre>,
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
        name: 'position',
        types: 'string',
        values: 'top-right|top-left|bottom-right|bottom-left',
        description: ['Sets the position of the toast message']
    }, {
        name: 'theme',
        types: 'string',
        values: 'outlined|filled',
        description: ['Sets the toast message theme']
    }, {
        name: 'duration',
        types: <span>number <i>(in milliseconds)</i></span>,
        values: 'e.g. 5000',
        description: ['Sets the display duration of the toast message.',<ul className={'m-0'}><li>Disregarded when toast <b>type</b> is set to <b>error</b>!</li></ul>]
    }, {
        name: 'omitIcon',
        types: 'boolean',
        values: '',
        description: ['Show/Hide Toast Icon']
    }, {
        name: 'width',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. 200|'200px'`,
        description: [`Sets the toast message's container width.`, <ul className="m-0">
            <li>A couple pixels are automatically added if <b>omitIcon</b> is set to <b>true</b> to match the width's!</li>
            <li>Except of course if toasts messages are set with different widths!</li>
        </ul>]
    }
];

const SpecsToast: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            labelBackgroundColor={theme === 'dark' as any ? $baseColorDark : $baseColor}
            labelColor={theme === 'dark' as any ? $primaryColorDark : $primaryColor}
            label={'Demo'}
            labelPosition={'top-right'}
            // backgroundColor={'transparent'}
            onLabelClick={() => navigate(`/demo/toast`)}
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
        <h3 className={'properties display-flex justify-content-space-between align-items-center'}>
            Properties
        </h3>
        {propsList(SpecsToastData, theme)}
        <h3 className={'mb-0p5 display-flex justify-content-space-between align-items-center'}>
            options
        </h3>
        {propsList(toastOptions, theme)}
    </>;
};

export default SpecsToast;