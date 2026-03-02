import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegWindowMaximize } from 'react-icons/fa6';
import { isString } from '../../../utils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Checkbox from '../../partials/checkbox';
import InputField from '../../partials/inputField';
import Modal, { ModalProps } from '../../partials/modal';

const ModalDemo: FC = () => {
    const {
        register,
    } = useForm();

    const [showModal, setShowModal] = useState(false);
    const [props, setProps] = useState<Partial<ModalProps>>({
        closeOnEscKey: true,
        closeOnOutsideClick: false,
        showClose: false,
        title: undefined,
        width: 500
    });

    useEffect(() => {
        console.log(props);
    }, [props]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, checked, type, value} = e.currentTarget;

        const newProps = {...props, [name]: type === 'checkbox' ? checked : value};

        console.log('name:', name, ' checked:', checked, ' newProps:', newProps);
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

    return <div data-component={'modal-demo'} style={{height: '100%', width: '100%'}}>
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
                </div>
            </Modal>
        }

        <div className="display-inline-flex flex-direction-column gap-1">
            <Box
                className={'display-flex gap-0p3 flex-direction-column'}
                label={'Modal Props'}
                borderRadius={4}
            >
                <div>
                    <Checkbox
                        name={'closeOnEscKey'}
                        checked={props.closeOnEscKey}
                        onChange={changeHandler}
                    />
                    <Checkbox
                        name={'closeOnOutsideClick'}
                        checked={props.closeOnOutsideClick}
                        onChange={changeHandler}
                    />
                    <Checkbox
                        name={'showClose'}
                        checked={props.showClose}
                        onChange={changeHandler}
                    />
                </div>
                <div className={'display-inline-flex gap-0p5'}>
                    <InputField
                        label={'title'}
                        fieldRegister={register('title', {
                            value: props.title,
                            onChange: changeHandler
                        })}
                    />

                    <InputField
                        type={'number'}
                        label={'width'}
                        fieldRegister={register('width', {
                            value: props.width,
                            onChange: changeHandler
                        })}
                    />
                </div>
            </Box>
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
    </div>;
};

export default ModalDemo;