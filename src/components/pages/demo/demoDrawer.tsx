import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    MdAlignHorizontalLeft,
    MdAlignHorizontalRight,
    MdAlignVerticalBottom,
    MdAlignVerticalTop
} from 'react-icons/md';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { useSearchParams } from 'react-router';
import { ThemeProp } from '../../../constants/interfaces';
import { getAccentColor, getBorderColor } from '../../../utils/themeUtils';
import { ReactIcon } from '../../partials';
import Drawer, { DrawerProps } from '../../partials/drawer';
import Dropdown, { DropdownObjectOptions } from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Todo from './todo';

const positionOptions = [
    {
        label: 'top',
        value: 'top',
        icon: MdAlignVerticalTop
    }, {
        label: 'right',
        value: 'right',
        icon: MdAlignHorizontalRight
    }, {
        label: 'bottom',
        value: 'bottom',
        icon: MdAlignVerticalBottom
    }, {
        label: 'left',
        value: 'left',
        icon: MdAlignHorizontalLeft
    }
];

const DemoDrawer: FC<{ theme: ThemeProp }> = ({theme}) => {
    const {register} = useForm();
    const [searchParams] = useSearchParams();

    const [position, setPosition] = useState<DropdownObjectOptions>(positionOptions[1]);
    const [props, setProps] = useState<DrawerProps>({
        position: position.value as any,
        width: 700,
        height: 500,
        backgroundColor: undefined,
        showOnCreate: searchParams.get('showOnCreate') === 'true'
    });

    // eslint-disable-next-line
    useEffect(() => setProps({...props, position: position.value as any}), [position]);

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value} = e.currentTarget;
        setProps({...props, [name]: value});
    };

    const dropDownChangeHandler = (value: DropdownObjectOptions) => setPosition(value);

    return <div data-name={'drawer-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left with-height-wrapper'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'}
                    style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Drawer />`}</h2>

                <div className={'position-relative height-wrapper'}>
                    <Drawer
                        handleStyle={{position: 'absolute'}}
                        theme={theme}
                        showOnCreate={props.showOnCreate}
                        position={props.position}
                        width={props.width}
                        height={props.height}
                        backgroundColor={props.backgroundColor}>
                        <Todo className={'translate absolute-center'} style={{width: '95%'}}/>
                    </Drawer>
                </div>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    labelWidth={175}
                    width={100}
                    label={'backgroundColor'}
                    fieldRegister={register('backgroundColor', {
                        value: props.backgroundColor,
                        onChange: propsChangeHandler
                    })}/>
                <Dropdown
                    labelWidth={175}
                    options={positionOptions}
                    selected={position}
                    label={'position'}
                    onChange={(value: DropdownObjectOptions) => dropDownChangeHandler(value)}
                />
                <InputField
                    labelWidth={175}
                    disabled={['top', 'bottom'].includes(position.value)}
                    width={70}
                    label={'width'}
                    type={'number'}
                    fieldRegister={register('width', {
                        value: props.width,
                        onChange: propsChangeHandler
                    })}/>
                <InputField
                    labelWidth={175}
                    disabled={['left', 'right'].includes(position.value)}
                    width={70}
                    label={'height'}
                    type={'number'}
                    fieldRegister={register('height', {
                        value: props.height,
                        onChange: propsChangeHandler
                    })}/>
                <p style={{color: getAccentColor(theme)}}
                   className={'flex-wrap display-flex align-items-center mb-0 justify-content-center border-top pt-0p5'}>The
                    Drawer's handle <span className={'white-space-nowrap'}>(<ReactIcon className={'-mb-0p2'}
                                                                                       icon={RiArchiveDrawerFill}/>)</span> should
                    be centered on the&nbsp;<b>{props.position}</b>!</p>
                <p className={'flex-wrap mt-0p3 font-size-small text-align-center'}>Once opened, you may close it by
                    pressing the ESC key or clicking outside of it.</p>
            </div>
        </div>
    </div>;
};

export default DemoDrawer;