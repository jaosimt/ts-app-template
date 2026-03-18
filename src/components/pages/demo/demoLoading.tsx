import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import { ThemeProp } from '../../../constants/interfaces';
import { getBorderColor, getSecondaryBackgroundColor } from '../../../utils/themeUtils';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Loading, { LoadingProps } from '../../partials/loading';
import { toast } from '../../partials/toast';

const positionOptions = ['fixed', 'absolute'];

const DemoLoading: FC<{theme: ThemeProp}> = ({theme}) => {
    const {register} = useForm();

    const [props, setProps] = useState<LoadingProps>({
        borderWidth: 1,
        borderColor: undefined,
        backgroundColor: 'white',
        padding: true,
        position: 'absolute',
        size: 42,
        color: undefined,
        topText: undefined,
        bottomText: undefined,
        boxShadow: false
    });

    const debDropdownChange = useDebounceCallback(dropDownChangeHandler, 300);

    function propsChangeHandler(e: ChangeEvent<any>) {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['padding', 'boxShadow'].includes(name) ? checked : value});
    }

    function dropDownChangeHandler(name: string, value: string) {
        setProps({...props, [name]: value});
        toast({
            message: `Loading element is centered relative to ${value === 'fixed' ? 'window/document' : 'parent'} element!`,
            options: {duration: 7000}
        });
    }

    return <div data-component={'loading-demo'} className={'height-100p'}>
        <div className="display-flex gap-1 height-100p">
            <div
                style={{
                    width: 'calc(100% - 370px)',
                    overflowY: 'auto',
                    backgroundColor: getSecondaryBackgroundColor(theme),
                    borderRadius: '0.4rem',
                    padding: '1rem 2rem'
                }}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Loading />`}</h2>

                <div className={'position-relative'} style={{height: 'calc(100% - 5rem)'}}>
                    <Loading
                        borderWidth={props.borderWidth}
                        borderColor={props.borderColor}
                        backgroundColor={props.backgroundColor}
                        padding={props.padding}
                        position={props.position}
                        size={props.size}
                        color={props.color}
                        topText={props.topText}
                        bottomText={props.bottomText}
                        boxShadow={props.boxShadow}
                    />
                </div>
            </div>
            <div className={'display-flex flex-direction-column gap-0p5 pl-0p5'}
                 style={{
                     width: '370px',
                     overflowY: 'auto',
                     paddingRight: '1rem'
                 }}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <Dropdown
                    labelWidth={165}
                    options={positionOptions}
                    selected={props.position}
                    label={'position'}
                    onChange={(value: string) => debDropdownChange('position', value)}
                />
                <InputField
                    labelWidth={165}
                    type={'number'}
                    width={60}
                    label={'borderWidth'}
                    fieldRegister={register('borderWidth', {
                        value: props.borderWidth,
                        onChange: propsChangeHandler
                    })}/>
                <InputField
                    labelWidth={165}
                    label={'borderColor'}
                    fieldRegister={register('borderColor', {onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={165}
                    label={'backgroundColor'}
                    fieldRegister={register('backgroundColor', {onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={165}
                    label={'color'}
                    fieldRegister={register('color', {onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={165}
                    label={'topText'}
                    fieldRegister={register('topText', {onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={165}
                    label={'bottomText'}
                    fieldRegister={register('bottomText', {onChange: propsChangeHandler})}/>
                <InputField
                    labelWidth={165}
                    type={'number'}
                    width={60}
                    label={'size'}
                    fieldRegister={register('size', {value: props.size, onChange: propsChangeHandler})}/>
                <Checkbox
                    labelWidth={165}
                    label={'padding'}
                    labelPosition={'left'}
                    name={'padding'}
                    checked={props.padding}
                    onChange={propsChangeHandler}/>
                <Checkbox
                    labelWidth={165}
                    label={'boxShadow'}
                    labelPosition={'left'}
                    name={'boxShadow'}
                    checked={props.boxShadow}
                    onChange={propsChangeHandler}/>
            </div>
        </div>
    </div>;
};

export default DemoLoading;