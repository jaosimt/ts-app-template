import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Box from '../../../partials/box';
import Modal, { ModalProps } from '../../../partials/modal';
import { propsList, PropsListProps, SelectedThemeProps, themes } from '../index';

const code = `<Modal>
    <h1>Hello, world!</h1>
</Modal>`;

const defaultProps: ModalProps = {
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    showClose: false,
    onClose: undefined,
    title: undefined,
    width: undefined,
};

const ModalComponentSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
    const [show, setShow] = useState(false);
    const [props, setProps] = useState<ModalProps>(defaultProps);
    const [modalMessageList, setModalMessageList] = useState<string[]>([]);



    const onClose = () => setShow(false);

    const modalData: PropsListProps[] = [
        {
            name: 'closeOnEscKey',
            types: 'boolean',
            values: '',
            description: [<div>
                <span>Enable closing by pressing the ESC key.</span>{' '}
                <b className={'link'} onClick={() => {
                    setProps({...props, closeOnEscKey: true, onClose});
                    setModalMessageList(['You can only close me by pressing the ESC key!']);
                    setShow(true);
                }}>Try!</b>
            </div>]
        }, {
            name: 'closeOnOutsideClick',
            types: `boolean`,
            values: '',
            description: [<div>
                <span>Enable closing by clicking outside the modal.</span>{' '}
                <b className={'link'} onClick={() => {
                    setProps({...props, closeOnOutsideClick: true, onClose});
                    setModalMessageList(['You can only close me by clicking outside!']);
                    setShow(true);
                }}>Try!</b>
            </div>]
        }, {
            name: 'showClose',
            types: 'boolean',
            values: '',
            description: [<div>
                <span>Enable a close button in the top right corner of the modal.</span>{' '}
                <b className={'link'} onClick={() => {
                    setProps({...props, showClose: true, onClose});
                    setModalMessageList(['You can only close me by clicking the top-right close icon!']);
                    setShow(true);
                }}>Try!</b>
            </div>]
        }, {
            name: 'onClose',
            types: 'Function',
            values: 'e.g. () => alert("Hello, callback!")',
            description: [<div className={'flex-direction-column'}>
                <span>Attaches a callback to be called when the modal is closed.</span>{' '}
                <span>This method takes no arguments and is only intended for whatever cleanup one might need!{' '}
                    <b className={'link'} onClick={() => {
                        setProps({
                            ...props,
                            closeOnOutsideClick: true,
                            closeOnEscKey: true,
                            showClose: true,
                            onClose: () => {
                                alert('This is an onClose callback method of the modal dialog!')
                                onClose();
                            }
                        });
                        setModalMessageList([
                            `You should be seeing the browser's alert window upon clicking the top-right close icon`,
                            'Or by pressing the ESC key',
                            'Or clicking outside the modal'
                        ]);
                        setShow(true);
                    }}
                    >Try!
                    </b>
                </span>
            </div>]
        }, {
            name: 'title',
            types: 'string',
            values: '',
            description: [<div>
                <span>Sets a title for the modal.</span>{' '}
                <b className={'link'} onClick={() => {
                    setProps({
                        ...props,
                        title: 'Modal Dialog',
                        closeOnOutsideClick: true,
                        closeOnEscKey: true,
                        showClose: true,
                        onClose
                    });
                    setModalMessageList([
                        'You can close this TITLED dialog by clicking the close icon',
                        'Or by pressing the ESC key',
                        'Or clicking outside the modal'
                    ]);
                    setShow(true);
                }}>Try!</b>
            </div>]
        }, {
            name: 'width',
            // eslint-disable-next-line
            types: 'number|`${number}${string}`',
            values: `e.g. 700|'700px'`,
            description: [<div>
                <span>Sets a specific width of the modal.</span>{' '}
                <b className={'link'} onClick={() => {
                    setProps({
                        ...props,
                        title: 'Modal Dialog',
                        closeOnOutsideClick: true,
                        closeOnEscKey: true,
                        showClose: true,
                        width: '70%',
                        onClose
                    });
                    setModalMessageList([
                        'You can close this 70% WIDTH dialog by clicking the close icon',
                        'Or by pressing the ESC key',
                        'Or clicking outside the modal'
                    ]);
                    setShow(true);
                }}>Try!</b>
            </div>]
        }, {
            name: 'maxZIndex',
            types: 'boolean',
            values: ``,
            description: [`Sets the modal's z-index to the highest value possible`, `This is useful when you have multiple modals on the page!`]
        }
    ];

    useEffect(() => {
        if (show) return;
        setProps(defaultProps);
        setModalMessageList([]);
    }, [show]);

    let navigate = useNavigate();

    return <>
        <Box
            border={'label-only'}
            tight={true}
            label={'demo'}
            labelSize={'large'}
            labelPosition={'top-right'}
            backgroundColor={'transparent'}
            labelColor={'magenta'}
            onLabelClick={() => navigate('/demo/modal')}
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
        {show && <Modal
            closeOnEscKey={props.closeOnEscKey}
            closeOnOutsideClick={props.closeOnOutsideClick}
            onClose={props.onClose}
            showClose={props.showClose}
            title={props.title}
            width={props.width}
        >
            <>
                <h1 className={'m-0'}>Hello, world!</h1>
                {
                    modalMessageList.length && <>
                        <p className={'mt-0p5 mb-0p2 color-magenta'}>Except by refreshing or reloading your
                            browser:</p>
                        <ul className={'m-0 font-weight-bold'}>
                            {modalMessageList.map((m, i) => <li className={'color-magenta'} key={i}>{m}</li>)}
                        </ul>
                    </>
                }
            </>
        </Modal>}
    </>;
};

export default ModalComponentSpecs;