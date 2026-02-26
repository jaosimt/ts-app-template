import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { createLink } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

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

const ButtonComponentSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
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
            onLabelClick={() => navigate('/demo/button')}
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

export default ButtonComponentSpecs;