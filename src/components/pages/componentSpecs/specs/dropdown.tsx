import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { createLink } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import {$baseColor, $baseColorDark, $primaryColor, $primaryColorDark} from "../../../../styles/variables";

const code = `const options = ['Option 1', 'Option 2', 'Option 3'];
const [selected, setSelected] = useState(options[0]);

return <>
    <Dropdown
        options={options}
        selected={selected}
        onChange={(value: string) => setSelected(value)}
    />
</>`;

const dropdownSpecsData: PropsListProps[] = [
    {
        name: 'options',
        types: 'string[]|DropdownObjectOptions[]',
        values: '[string]|[{label:ReactNode, value:string, icon:ReactNode}]',
        description: ['Dropdown options']
    }, {
        name: 'selected',
        types: 'string|DropdownObjectOptions',
        values: 'Any from your options !',
        description: [
            'Sets the selected dropdown option.',
            <ul className="m-0">
                <li>Just remember, if your options is <b>string[]</b>, then this is a string.</li>
                <li>Otherwise, this is an object of custom type <b>DropdownObjectOptions</b>!</li>
            </ul>
        ]
    }, {
        name: 'name',
        types: 'string',
        values: '',
        description: ['Sets the name of the dropdown element']
    }, {
        name: 'label',
        types: 'string',
        values: '',
        description: ['Sets the label of the dropdown']
    }, {
        name: 'icon',
        types: createLink('ReactNode', '//reactnative.dev/docs/react-node'),
        values: createLink('react-icons', '//react-icons.github.io/react-icons'),
        description: ['Adds icon to the dropdown label']
    }, {
        name: 'labelWidth',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the label.', <ul className="m-0"><li>Useful for aligning the label with other elements!</li></ul>]
    }, {
        name: 'maxDropdownHeight',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. 300|'300px'`,
        description: ['Sets the max height of the dropdown menu']
    }, {
        name: 'labelAlign',
        types: 'string',
        values: 'left|right|center|space-between',
        description: ['Sets the position of the label relative to labelWidth']
    }, {
        name: 'onChange',
        types: 'Function',
        values: '',
        description: ['Dropdown\'s onChange callback function']
    }, {
        name: 'disabled',
        types: 'boolean',
        values: '',
        description: ['Sets the usability state of the dropdown']
    }
];

const SpecsDropdown: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
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
            onLabelClick={() => navigate(`/demo/dropdown`)}
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
        {propsList(dropdownSpecsData, theme)}
    </>;
};

export default SpecsDropdown;