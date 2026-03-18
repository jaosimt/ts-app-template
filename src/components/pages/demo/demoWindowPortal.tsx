import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { SlReload, SlScreenDesktop } from 'react-icons/sl';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { beep, Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { decrementCounter, getCounter, incrementCounter, resetCounter } from '../../../slices/counter';
import { classNames } from '../../../utils';
import { getBorderColor } from '../../../utils/themeUtils';
import Box from '../../partials/box';
import Button from '../../partials/button';
import Checkbox from '../../partials/checkbox';
import InputField from '../../partials/inputField';
import { toast } from '../../partials/toast';
import WindowPortal, { WindowPortalProps } from '../windowPortal';

const Counter = styled.span`
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const portalContentCode = `<div className={'translate absolute-center'}>
    <h1 className={'color-red display-flex flex-direction-column align-items-center'}>
        Hello ctr <span
        className={'p-2 border display-flex align-items-center justify-content-center font-weight-bold'}
        style={{borderRadius: '50%', width: '3rem', height: '3rem',}}
    >{ctr}</span> view in new window!
    </h1>
</div>`;

const onCloseCode = `() => setShowPortal(false)
/* 
   will enable the Show Portal 
   button back and will trigger 
   a warning toast message.
*/`;
const DemoWindowPortal: FC<{ theme: ThemeProp }> = ({theme}) => {
    const dispatch = useAppDispatch();
    const ctr = useAppSelector(getCounter);

    const [showPortal, setShowPortal] = useState(false);
    // const prev_showPortal = usePrevious(showPortal);
    const [props, setProps] = useState<Partial<WindowPortalProps>>({
        title: '',
        openOnNextScreen: true,
        onClose: () => {
            setShowPortal(false);
            beep(2);
            toast({message: 'Portal is disconnected!', options: {type: 'warning', closeOnPageChange: false}});
        }
    });
    const [onClose, setOnClose] = useState(true);

    useEffect(() => {
        if (onClose) {
            setProps({
                ...props, onClose: () => {
                    setShowPortal(false);
                    beep(2);
                    toast({message: 'Portal is disconnected!', options: {type: 'warning', closeOnPageChange: false}});
                }
            });
            if (showPortal) setShowPortal(false);
        } else setProps({
            ...props, onClose: () => {
            }
        });
        // eslint-disable-next-line
    }, [onClose]);

    // useEffect(() => {
    //     if (onClose && prev_showPortal) {
    //         beep(2);
    //         toast({message: 'Portal is disconnected!', options: {type: 'warning', closeOnPageChange: false}});
    //     }
    //     // eslint-disable-next-line
    // }, [showPortal, prev_showPortal]);

    // BELOW MUST BE THE SAME IN ABOVE'S portalContentCode
    const portalContent = <div className={'translate absolute-center'}>
        <h1 className={'color-red display-flex flex-direction-column align-items-center'}>
            Hello ctr <span
            className={'p-2 border display-flex align-items-center justify-content-center font-weight-bold'}
            style={{borderRadius: '50%', width: '3rem', height: '3rem',}}
        >{ctr}</span> view in new window!
        </h1>
    </div>;

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;

        setProps({...props, [name]: ['openOnNextScreen'].includes(name) ? checked : value});
    };

    const selectedTheme = theme === Theme.DARK ? oneLight : oneDark;

    return <div data-component={'window-portal-demo'} className={'height-100p'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'}
                    style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<WindowPortal />`}</h2>

                <div className={'width-fit-content'}>
                    <div className={'display-flex justify-content-center align-items-center gap-0p5-1'}>
                        <span>Counter</span>
                        <div className={'display-flex gap-0p5 align-items-center'}>
                            <Button
                                icon={FaMinus}
                                onClick={() => dispatch(decrementCounter())}
                            />
                            <Counter>{ctr}</Counter>
                            <Button
                                icon={FaPlus}
                                onClick={() => dispatch(incrementCounter())}
                            />
                            <Button
                                icon={SlReload}
                                disabled={ctr === 0}
                                onClick={() => dispatch(resetCounter())}
                            />
                        </div>
                    </div>
                    <div className={'display-flex flex-direction-column align-items-center mt-0p5'}>
                        <Button
                            width={'100%'}
                            align={'space-between'}
                            icon={SlScreenDesktop}
                            disabled={showPortal}
                            onClick={() => setShowPortal(true)}
                        >
                            <div className={'display-inline-flex flex-direction-column align-items-end'}>
                                <span>Show Portal</span>
                                <span className={'font-size-x-small'}>in second screen if available</span>
                            </div>
                        </Button>
                        <b className={'font-size-x-small mt-0p5'}>Above counter will be rendered in the portal
                            window</b>
                        {showPortal && !onClose && <Button
                            align={'space-between'}
                            width={'100%'}
                            icon={SlReload}
                            onClick={() => setShowPortal(false)}
                        >
                            <div className={'display-inline-flex flex-direction-column align-items-end'}>
                                <span>Re-Enable Show Portal</span>
                                <span className={'font-size-x-small'}>will close the connected Portal Window</span>
                            </div>
                        </Button>}
                    </div>
                </div>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <InputField
                    labelWidth={165}
                    label={'title'}
                    name={'title'}
                    value={props.title}
                    onChange={propsChangeHandler}
                />
                <Checkbox
                    labelPosition={'left'}
                    labelWidth={165}
                    label={'openOnNextScreen'}
                    name={'openOnNextScreen'}
                    checked={props.openOnNextScreen}
                    onChange={propsChangeHandler}
                />
                <Checkbox
                    disabled={showPortal}
                    labelPosition={'left'}
                    labelWidth={165}
                    label={'onClose'}
                    name={'onClose'}
                    checked={onClose}
                    onChange={(e) => setOnClose(e.currentTarget.checked)}
                />
                <Box
                    className={classNames('-mt-0p5', !onClose && 'opacity-0-25')}
                    width={'330px'}
                    tight={true}
                    labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {onCloseCode}
                    </SyntaxHighlighter>
                </Box>
                <p className={'m-0'}>children</p>
                <Box
                    className={classNames('-mt-0p5')}
                    width={'330px'}
                    tight={true}
                    labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {portalContentCode}
                    </SyntaxHighlighter>
                </Box>
            </div>
        </div>

        {showPortal && <WindowPortal
            openOnNextScreen={true}
            onClose={props.onClose}
        >
            {portalContent}
        </WindowPortal>}
    </div>;
};

export default DemoWindowPortal;