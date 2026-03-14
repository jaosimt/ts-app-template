import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isString } from '../../../utils';
import { createLink } from '../../../utils/ext';
import Box, { BoxProps } from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const borderOptions = ['true', 'false', 'label-only'];
const labelPositionOptions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
const labelSizeOptions = ['small', 'medium', 'large'];

const DemoBox:FC = () => {
    const {register} = useForm();

    const [props, setProps] = useState<Partial<BoxProps>>({
        backgroundColor: undefined,
        border: true,
        borderRadius: 7,
        borderColor: undefined,
        tight: false,
        label: undefined,
        labelColor: undefined,
        labelBackgroundColor: undefined,
        labelPosition: labelPositionOptions[0] as any,
        labelSize: 'small',
        width: undefined,
        onLabelClick: undefined
    });
    const [onLabelClick, setOnLabelClick] = useState(false);

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;
        setProps({...props, [name]: ['tight'].includes(name) ? checked : value});
    }

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});

    useEffect(() => {
        setProps({...props, onLabelClick: onLabelClick ? () => alert('Hello, world!') : undefined});
        // eslint-disable-next-line
    }, [onLabelClick]);

    return <div data-component={'tab-demo'} className={'display-flex flex-wrap justify-content-center gap-0p5-1'}>
        <Box label={'Box Props'} className={'justify-self-center'} contentClassName={'display-flex justify-content-center flex-wrap gap-0p5-1'}>
            <InputField label={'label'} fieldRegister={register('label', {onChange: propsChangeHandler})}/>
            <InputField disabled={!isString(props.label, true)} label={'labelColor'} fieldRegister={register('labelColor', {onChange: propsChangeHandler})}/>
            <InputField disabled={!isString(props.label, true)} label={'labelBackgroundColor'} fieldRegister={register('labelBackgroundColor', {onChange: propsChangeHandler})}/>
            <Dropdown
                options={labelPositionOptions}
                selected={props.labelPosition}
                label={'labelPosition'}
                disabled={!isString(props.label, true)}
                onChange={(value: string) => dropDownChangeHandler('labelPosition', value)}
            />
            <Dropdown
                options={labelSizeOptions}
                selected={props.labelSize}
                label={'labelSize'}
                disabled={!isString(props.label, true)}
                onChange={(value: string) => dropDownChangeHandler('labelSize', value)}
            />

            <div className={'display-flex align-items-center'}>
                <Checkbox disabled={!isString(props.label, true)} label={'onLabelClick'} labelPosition={'left'} name={'onLabelClick'} checked={onLabelClick} onChange={(e: any) => setOnLabelClick(e.currentTarget.checked)}/>
                <span className={'font-size-small color-light-gray ml-0p5'}>{`() => alert('Hello, world!')`}</span>
            </div>
            <Dropdown
                options={borderOptions}
                selected={props.border as any}
                label={'border'}
                disabled={!isString(props.label, true)}
                onChange={(value: string) => dropDownChangeHandler('border', value)}
            />
            <InputField width={50} disabled={props.border === false} label={'borderRadius'} fieldRegister={register('borderRadius', {value: props.borderRadius, onChange: propsChangeHandler})}/>
            <InputField disabled={props.border === false} label={'borderColor'} fieldRegister={register('borderColor', {onChange: propsChangeHandler})}/>
            <Checkbox label={'tight'} labelPosition={'left'} name={'tight'} checked={props.tight} onChange={propsChangeHandler}/>
            <InputField label={'backgroundColor'} fieldRegister={register('backgroundColor', {onChange: propsChangeHandler})}/>
            <InputField width={50} label={'width'} fieldRegister={register('width', {onChange: propsChangeHandler})}/>
        </Box>
        <Box
            backgroundColor={props.backgroundColor}
            border={['true', 'false'].includes(String(props.border)) ? String(props.border) === 'true' : props.border}
            borderRadius={props.borderRadius}
            borderColor={props.borderColor}
            tight={props.tight}
            label={props.label}
            labelColor={props.labelColor}
            labelBackgroundColor={props.labelBackgroundColor}
            labelPosition={props.labelPosition}
            labelSize={props.labelSize}
            width={props.width}
            onLabelClick={props.onLabelClick}
            className={'justify-self-center'}
            contentClassName={'display-flex flex-wrap justify-content-center gap-0p5-1'}
        >
            <div className="p-0p5 trim">
                <p><b>The quick brown fox jumps over the lazy dog</b> is a famous English-language pangram—a sentence
                    containing every letter of the alphabet. Coined in the late 19th century, it is widely used for
                    touch-typing practice, testing keyboards, displaying fonts, and in Wikipedia says, writing exercises.</p>
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
            </div>
        </Box>
    </div>
}

export default DemoBox;