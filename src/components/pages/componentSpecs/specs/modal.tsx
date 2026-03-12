import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { deploymentRoot } from '../../../../App';
import Box from '../../../partials/box';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `const [showModal, setShowModal] = useState(false);

return <>
    <Button onClick={() => setShowModal(true)} disabled={showModal}>Show Modal</Button>
    {>
        showModal && <Modal>
            <h1>Hello, world!</h1>
        </Modal>
    }
</>;`;

const modalData: PropsListProps[] = [
    {
        name: 'closeOnEscKey',
        types: 'boolean',
        values: '',
        description: ['Enable closing by pressing the ESC key.']
    }, {
        name: 'closeOnOutsideClick',
        types: `boolean`,
        values: '',
        description: ['Enable closing by clicking outside the modal.']
    }, {
        name: 'showClose',
        types: 'boolean',
        values: '',
        description: ['Enable a close button in the top right corner of the modal.']
    }, {
        name: 'onClose',
        types: 'Function',
        values: 'e.g. () => alert("Hello, callback!")',
        description: ['Attaches a callback to be called when the modal is closed.', <ul className="m-0"><li>This method takes no arguments and is only intended for whatever cleanup one might need!</li></ul>]
    }, {
        name: 'title',
        types: 'string',
        values: '',
        description: ['Sets a title for the modal.']
    }, {
        name: 'width',
        // eslint-disable-next-line
        types: 'number|`${number}${string}`',
        values: `e.g. 700|'700px'`,
        description: ['Sets a specific width of the modal.']
    }, {
        name: 'maxZIndex',
        types: 'boolean',
        values: ``,
        description: [`Sets the modal's z-index to the highest value possible.`, <ul className="m-0"><li>This is useful when you have multiple modals on the page!</li></ul>]
    }
];

const SpecsModal: FC<SelectedThemeProps> = ({selectedTheme}) => {
    let navigate = useNavigate();

    return <>
        <Box
            width={'100%'}
            border={'label-only'}
            tight={true}
            label={'demo'}
            labelSize={'large'}
            labelPosition={'top-right'}
            backgroundColor={'transparent'}
            labelColor={'magenta'}
            onLabelClick={() => navigate(`${deploymentRoot}/demo/modal`)}
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
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span>
        </h3>
        {propsList(modalData)}
    </>;
};

export default SpecsModal;