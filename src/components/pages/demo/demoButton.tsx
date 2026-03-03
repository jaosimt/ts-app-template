import Tippy from '@tippyjs/react';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import Box from '../../partials/box';
import Button, { ButtonProps } from '../../partials/button';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Modal from '../../partials/modal';

const alignOptions = ['left', 'center', 'right', 'space-between'];

const DemoButton: FC = () => {
    const {register} = useForm();

    const [modal, setModal] = useState(false);
    const [icon, setIcon] = useState(false);
    const [props, setProps] = useState<Partial<ButtonProps>>({
        disabled: false,
        align: 'left',
        width: 100,
    });

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['disabled'].includes(name) ? checked : value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});

    return <div data-component={'button-demo'} className={'display-flex gap-1 align-items-center flex-wrap'}>
        <Box
            label={'Button Props'} boxClassName={'mb-1 with-fit-content'}>
            <div className="grid cols-2 no-padding gap-0p5-1">
                <Checkbox labelWidth={95} label={'disabled'} labelPosition={'left'} name={'disabled'}
                          checked={props.disabled} onChange={propsChangeHandler}/>
                <div className="display-flex gap-0p1 align-items-center">
                    <Checkbox labelWidth={95} label={'icon'} labelPosition={'left'} name={'disabled'}
                              checked={icon} onChange={(e: any) => setIcon(e.currentTarget.checked)}/>
                    <Tippy content={'react-icons'} placement="top" className={'custom-tippy'}>
                        <span className={'font-monospace font-size-small color-light-gray'}>(IoIosSave)</span>
                    </Tippy>
                </div>
                <Dropdown
                    options={alignOptions}
                    selected={props.align}
                    label={'align'}
                    labelWidth={95}
                    onChange={(value: string) => dropDownChangeHandler('align', value)}
                />
                <InputField labelWidth={95} label={'width'} type={'number'} width={60}
                            fieldRegister={register('width', {
                                value: props.width,
                                onChange: propsChangeHandler
                            })}/>
            </div>
        </Box>
        <Box>
            <Button
                icon={icon ? IoIosSave : undefined}
                disabled={props.disabled || modal}
                align={props.align}
                width={props.width}
                onClick={() => setModal(true)}
            >Save</Button>
        </Box>
        {
            modal && <Modal onClose={() => setModal(false)} closeOnEscKey={true} closeOnOutsideClick={true} showClose={true} title={'Hello, world!'}>
                <h3 className={'m-0 color-orange'}>You clicked the save button!</h3>
            </Modal>
        }
    </div>;
};

export default DemoButton;