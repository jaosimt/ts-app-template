import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import Box from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Loading, { LoadingProps } from '../../partials/loading';
import { toast } from '../../partials/toast';

const positionOptions = ['fixed', 'absolute'];

const DemoLoading: FC = () => {
    const {register} = useForm();

    const [props, setProps] = useState<LoadingProps>({
        borderWidth: 1,
        borderColor: undefined,
        backgroundColor: 'white',
        padding: true,
        position: 'fixed',
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

    return <div data-component={'loading-demo'} className={'display-inline-flex flex-direction-column height-100p gap-0p5 width-100p'}>
        <Box
            boxClassName={'width-100p pb-0'}
            className={'display-flex gap-0p3 flex-direction-column width-100p'}
            label={'Modal Props'}
        >
            <div className="display-flex justify-content-center flex-wrap gap-0p5-1 pb-0p5">
                <InputField type={'number'} width={60} label={'borderWidth'}
                            fieldRegister={register('borderWidth', {
                                value: props.borderWidth,
                                onChange: propsChangeHandler
                            })}/>
                <InputField label={'borderColor'}
                            fieldRegister={register('borderColor', {onChange: propsChangeHandler})}/>
                <InputField label={'backgroundColor'}
                            fieldRegister={register('backgroundColor', {onChange: propsChangeHandler})}/>
                <Dropdown
                    options={positionOptions}
                    selected={props.position}
                    label={'position'}
                    onChange={(value: string) => debDropdownChange('position', value)}
                />
                <InputField type={'number'} width={60} label={'size'}
                            fieldRegister={register('size', {value: props.size, onChange: propsChangeHandler})}/>
                <InputField label={'color'}
                            fieldRegister={register('color', {onChange: propsChangeHandler})}/>
                <InputField label={'topText'}
                            fieldRegister={register('topText', {onChange: propsChangeHandler})}/>
                <InputField label={'bottomText'}
                            fieldRegister={register('bottomText', {onChange: propsChangeHandler})}/>
                <Checkbox label={'padding'} labelPosition={'left'} name={'padding'}
                          checked={props.padding} onChange={propsChangeHandler}/>
                <Checkbox label={'boxShadow'} labelPosition={'left'} name={'boxShadow'}
                          checked={props.boxShadow} onChange={propsChangeHandler}/>

            </div>
        </Box>
        <div className="position-relative border border-radius-0p4 background-light" style={{height: '100%'}}>
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
    </div>;
};

export default DemoLoading;