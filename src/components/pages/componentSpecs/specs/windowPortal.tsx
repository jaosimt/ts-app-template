import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { createLink } from '../../../../utils/ext';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';
import {$baseColor, $baseColorDark, $primaryColor, $primaryColorDark} from "../../../../styles/variables";

const code = `const [showPortal, setShowPortal] = useState(false);

return <>
    <Button onClick={() => setShowPortal(true)} disabled={showPortal}>Show Portal</Button>
    {
        showPortal && <WindowPortal openOnNextScreen={true} onClose={() => setShowPortal(false)}>
            <div style={{padding: '2rem'}}>
                <h1>Hello, New Window!</h1>
            </div>
        </WindowPortal>
    }
</>;`;

const portalData: PropsListProps[] = [
    {
        name: 'children',
        types: createLink('ReactNode', '//reactnative.dev/docs/react-node'),
        values: '',
        description: ['Content to be rendered inside the portal window']
    }, {
        name: 'onClose',
        types: 'Function',
        values: 'e.g. () => alert("portal is closing!")',
        description: [
            'Attaches a callback to be called when the portal window is closing.',
            <ul className="m-0"><li>This method takes no arguments and is only intended for whatever cleanup one might need!</li></ul>
        ]
    }, {
        name: 'openOnNextScreen',
        types: 'boolean',
        values: '',
        description: [
            'Opens the portal window on the next available monitor.',
            <ul className="m-0"><li>Tested working in Brave & Chrome browsers only!</li></ul>
        ]
    }, {
        name: 'title',
        types: 'string',
        values: '',
        description: [<span>Sets the {createLink('document title', '//www.w3schools.com/jsref/prop_doc_title.asp')} of the portal window</span>]
    }
];

const SpecsPortalWindow: FC<SelectedThemeProps> = ({selectedTheme, theme}) => {
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
            onLabelClick={() => navigate(`/demo/window-portal`)}
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
        {propsList(portalData, theme)}
    </>;
};

export default SpecsPortalWindow;