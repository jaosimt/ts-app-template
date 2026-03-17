import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Theme } from '../../../../constants';
import { CSSColors } from '../../../../constants/types';
import { createLink, CssColors } from '../../../../utils/ext';
import { getPrimaryColor } from '../../../../utils/themeUtils';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import v from '../../../../styles/variables.module.scss';

const code = `<Drawer>
    <h1>Hello, world!</h1>
</Drawer>
`;

const drawerSpecsData: PropsListProps[] = [
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
        description: ['Sets the width of the drawer.', <ul className="m-0"><li><b>Will be overwritten</b> by <b>'100%'</b> if position is set either <i><b>top</b></i> or <i><b>bottom</b></i>.</li></ul>]
    }, {
        name: 'height',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. '300px'`,
        description: ['Sets the height of the drawer.', <ul className="m-0"><li><b>Will be overwritten</b> by <b>'100%'</b> if position is set either <i><b>left</b></i> or <i><b>right</b></i>.</li></ul>]
    }, {
        name: 'backgroundColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the background color of the drawer']
    }, {
        name: 'onOpen',
        types: 'Function',
        values: `() => void`,
        description: ['Callback function to be called when the drawer is opened']
    }, {
        name: 'onClose',
        types: 'Function',
        values: `() => void`,
        description: ['Callback function to be called when the drawer is closed']
    }, {
        name: 'showOnCreate',
        types: 'boolean',
        values: ``,
        description: [`Set's the initial state of the drawer`]
    }, {
        name: 'handleStyle',
        types: createLink('CSSProperties', '//www.w3schools.com/cssref/index.php'),
        values: ``,
        description: [`Should you need to place the drawer handle somewhere else or change its style`]
    }
];

const SpecsDrawer: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            labelBackgroundColor={(theme === Theme.DARK ? v.baseColorDark : v.baseColor) as CSSColors}
            labelColor={getPrimaryColor(theme)}
            label={'Demo'}
            labelPosition={'top-right'}
            // backgroundColor={'transparent'}
            onLabelClick={() => navigate(`/demo/drawer`)}
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
        <h3 className={'properties display-flex justify-content-space-between align-items-center'}>
            Properties
            <span className={'extends font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span>
        </h3>
        {propsList(drawerSpecsData, theme)}
    </>;
};

export default SpecsDrawer;