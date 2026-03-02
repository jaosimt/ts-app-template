import { FC } from 'react';
import { Link, useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CssColors } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `const tabItems: TabItemType[] = [
    {
        name: 'Tab 1',
        content: <h1>Tab One Content</h1>
    }, {
        name: 'Tab 2',
        content: <h1>Tab Two Content</h1>
    }, {
        name: 'Tab 3',
        content: <h1>Tab Three Content</h1>
    }
];

return <>
    <Tabs data={tabItems}/>
</>`;

const tabData: PropsListProps[] = [
    {
        name: 'data',
        types: 'TabItemType[]',
        values: '',
        description: ['Sets the active tab item']
    }, {
        name: 'activeItemColor',
        types: 'string',
        values: CssColors,
        description: ['Sets the color of the active tab item']
    }, {
        name: 'contentPadding',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 7|'7px'`,
        description: ['Sets the padding of the tab content']
    }, {
        name: 'minContentHeight',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 7|'7px'`,
        description: ['Sets a minimum height for the tab content']
    }, {
        name: 'moveSelectedOnScroll',
        types: 'boolean',
        values: '',
        description: ['Changes active tab selection following the left/right tab item nav click.', 'Only if tab items are longer than the actual tab\'s width and tab items are scrolled off view!']
    }, {
        name: 'type',
        types: 'string',
        values: 'boxed-content|boxed|plain',
        description: [
            <p className={'m-0'}>Set the type of <Link to={{ pathname: "/demo/tabs"}}>&lt;Tab /&gt;</Link> to be rendered.</p>,
            <>
                <ul className={'m-0'}>
                    <li><i>boxed</i> - Renders Tab with border and background colored tab items.</li>
                    <li><i>boxed-content</i> - Bordered content area extending to the active tab item.</li>
                    <li><i>plain</i> - No borders. Only a horizontal line separating tab items and content.</li>
                </ul>
            </>
        ]
    }, {
        name: 'onTabChange',
        types: 'Function',
        values: '',
        description: ['Callback function on tab selection changes']
    }, {
        name: 'activeTab',
        types: 'string',
        values: '',
        description: ['Set initial active tab item']
    }
];

const TabSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
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
            onLabelClick={() => navigate('/demo/tabs')}
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
        <h3 className={'properties color-gray display-flex justify-content-space-between align-items-center'}>Properties</h3>
        {propsList(tabData)}
    </>;
};

export default TabSpecs;