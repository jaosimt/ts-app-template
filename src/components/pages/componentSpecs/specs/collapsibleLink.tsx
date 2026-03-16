import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Theme } from '../../../../constants';
import { CSSColors } from '../../../../constants/types';
import { createLink } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import v from '../../../../styles/variables.module.scss';

// noinspection JSXUnresolvedComponent
const code = `<CollapsibleLink 
    style={{minWidth: 'fit-content'}} 
    linkText={'I am a CollapsibleLink'} 
    details={<>I am a collapsible detail</>}
/>`;

const collapsibleLinkData: PropsListProps[] = [
    {
        name: 'linkText',
        types: 'string',
        values: '',
        description: ['As the name suggests, this is the text that will be displayed as the link.']
    }, {
        name: 'details',
        types: 'any',
        values: <span>could be a string or a {createLink('ReactNode', '//reactnative.dev/docs/react-node')}</span>,
        description: ['Sets the collapsible detail content']
    }, {
        name: 'position',
        types: 'string',
        values: `'fixed'|'relative'|'absolute'`,
        description: ['Sets the behavior of the collapsible detail']
    }
];

const SpecsCollapsibleLink: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            labelBackgroundColor={(theme === Theme.DARK ? v.baseColorDark : v.baseColor) as CSSColors}
            labelColor={(theme === Theme.DARK ? v.primaryColorDark : v.primaryColor) as CSSColors}
            label={'Demo'}
            labelPosition={'top-right'}
            onLabelClick={() => navigate(`/demo/collapsible-link`)}
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
        <h3 className={'properties display-flex justify-content-space-between align-items-center'}>Properties <span
            className={'extends font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span></h3>
        {propsList(collapsibleLinkData, theme)}
    </>;
};

export default SpecsCollapsibleLink;