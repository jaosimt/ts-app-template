import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '../../partials/box';
import Checkbox, { CheckboxProps } from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const positionOptions = ['left', 'right'];

const DemoCheckbox: FC = () => {
    const {register} = useForm();

    const [myCheckbox, setMyCheckbox] = useState(false);
    const [props, setProps] = useState<Partial<CheckboxProps>>({
        name: undefined,
        label: 'white',
        labelWidth: undefined,
        disabled: false,
        labelPosition: 'left',
    });

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['checked', 'disabled'].includes(name) ? checked : value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});

    return <div data-component={'checkbox-demo'} className={'display-flex flex-wrap justify-content-center gap-0p5-1'}>
        <Box label={'Checkbox Props'} boxClassName={'width-fit-100p justify-self-center pb-0'} className={'display-flex flex-wrap justify-content-center gap-0p5-1'}>
            <div className="display-flex flex-wrap justify-content-center gap-0p5-1 pb-0p5">
                <InputField label={'label'}
                            fieldRegister={register('label', {value: props.label, onChange: propsChangeHandler})}/>
                <InputField label={'labelWidth'} type={'number'} width={60}
                            fieldRegister={register('labelWidth', {
                                value: props.labelWidth,
                                onChange: propsChangeHandler
                            })}/>
                <Checkbox label={'disabled'} labelPosition={'left'} name={'disabled'}
                          checked={props.disabled} onChange={propsChangeHandler}/>
                <Dropdown
                    options={positionOptions}
                    selected={props.labelPosition}
                    label={'labelPosition'}
                    onChange={(value: string) => dropDownChangeHandler('labelPosition', value)}
                />
            </div>
        </Box>
        <Box label={'Button'} className={'display-flex flex-wrap justify-content-center gap-0p5-1'} boxClassName={'width-fit-100p justify-self-center'}>
            <Checkbox
                name={'myCheckbox'}
                checked={myCheckbox}
                label={props.label}
                labelWidth={props.labelWidth}
                disabled={props.disabled}
                className={props.className}
                labelPosition={props.labelPosition}
                onChange={(e: any) => setMyCheckbox(e.currentTarget.checked)}
            />
        </Box>
    </div>;
};

export default DemoCheckbox;