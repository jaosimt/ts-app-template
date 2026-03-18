import Tippy from '@tippyjs/react';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { ThemeProp } from '../../../constants/interfaces';
import { getBorderColor, getSecondaryBackgroundColor } from '../../../utils/themeUtils';
import Button, { ButtonProps } from '../../partials/button';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Modal from '../../partials/modal';

const alignOptions = ['left', 'center', 'right', 'space-between'];

const DemoButton: FC<{theme: ThemeProp}> = ({theme}) => {
    const {register} = useForm();

    const buttonTextRef = useRef('');

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

    return <div data-component={'button-demo'} className={'height-100p'}>
        <div className="display-flex gap-1 height-100p">
            <div
                style={{
                    width: 'calc(100% - 370px)',
                    overflowY: 'auto',
                    backgroundColor: getSecondaryBackgroundColor(theme),
                    borderRadius: '0.4rem',
                    padding: '1rem 2rem'
                }}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Button />`}</h2>
                <Button
                    icon={icon ? IoIosSave : undefined}
                    disabled={props.disabled || modal}
                    align={props.align}
                    width={props.width}
                    onClick={() => {
                        buttonTextRef.current = 'primary';
                        setModal(true)
                    }}
                >
                    Save
                </Button>
                <Button
                    className={'default'}
                    icon={icon ? IoIosSave : undefined}
                    disabled={props.disabled || modal}
                    align={props.align}
                    width={props.width}
                    onClick={() => {
                        buttonTextRef.current = 'secondary';
                        setModal(true)
                    }}
                >
                    Save
                </Button>
            </div>
            <div className={'display-flex flex-direction-column gap-0p5 pl-0p5'}
                 style={{
                     width: '370px',
                     overflowY: 'auto',
                     paddingRight: '1rem'
                 }}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>
                <Checkbox
                    labelWidth={165}
                    label={'disabled'}
                    labelPosition={'left'}
                    name={'disabled'}
                    checked={props.disabled}
                    onChange={propsChangeHandler}/>
                <div className="display-flex gap-0p1 align-items-center">
                    <Checkbox
                        labelWidth={165}
                        label={'icon'}
                        labelPosition={'left'}
                        name={'disabled'}
                        checked={icon}
                        onChange={(e: any) => setIcon(e.currentTarget.checked)}/>
                    <Tippy content={'react-icons'} placement="top" className={'custom-tippy'}>
                        <span className={'font-monospace font-size-small color-light-gray'}>(IoIosSave)</span>
                    </Tippy>
                </div>
                <Dropdown
                    labelWidth={165}
                    options={alignOptions}
                    selected={props.align}
                    label={'align'}
                    onChange={(value: string) => dropDownChangeHandler('align', value)}
                />
                <InputField
                    labelWidth={165}
                    label={'width'}
                    type={'number'}
                    width={60}
                    fieldRegister={register('width', {
                        value: props.width,
                        onChange: propsChangeHandler
                    })}/>
            </div>
        </div>
        {
            modal && <Modal onClose={() => setModal(false)} closeOnEscKey={true} closeOnOutsideClick={true} showClose={true} title={'Hello, world!'}>
                <h3 className={'m-0 color-orange'}>You clicked the save {buttonTextRef.current} button!</h3>
            </Modal>
        }
    </div>;
};

export default DemoButton;