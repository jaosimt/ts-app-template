import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    MdAlignHorizontalLeft,
    MdAlignHorizontalRight,
    MdAlignVerticalBottom,
    MdAlignVerticalTop
} from 'react-icons/md';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { createLink } from '../../../utils/ext';
import { ReactIcon } from '../../partials';
import Box from '../../partials/box';
import Drawer, { DrawerProps } from '../../partials/drawer';
import Dropdown, { DropdownObjectOptions } from '../../partials/dropdown';
import InputField from '../../partials/inputField';

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

const DemoDrawer: FC = () => {
    const {register} = useForm();

    const [position, setPosition] = useState<DropdownObjectOptions>(positionOptions[1]);
    const [props, setProps] = useState<DrawerProps>({
        position: position.value as any,
        width: 300,
        height: 300,
        backgroundColor: undefined
    });

    // eslint-disable-next-line
    useEffect(() => setProps({...props, position: position.value as any}), [position]);

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value} = e.currentTarget;
        setProps({...props, [name]: value});
    };

    const dropDownChangeHandler = (value: DropdownObjectOptions) => setPosition(value);

    return <div data-name={'modal-demo'} className={'flex-wrap justify-content-center gap-0p5-1'}>
        <Box
            label={'Drawer Props'}
            boxClassName={'width-fit-100p justify-self-center pb-0'} className={'display-flex flex-wrap justify-content-center gap-0p5-1'}>
            <div className="pb-05">
                <div className={'display-flex justify-content-center flex-wrap gap-0p5-1'}>
                    <InputField
                        width={100}
                        label={'backgroundColor'}
                        fieldRegister={register('backgroundColor', {
                            value: props.backgroundColor,
                            onChange: propsChangeHandler
                        })}/>
                    <InputField
                        width={70}
                        label={'width'}
                        type={'number'}
                        fieldRegister={register('width', {
                            value: props.width,
                            onChange: propsChangeHandler
                        })}/>
                    <Dropdown
                        options={positionOptions}
                        selected={position}
                        label={'position'}
                        onChange={(value: DropdownObjectOptions) => dropDownChangeHandler(value)}
                    />
                    <InputField
                        width={70}
                        label={'height'}
                        type={'number'}
                        fieldRegister={register('height', {
                            value: props.height,
                            onChange: propsChangeHandler
                        })}/>
                </div>
                <p className={'flex-wrap display-flex align-items-center mb-0 color-magenta justify-content-center border-top pt-0p5'}>The Drawer's handle <span className={'white-space-nowrap'}>(<ReactIcon className={'-mb-0p2'} icon={RiArchiveDrawerFill}/>)</span> should be centered on the&nbsp;<b>{props.position}</b>&nbsp;of your screen!</p>
                <p className={'flex-wrap mt-0p3 font-size-small color-gray text-align-center'}>Once opened, you may close it by pressing the ESC key or clicking outside of it.</p>
            </div>
        </Box>

        <Drawer position={props.position} width={props.width} height={props.height} backgroundColor={props.backgroundColor}>
            <p><b>The quick brown fox jumps over the lazy dog</b> is a famous English-language pangram—a sentence
                containing every letter of the alphabet. Coined in the late 19th century, it is widely used for
                touch-typing practice, testing keyboards, displaying fonts, and inWikipedia says, writing exercises.</p>
            <p><b>Key Aspects of the Phrase:</b></p>
            <ul>
                <li><b>Purpose:</b> It is used to display all 26 letters of the English alphabet in a short, coherent
                    sentence, making it ideal for testing typewriters, computer keyboards, and displaying font types.
                </li>
                <li><b>Origin:</b> The earliest known appearance of this phrase was in The Boston Journal in 1885, often
                    used for writing practice.
                </li>
                <li><b>Content:</b> It is a 35-letter sentence that is frequently used, though sometimes misquoted
                    (e.g."jumped" instead of "jumps").
                </li>
                <li><b>Alternatives:</b> Similar pangrams exist in other languages, such as "Voix ambiguë d'un cœur qui,
                    au zéphyr, préfère les jattes de kiwis" in French,
                    as {createLink('Reddit', '//www.reddit.com/r/AskEurope/comments/id8eor/what_is_the_the_quick_brown_fox_jumps_over_the/')} mentions.
                </li>
            </ul>
        </Drawer>
    </div>;
};

export default DemoDrawer;