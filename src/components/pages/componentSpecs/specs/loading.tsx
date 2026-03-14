import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Theme } from '../../../../constants';
import { CssColors } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import {$baseColor, $baseColorDark, $primaryColor, $primaryColorDark} from "../../../../styles/variables";

const code = `<Loading/>`;

const loadingData: PropsListProps[] = [
    {
        name: 'borderWidth',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. 700|'700px'`,
        description: ['Sets the border width of the loading box']
    }, {
        name: 'borderColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the border color of the loading box']
    }, {
        name: 'padding',
        types: 'boolean',
        values: '',
        description: ['Add/remove padding of the loading box']
    }, {
        name: 'position',
        types: 'string',
        values: 'fixed|absolute',
        description: [
            'Defines where the loading box will be centered from.',
            <ul className="m-0">
                <li><i>fixed</i> - loading will be centered in the entire document.</li>
                <li><i>absolute</i> - loading will be centered in the parent element.</li>
            </ul>
        ]
    }, {
        name: 'size',
        types: 'number',
        values: '',
        description: ['Sets the size in pixel of the loading spinner']
    }, {
        name: 'color',
        types: 'string',
        values: 'CssColors',
        description: ['Sets the color of the loading spinner']
    }, {
        name: 'backgroundColor',
        types: 'string',
        values: 'CssColors',
        description: ['Sets the background color of the loading box']
    }, {
        name: 'topText',
        types: 'string',
        values: '',
        description: ['Sets the text to be displayed above the loading spinner']
    }, {
        name: 'bottomText',
        types: 'string',
        values: '',
        description: ['Sets the text to be displayed bellow loading spinner']
    }, {
        name: 'boxShadow',
        types: 'boolean',
        values: '',
        description: ['Add/remove shadow around the loading box']
    }
];

const SpecsLoading: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            labelBackgroundColor={theme === Theme.DARK ? $baseColorDark : $baseColor}
            labelColor={theme === Theme.DARK ? $primaryColorDark : $primaryColor}
            label={'Demo'}
            labelPosition={'top-right'}
            // backgroundColor={'transparent'}
            onLabelClick={() => navigate(`/demo/loading`)}
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
        <h3 className={'properties display-flex justify-content-space-between align-items-center'}>Properties</h3>
        {propsList(loadingData, theme)}
    </>;
};

export default SpecsLoading;