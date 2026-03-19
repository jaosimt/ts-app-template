import { ChangeEvent, FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { getBorderColor } from '../../../utils/themeUtils';
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
        position: positionOptions[1] as any
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

    const themedBoxBorderColor = theme === Theme.REACT ? '#000' : '#ccc';

    const selectedTheme = theme === Theme.DARK ? oneLight : oneDark;

    return <div data-component={'collapsible-link-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'} style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<CollapsibleLink />`}</h2>

                <div className="display-flex">
                    <CollapsibleLink
                        style={{...styles}}
                        linkText={props.linkText}
                        details={props.details}
                        position={props.position} />
                </div>
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <Dropdown
                    labelWidth={'50%'}
                    options={positionOptions}
                    selected={props.position}
                    label={'position'}
                    onChange={(value: string) => dropDownChangeHandler('position', value)}
                />
                <InputField
                    labelWidth={'50%'}
                    label={'linkText'}
                    name={'linkText'}
                    value={props.linkText}
                    onChange={propsChangeHandler}/>
                <InputField
                    labelWidth={'50%'}
                    label={'details'}
                    name={'details'}
                    value={props.details}
                    onChange={propsChangeHandler}/>
                <Box
                    width={'100%'}
                    tight={true}
                    borderColor={themedBoxBorderColor}
                    label={'style'}
                    labelPosition={'top-right'}>
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
        </div>
    </div>;
};

export default DemoCollapsibleLink;