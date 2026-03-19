import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeProp } from '../../../constants/interfaces';
import { getBorderColor } from '../../../utils/themeUtils';
import Checkbox, { CheckboxProps } from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const positionOptions = ['left', 'right'];

const DemoCheckbox: FC<{theme: ThemeProp}> = ({theme}) => {
    const {register} = useForm();

    const [myCheckbox, setMyCheckbox] = useState(false);
    const [props, setProps] = useState<Partial<CheckboxProps>>({
        name: undefined,
        label: 'Checkbox',
        labelWidth: undefined,
        disabled: false,
        labelPosition: 'left',
    });

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['checked', 'disabled'].includes(name) ? checked : value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});

    return <div data-component={'checkbox-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Checkbox />`}</h2>

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
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    labelWidth={'50%'}
                    label={'label'}
                    fieldRegister={register('label', {value: props.label, onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={'50%'}
                    label={'labelWidth'}
                    type={'number'}
                    width={60}
                    fieldRegister={register('labelWidth', {
                        value: props.labelWidth,
                        onChange: propsChangeHandler
                    })}/>
                <Checkbox
                    className={'width-100p'}
                    labelWidth={'50%'}
                    label={'disabled'}
                    labelPosition={'left'}
                    name={'disabled'}
                    checked={props.disabled}
                    onChange={propsChangeHandler}/>
                <Dropdown
                    labelWidth={'50%'}
                    options={positionOptions}
                    selected={props.labelPosition}
                    label={'labelPosition'}
                    onChange={(value: string) => dropDownChangeHandler('labelPosition', value)}
                />
            </div>
        </div>
    </div>;
};

export default DemoCheckbox;