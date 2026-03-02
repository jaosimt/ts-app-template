import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '../../partials/box';
import Checkbox, { CheckboxProps } from '../../partials/checkbox';
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

    return <div data-component={'checkbox-demo'} className={'display-flex gap-1 align-items-center flex-wrap'}>
        <Box
            label={'Checkbox Props'} boxClassName={'mb-1 with-fit-content'}>
            <div className="grid cols-2 no-padding gap-0p5-1">
                <InputField labelWidth={95} label={'label'}
                            fieldRegister={register('label', {value: props.label, onChange: propsChangeHandler})}/>
                <InputField labelWidth={95} label={'labelWidth'} type={'number'} width={60}
                            fieldRegister={register('labelWidth', {
                                value: props.labelWidth,
                                onChange: propsChangeHandler
                            })}/>
                <Checkbox labelWidth={95} label={'disabled'} labelPosition={'left'} name={'disabled'}
                          checked={props.disabled} onChange={propsChangeHandler}/>
                <div className={'display-flex gap-0p3 align-items-center'}>
                    <span style={{width: '95px'}}>labelPosition</span>
                    <select name={'labelPosition'} value={props.labelPosition} onChange={propsChangeHandler}>
                        {positionOptions.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Box>
        <Box>
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