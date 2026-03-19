import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegWindowMaximize } from 'react-icons/fa6';
import { ThemeProp } from '../../../constants/interfaces';
import { isString } from '../../../utils';
import { getBorderColor } from '../../../utils/themeUtils';
import Button from '../../partials/button';
import Checkbox from '../../partials/checkbox';
import InputField from '../../partials/inputField';
import Modal, { ModalProps } from '../../partials/modal';

const DemoModal: FC<{theme: ThemeProp}> = ({theme}) => {
    const {
        register,
    } = useForm();

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [props, setProps] = useState<Partial<ModalProps>>({
        closeOnEscKey: true,
        closeOnOutsideClick: false,
        showClose: false,
        title: undefined,
        width: undefined
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked, type, value} = e.currentTarget;
        const newProps = {...props, [name]: type === 'checkbox' ? checked : value};
        setProps(newProps);
    };

    const noCloseProps = !props.closeOnEscKey && !props.closeOnOutsideClick && !props.showClose;
    const introduction = (() => {
        let str = '';
        if (!isString(props.title, true) && !props.width) return '';
        if (props.title) str += `I am ${props.title}`;
        if (props.width) str += ((str === '' ? 'I am ' : ',') + ` ${props.width}px wide!`);
        else str += '!';

        return str;
    })();

    return <div data-component={'modal-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Modal />`}</h2>

                <Button
                    className={'font-size-large'}
                    align={'space-between'}
                    icon={FaRegWindowMaximize}
                    disabled={showModal}
                    onClick={() => setShowModal(true)}
                >
                    Show Modal
                </Button>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'closeOnEscKey'}
                    name={'closeOnEscKey'}
                    checked={props.closeOnEscKey}
                    onChange={changeHandler}
                />
                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'closeOnOutsideClick'}
                    name={'closeOnOutsideClick'}
                    checked={props.closeOnOutsideClick}
                    onChange={changeHandler}
                />
                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'showClose'}
                    name={'showClose'}
                    checked={props.showClose}
                    onChange={changeHandler}
                />
                <InputField
                    labelWidth={'50%'}
                    label={'title'}
                    fieldRegister={register('title', {
                        value: props.title,
                        onChange: changeHandler
                    })}
                />

                <InputField
                    labelWidth={'50%'}
                    type={'number'}
                    label={'width'}
                    fieldRegister={register('width', {
                        value: props.width,
                        onChange: changeHandler
                    })}
                />
            </div>
        </div>
        {
            showModal && <Modal
                width={props.width}
                closeOnEscKey={props.closeOnEscKey}
                closeOnOutsideClick={props.closeOnOutsideClick}
                title={props.title}
                showClose={props.showClose}
                onClose={() => setShowModal(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h2 className={'display-flex m-0 color-magenta font-monospace flex-direction-column align-items-center'}>Hello,
                        world!</h2>
                    {introduction && <h3 className="m-0 text-align-center">{introduction}</h3>}
                    <div>
                        {
                            noCloseProps && <p style={{borderTop: '1px solid gainsboro', paddingTop: '0.5rem'}}
                                               className={'m-0 color-red font-size-small text-align-center'}>You won't
                                be able to close this modal except reloading your browser<br/>since you haven't selected a
                                prop to do so!</p>
                        }
                        {
                            !noCloseProps && <>
                                <h4 className={'m-0 border-top pt-0p5'}>This modal can be close by:</h4>
                                <ul className={'m-0'} style={{listStyle: 'disc'}}>
                                    {props.showClose && <li>Clicking the close button</li>}
                                    {props.closeOnOutsideClick && <li>Clicking outside the modal</li>}
                                    {props.closeOnEscKey && <li>Pressing the ESC key</li>}
                                </ul>
                            </>
                        }
                    </div>
                    <Button
                        className={'font-size-large'}
                        align={'space-between'}
                        icon={FaRegWindowMaximize}
                        disabled={showModal2}
                        onClick={() => setShowModal2(true)}
                    >
                        Show Modal 2
                    </Button>
                </div>
            </Modal>
        }
        {
            showModal2 && <Modal
                width={props.width}
                closeOnEscKey={props.closeOnEscKey}
                closeOnOutsideClick={props.closeOnOutsideClick}
                title={props.title}
                showClose={props.showClose}
                onClose={() => setShowModal2(false)}
            >
                <div className={'display-flex flex-direction-column gap-1'}>
                    <h2 className={'display-flex m-0 color-magenta font-monospace flex-direction-column align-items-center'}>Hello,
                        world x 2!</h2>
                    {introduction && <h3 className="m-0 text-align-center">{introduction}</h3>}
                    <div>
                        {
                            noCloseProps && <p style={{borderTop: '1px solid gainsboro', paddingTop: '0.5rem'}}
                                               className={'m-0 color-red font-size-small text-align-center'}>You won't
                                be able to close this modal except reloading your browser<br/>since you haven't selected a
                                prop to do so!</p>
                        }
                        {
                            !noCloseProps && <>
                                <h4 className={'m-0 border-top pt-0p5'}>This modal can be close by:</h4>
                                <ul className={'m-0'} style={{listStyle: 'disc'}}>
                                    {props.showClose && <li>Clicking the close button</li>}
                                    {props.closeOnOutsideClick && <li>Clicking outside the modal</li>}
                                    {props.closeOnEscKey && <li>Pressing the ESC key</li>}
                                </ul>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        }
    </div>;
};

export default DemoModal;