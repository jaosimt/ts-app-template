import React, { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../../components/pages/home';

const code = `<Box>
    <div>Box Content</div>
</Box>`;

const boxData: PropsListProps[] = [
    {
        name: 'borderRadius',
        types: 'number|`${number}${string}`',
        values: '',
        description: ['Adds border radius to box\'s border', 'Adds border/2 radius to box\'s title - if enabled!']
    }, {
        name: 'borderColor',
        types: 'HSLString|RGBString|HEXString',
        values: '',
        description: ['Sets the border color of the box']
    }, {
        name: 'boxClassName',
        types: 'string',
        values: '',
        description: ['CSS classes to be spread to the box element']
    }, {
        name: 'title',
        types: 'string',
        values: '',
        description: ['Adds a title to the box']
    }, {
        name: 'titleColor',
        types: 'string',
        values: '',
        description: ['Sets the color of the title - if enabled!']
    }, {
        name: 'width',
        types: 'number|`${number}${string}`',
        values: '',
        description: ['Sets the width of the box']
    }
];

export const BoxComponentSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
    return <>
        <h3 className={'m-0 color-black mb-0p3'}>Box</h3>
        <SyntaxHighlighter
            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
            showLineNumbers={true}
            language="jsx"
            customStyle={{padding: '0.5rem', margin: 0}}
            style={themes[selectedTheme]}
        >
            {code}
        </SyntaxHighlighter>
        <h3 className={'mt-0p5 color-gray mb-0p3 flex align-items-center'}>Properties [<span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span>]
        </h3>
        {propsList(boxData)}
    </>;
};