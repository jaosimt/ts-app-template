import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CssColors } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `<Drawer>
    <h1>Hello, world!</h1>
</Drawer>
`;

const toastSpecsData: PropsListProps[] = [
    {
        name: 'position',
        types: 'string',
        values: 'top|left|bottom|right',
        description: ['Specifies the position of the drawer']
    }, {
        name: 'width',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. '300px'`,
        description: ['Sets the width of the drawer.', <span><b>Take Note:</b> This will be overwritten by '100%' if position is either <i>top</i> or <i>bottom</i>.</span>]
    }, {
        name: 'height',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. '300px'`,
        description: ['Sets the height of the drawer.', <span><b>Take Note:</b> This will be overwritten by '100%' if position is either <i>left</i> or <i>right</i>.</span>]
    }, {
        name: 'backgroundColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the background color of the drawer']
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
                language="tsx"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {code}
            </SyntaxHighlighter>
        </Box>
        <h3 className={'properties color-gray display-flex justify-content-space-between align-items-center'}>
            Properties
            <span className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span>
        </h3>
        {propsList(toastSpecsData)}
    </>;
};

export default ToastSpecs;