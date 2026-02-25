import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    propsList,
    PropsListProps,
    SelectedThemeProps,
    themes
} from '../../components/pages/home';
import Box from '../../components/partials/box';
import { createLink } from '../../utils/ext';

const code = `<Button>
    Submit
</Button>`;

const buttonData: PropsListProps[] = [
    {
        name: 'align',
        types: 'string',
        values: 'left|center|right|space-between',
        description: ['Sets the alignment of button icon and label alike']
    }, {
        name: 'disabled',
        types: 'boolean',
        values: '',
        description: ['Specifies that a button should be disabled']
    }, {
        name: 'icon',
        types: createLink('ReactNode', '//reactnative.dev/docs/react-node'),
        values: createLink('react-icons', '//react-icons.github.io/react-icons'),
        description: ['Adds icon to the button']
    }, {
        name: 'iconClassName',
        types: 'string',
        values: '',
        description: ['CSS classes to be spread to the button element']
    }, {
        name: 'type',
        types: 'string',
        values: 'button|submit|reset',
        description: ['Specifies the type of the button']
    }, {
        name: 'width',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the button']
    }
];

export const ButtonComponentSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
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
                language="tsx"
                customStyle={{padding: '0.5rem', margin: 0}}
                style={themes[selectedTheme]}
            >
                {code}
            </SyntaxHighlighter>
        </Box>
        <h3 className={'properties color-gray display-flex justify-content-space-between align-items-center'}>Properties <span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLButtonElement>`}</span></h3>
        {propsList(buttonData)}
    </>;
};