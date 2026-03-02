import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import InputField from '../../partials/inputField';
import Loading, { LoadingProps } from '../../partials/loading';

const positionOptions = ['fixed', 'absolute'];

const LoadingDemo: FC = () => {
    const {register} = useForm();

    const [props, setProps] = useState<LoadingProps>({
        borderWidth: undefined,
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

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['padding', 'boxShadow'].includes(name) ? checked : value});
    };

    return <div data-component={'loading-demo'} className={'grid'} style={{gridTemplateRows: 'auto 1fr', height: '100%'}}>
        <Box
            className={'display-flex gap-0p3 flex-direction-column width-fit-content'}
            label={'Modal Props'}
        >
            <div className="grid cols-3 no-padding gap-0p5-1">
                <InputField type={'number'} labelWidth={163} width={60} label={'borderWidth'}
                            fieldRegister={register('borderWidth', {
                                value: props.borderWidth,
                                onChange: propsChangeHandler
                            })}/>
                <InputField labelWidth={163} label={'borderColor'}
                            fieldRegister={register('borderColor', {onChange: propsChangeHandler})}/>
                <InputField labelWidth={163} label={'backgroundColor'}
                            fieldRegister={register('backgroundColor', {onChange: propsChangeHandler})}/>
                <div className={'display-flex gap-0p3 align-items-center'}>
                    <span style={{width: '163px'}}>border</span>
                    <select name={'position'} value={props.position} onChange={propsChangeHandler}>
                        {positionOptions.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <InputField type={'number'} labelWidth={163} width={60} label={'size'}
                            fieldRegister={register('size', {value: props.size, onChange: propsChangeHandler})}/>
                <InputField labelWidth={163} label={'color'}
                            fieldRegister={register('color', {onChange: propsChangeHandler})}/>
                <InputField labelWidth={163} label={'topText'}
                            fieldRegister={register('topText', {onChange: propsChangeHandler})}/>
                <InputField labelWidth={163} label={'bottomText'}
                            fieldRegister={register('bottomText', {onChange: propsChangeHandler})}/>
                <Checkbox labelWidth={163} label={'padding'} labelPosition={'left'} name={'padding'}
                          checked={props.padding} onChange={propsChangeHandler}/>
                <Checkbox labelWidth={163} label={'boxShadow'} labelPosition={'left'} name={'boxShadow'}
                          checked={props.boxShadow} onChange={propsChangeHandler}/>

            </div>
        </Box>
        <div className="position-relative">
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

export default LoadingDemo;