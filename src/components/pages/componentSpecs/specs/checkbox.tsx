import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Theme } from '../../../../constants';
import { CSSColors } from '../../../../constants/types';
import { getPrimaryColor } from '../../../../utils/themeUtils';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import v from '../../../../styles/variables.module.scss';

// noinspection JSXUnresolvedComponent
const code = `<Checkbox 
    name={'myCheckbox'} 
    checked={true} 
/>`;

const CheckboxSpecsData: PropsListProps[] = [
    {
        name: 'name',
        types: 'string',
        values: '',
        description: ['Sets the name of the checkbox']
    }, {
        name: 'checked',
        types: 'boolean',
        values: '',
        description: ['Sets the state of the checkbox']
    }, {
        name: 'label',
        types: 'string',
        values: '',
        description: ['Sets the label of the checkbox.', <ul className="m-0"><li>Defaults to the required prop <b>name</b> if none is provided!</li></ul>]
    }, {
        name: 'labelWidth',
        // eslint-disable-next-line no-template-curly-in-string
        types: 'number|`${number}${string}`',
        values: `e.g. 70|'70px'`,
        description: ['Sets the width of the label.', <ul className="m-0"><li>Useful for aligning the label with other elements!</li></ul>]
    }, {
        name: 'disabled',
        types: 'boolean',
        values: '',
        description: ['Sets the usability state of the checkbox']
    }, {
        name: 'className',
        types: 'string',
        values: '',
        description: ['Class names to be spread to the checkbox container']
    }, {
        name: 'labelPosition',
        types: 'string',
        values: 'left|right',
        description: ['Sets the position of the label relative to the checkbox']
    }
];

const SpecsCheckbox: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
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
            onLabelClick={() => navigate(`/demo/checkbox`)}
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
            className={'extends font-monospace font-size-smaller'}>extends InputHTMLAttributes{`<HTMLInputElement>`}</span></h3>
        {propsList(CheckboxSpecsData, theme)}
    </>;
};

export default SpecsCheckbox;