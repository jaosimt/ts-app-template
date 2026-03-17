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
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { getAccentColor } from '../../../utils/themeUtils';
import { ReactIcon } from '../../partials';
import Box from '../../partials/box';
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

const DemoDrawer: FC<{theme: ThemeProp}> = ({theme}) => {
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
    const themedBoxBorderColor = theme === Theme.REACT ? '#000' : '#ccc';

    return <div data-name={'modal-demo'} className={'flex-wrap justify-content-center gap-0p5-1'}>
        <Box
            label={'Drawer Props'}
            className={'justify-self-center'} contentClassName={'display-flex justify-content-center flex-wrap gap-0p5-1'} borderColor={themedBoxBorderColor}>
            <div className="pb-05">
                <div className={'display-flex justify-content-center flex-wrap gap-0p5-1'}>
                    <InputField
                        width={100}
                        label={'backgroundColor'}
                        fieldRegister={register('backgroundColor', {
                            value: props.backgroundColor,
                            onChange: propsChangeHandler
                        })}/>
                    <Dropdown
                        options={positionOptions}
                        selected={position}
                        label={'position'}
                        onChange={(value: DropdownObjectOptions) => dropDownChangeHandler(value)}
                    />
                    <InputField
                        disabled={['top', 'bottom'].includes(position.value)}
                        width={70}
                        label={'width'}
                        type={'number'}
                        fieldRegister={register('width', {
                            value: props.width,
                            onChange: propsChangeHandler
                        })}/>
                    <InputField
                        disabled={['left', 'right'].includes(position.value)}
                        width={70}
                        label={'height'}
                        type={'number'}
                        fieldRegister={register('height', {
                            value: props.height,
                            onChange: propsChangeHandler
                        })}/>
                </div>
                <p style={{color: getAccentColor(theme)}} className={'flex-wrap display-flex align-items-center mb-0 justify-content-center border-top pt-0p5'}>The Drawer's handle <span className={'white-space-nowrap'}>(<ReactIcon className={'-mb-0p2'} icon={RiArchiveDrawerFill}/>)</span> should be centered on the&nbsp;<b>{props.position}</b>&nbsp;of your screen!</p>
                <p className={'flex-wrap mt-0p3 font-size-small color-gray text-align-center'}>Once opened, you may close it by pressing the ESC key or clicking outside of it.</p>
            </div>
        </Box>

        <Drawer handleStyle={{top: 0, opacity: 1}} theme={theme} showOnCreate={props.showOnCreate} position={props.position} width={props.width} height={props.height} backgroundColor={props.backgroundColor}>
            <Todo className={'translate absolute-center'} style={{width: '95%'}} />
        </Drawer>
    </div>;
};

export default DemoDrawer;