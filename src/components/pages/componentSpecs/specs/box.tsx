import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CssColors } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `<Box>
    <h1>Hello World!</h1>
</Box>`;

const boxData: PropsListProps[] = [
    {
        name: 'backgroundColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the background color of the box']
    }, {
        name: 'border',
        types: `boolean|string`,
        values: 'true|false|\'label-only\'',
        description: ['Sets the border of the box', 'If set to \'label-only\', only the label\'s border will be shown!']
    }, {
        name: 'borderRadius',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 7|'7px'`,
        description: ['Adds border radius to box\'s border', 'Adds border/2 radius to box\'s label - if enabled!']
    }, {
        name: 'borderColor',
        types: 'string',
        values: 'All CSS Colors',
        description: ['Sets the border color of the box']
    }, {
        name: 'boxClassName',
        types: 'string',
        values: '',
        description: ['CSS classes to be spread to the box element']
    }, {
        name: 'tight',
        types: 'boolean',
        values: '',
        description: ['Creates a padding-less box', 'Sets the label inside - if enabled!']
    }, {
        name: 'label',
        types: 'string',
        values: '',
        description: ['Adds a label to the box']
    }, {
        name: 'labelColor',
        types: 'string',
        values: 'ALL CSSColors',
        description: ['Sets the color of the label - if enabled!']
    }, {
        name: 'labelBackgroundColor',
        types: 'string',
        values: 'ALL CSSColors',
        description: ['Sets the background color of the label - if enabled!']
    }, {
        name: 'labelPosition',
        types: 'string',
        values: `top-center|top-right|bottom-left|bottom-center|bottom-right`,
        description: ['Sets the location of the label - if enabled!']
    }, {
        name: 'labelSize',
        types: 'string',
        values: `small|medium|large`,
        description: ['Sets the location of the label - if enabled!']
    }, {
        name: 'width',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 700|'700px'`,
        description: ['Sets the width of the box']
    }, {
        name: 'onLabelClick',
        types: 'Function',
        values: 'e.g. () => alert("Hello, callback!")',
        description: ['Attaches a callback to be called when the label is clicked.', 'Useful for opening a link or whatever!']
    }
];

const SpecsBox: FC<SelectedThemeProps> = ({selectedTheme}) => {
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
            onLabelClick={() => navigate('/demo/box')}
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
        {propsList(boxData)}
    </>;
};

export default SpecsBox;