import { ChangeEvent, FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import Box from '../../partials/box';
import CollapsibleLink, { CollapsibleLinkProps } from '../../partials/collapsibleLink';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';

const positionOptions = ['relative', 'fixed'];

const styleCode = `{
    backgroundColor: '#fff',
    padding: '0.5rem',
    borderRadius: '7px',
    minWidth: 'fit-content'
}`;
const DemoCollapsibleLink: FC<{theme: ThemeProp}> = ({theme}) => {
    const [props, setProps] = useState<CollapsibleLinkProps>({
        linkText: 'Collapsible Link',
        details: 'Collapsible Detail',
        position: positionOptions[0] as any
    });

    const [styles] = useState({
        backgroundColor: '#fff',
        padding: '0.5rem',
        borderRadius: '7px',
        minWidth: 'fit-content'
    });

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value} = e.currentTarget;
        setProps({...props, [name]: value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});

    const themedBoxBorderColor = theme === Theme.LIGHT ? '#000' : '#ccc';

    const selectedTheme = theme === Theme.DARK ? oneLight : oneDark;

    return <div data-component={'button-demo'} className={'display-flex flex-direction-column align-items-center gap-0p5-1'}>
        <Box label={'CollapsibleLink Props'} className={'justify-self-center'} borderColor={themedBoxBorderColor}>
            <div className={'display-flex justify-content-center flex-wrap gap-0p5-1 mb-1'}>
                <InputField label={'linkText'} name={'linkText'} value={props.linkText} onChange={propsChangeHandler}/>
                <InputField label={'details'} name={'details'} value={props.details} onChange={propsChangeHandler}/>
                <Dropdown
                    options={positionOptions}
                    selected={props.position}
                    label={'position'}
                    onChange={(value: string) => dropDownChangeHandler('position', value)}
                />
            </div>
            <div className={'display-flex flex-direction-column align-items-center'}>
                <Box tight={true} borderColor={themedBoxBorderColor} label={'style'} labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {styleCode}
                    </SyntaxHighlighter>
                </Box>
            </div>
        </Box>
        <Box label={'Button'} className={'justify-self-center'} contentClassName={'position-relative display-flex justify-content-center flex-wrap gap-0p5-1'} borderColor={themedBoxBorderColor}>
            <CollapsibleLink style={{...styles}} linkText={props.linkText} details={props.details} position={props.position} />
        </Box>
    </div>;
};

export default DemoCollapsibleLink;