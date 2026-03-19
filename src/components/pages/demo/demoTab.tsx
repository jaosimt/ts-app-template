import { ChangeEvent, FC, useEffect, useState } from 'react';
import '../../partials/tab/styles.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSColors, CSSUnit } from '../../../constants/types';
import { classNames } from '../../../utils';
import { getBorderColor } from '../../../utils/themeUtils';
import Box from '../../partials/box';
import Checkbox from '../../partials/checkbox';
import Dropdown from '../../partials/dropdown';
import InputField from '../../partials/inputField';
import Tabs, { TabItemProps, TabItemType, TabsType } from '../../partials/tab';
import { toast } from '../../partials/toast';

const onTabChange = (selected: string) => {
    toast({
        message: <span>Tab item "<b>{selected}</b>" selected</span>,
        options: {omitIcon: false, duration: 3000}
    });
};
const onTabChangeCode = `const onTabChange = (selected: string) => {
    toast({
        message: <span>Tab item "<b>{selected}</b>" selected</span>,
        options: { omitIcon: false, duration: 3000 }
    });
}`;

const tabItems: TabItemType[] = [
    {
        name: 'What is Lorem Ipsum',
        content: <>
            <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </>
    }, {
        name: 'Why do we use it?',
        content: <>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </>
    }, {
        name: 'Where does it come from?',
        content: <>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
                theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                sit amet..", comes from a line in section 1.10.32.</p>
            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </>
    }, {
        name: 'Where can I get some?',
        content: <>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden
                in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                non-characteristic words etc.</p>
        </>
    }, {
        name: 'The 1 brown fox',
        content: <>
            <p><b>The quick brown fox jumps over the lazy dog</b> is a famous English pangram—a sentence containing every letter of the alphabet. Coined in the late 19th century (circa 1885), it is used worldwide for typing practice, keyboard testing, and font displays because it uses all 26 letters. </p>
            <p>Key details about this phrase:</p>
            <ul>
                <li><b>Purpose:</b> It is used to test typewriters, computer keyboards, and to display fonts.</li>
                <li><b>Origin:</b> The earliest known appearance was in The Boston Journal in 1885.</li>
                <li><b>Usage:</b> It was used for signaling practice, on the Moscow–Washington hotline, and is common in typing tests.</li>
                <li><b>Pangram:</b> The phrase is famous because it is a short, coherent sentence that uses every letter from A to Z.</li>
                <li><b>Popularity:</b> It is often used to demonstrate the full character set of a font.</li>
            </ul>
        </>
    }
]
const tabItemsCode = `[
    {
        name: 'What is Lorem Ipsum',
        content: <>
            <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </>
    }, {
        name: 'Why do we use it?',
        content: <>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </>
    }, {
        name: 'Where does it come from?',
        content: <>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
                theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                sit amet..", comes from a line in section 1.10.32.</p>
            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </>
    }, {
        name: 'Where can I get some?',
        content: <>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden
                in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                non-characteristic words etc.</p>
        </>
    }, {
        name: 'The 1 brown fox',
        content: <>
            <p><b>The quick brown fox jumps over the lazy dog</b> is a famous English pangram—a sentence containing every letter of the alphabet. Coined in the late 19th century (circa 1885), it is used worldwide for typing practice, keyboard testing, and font displays because it uses all 26 letters. </p>
            <p>Key details about this phrase:</p>
            <ul>
                <li><b>Purpose:</b> It is used to test typewriters, computer keyboards, and to display fonts.</li>
                <li><b>Origin:</b> The earliest known appearance was in The Boston Journal in 1885.</li>
                <li><b>Usage:</b> It was used for signaling practice, on the Moscow–Washington hotline, and is common in typing tests.</li>
                <li><b>Pangram:</b> The phrase is famous because it is a short, coherent sentence that uses every letter from A to Z.</li>
                <li><b>Popularity:</b> It is often used to demonstrate the full character set of a font.</li>
            </ul>
        </>
    }
]`;

const demoTabId = 'demoTab';
const DemoTabs: FC<{ theme: ThemeProp }> = ({theme}) => {
    const [props, setProps] = useState<TabItemProps>({
        data: [] as TabItemType[],
        type: (sessionStorage.getItem('tabDemoSelectedTab') || 'boxed') as TabsType,
        width: '100%',
        activeItemColor: '' as CSSColors,
        contentPadding: '' as CSSUnit,
        minContentHeight: '' as CSSUnit,
        moveSelectedOnScroll: true,
        rememberActiveTab: sessionStorage.getItem(`rememberActive-${demoTabId}`) === 'true',
        onTabChange: () => {}
    });
    const [tabChangeCallback, setTabChangeCallback] = useState(false);

    useEffect(() => {
        if (tabChangeCallback) setProps({...props, onTabChange: onTabChange});
        else setProps({
            ...props, onTabChange: () => {
            }
        });
        // eslint-disable-next-line
    }, [tabChangeCallback]);

    const propsChangeHandler = (e: ChangeEvent<any>) => {
        const {name, value, checked} = e.currentTarget;

        if (name === 'rememberActiveTab') {
            if (checked) sessionStorage.setItem(`rememberActive-${demoTabId}`, 'true');
            else sessionStorage.removeItem(`rememberActive-${demoTabId}`);
        }

        setProps({...props, [name]: ['moveSelectedOnScroll', 'rememberActiveTab'].includes(name) ? checked : value});
    };

    const dropDownChangeHandler = (name: string, value: string) => setProps({...props, [name]: value});
    const selectedTheme = theme === Theme.DARK ? oneLight : oneDark;

    return <div data-component={'tab-demo'}>
        <div className="demo-section">
            <div className={'demo-section-left'}>
                <h2 className={'mt-0 pb-0p5 text-align-left'}
                    style={{borderBottom: `1px solid ${getBorderColor(theme)}`}}>{`<Tabs />`}</h2>

                <Tabs
                    id={demoTabId}
                    data={tabItems}
                    type={props.type}
                    width={props.width}
                    activeItemColor={props.activeItemColor}
                    moveSelectedOnScroll={props.moveSelectedOnScroll}
                    contentPadding={props.contentPadding}
                    minContentHeight={props.minContentHeight}
                    onTabChange={props.onTabChange}
                    rememberActiveTab={props.rememberActiveTab}
                />
            </div>
            <div className={'demo-section-right'}>
                <h2 className={'mt-0 text-align-left'}>Props</h2>

                <Dropdown
                    labelWidth={'50%'}
                    className={'mb-0p5'}
                    options={['boxed', 'boxed-content', 'boxed-tabs', 'plain']}
                    selected={props.type}
                    label={'type'}
                    onChange={(value: string) => dropDownChangeHandler('type', value)}
                />
                <InputField
                    labelWidth={'50%'}
                    label={'width'}
                    name={'width'}
                    value={props.width}
                    onChange={propsChangeHandler}
                />
                <InputField
                    labelWidth={'50%'}
                    label={'activeItemColor'}
                    name={'activeItemColor'}
                    value={props.activeItemColor}
                    onChange={propsChangeHandler}
                />
                <InputField
                    labelWidth={'50%'}
                    type={'number'}
                    width={70}
                    label={'contentPadding'}
                    name={'contentPadding'}
                    value={props.contentPadding}
                    onChange={propsChangeHandler}
                />
                <InputField
                    labelWidth={'50%'}
                    type={'number'}
                    min={100}
                    step={100}
                    label={'minContentHeight'}
                    name={'minContentHeight'}
                    value={props.minContentHeight}
                    onChange={propsChangeHandler}
                />
                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'moveSelectedOnScroll'}
                    name={'moveSelectedOnScroll'}
                    checked={props.moveSelectedOnScroll}
                    onChange={propsChangeHandler}
                />
                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'rememberActiveTab'}
                    name={'rememberActiveTab'}
                    checked={props.rememberActiveTab}
                    onChange={propsChangeHandler}
                />

                <Checkbox
                    className={'width-100p'}
                    labelPosition={'left'}
                    labelWidth={'50%'}
                    label={'onTabChange'}
                    name={'tabChangeCallback'}
                    checked={tabChangeCallback}
                    onChange={(e) => setTabChangeCallback(e.currentTarget.checked)}
                />
                <Box
                    className={classNames('-mt-0p5', !tabChangeCallback && 'opacity-0-25')}
                    width={'100%'}
                    tight={true}
                    label={'style'}
                    labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {onTabChangeCode}
                    </SyntaxHighlighter>
                </Box>
                <span>data</span>
                <Box
                    className={classNames('-mt-0p5')}
                    width={'100%'}
                    tight={true}
                    label={'style'}
                    labelPosition={'top-right'}>
                    <SyntaxHighlighter
                        codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
                        showLineNumbers={true}
                        language="js"
                        customStyle={{padding: '0.5rem', margin: 0, border: 'none', borderRadius: 0}}
                        style={selectedTheme}
                    >
                        {tabItemsCode}
                    </SyntaxHighlighter>
                </Box>
            </div>
        </div>
    </div>
};

export default DemoTabs;