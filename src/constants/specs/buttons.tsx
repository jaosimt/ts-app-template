import React, { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SelectedThemeProps, strongPropsStyles, TargetUnicode, themes } from '../../components/pages/home';

const code = `<Button>
    Submit
</Button>`;
export const ButtonComponentSpecs: FC<SelectedThemeProps> = ({selectedTheme}) => {
    return <>
        <h4 className={'m-0 mt-1 border-top pt-1 color-black mb-0p3'}>Button</h4>
        <SyntaxHighlighter
            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
            showLineNumbers={true}
            language="jsx"
            customStyle={{padding: '0.5rem', margin: 0}}
            style={themes[selectedTheme]}
        >
            {code}
        </SyntaxHighlighter>
        <h4 className={'mt-1 color-gray mb-0p3 flex align-items-center'}>Properties [<span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLButtonElement>`}</span>]</h4>
        <ul className={'m-0 color-black font-monospace font-size-smaller line-height-normal'}>
            <li>
                <strong style={strongPropsStyles}>align</strong> {TargetUnicode} string {TargetUnicode} <i>left|center|right|space-between</i> {TargetUnicode} Sets the alignment of button icon and label alike
            </li>
            <li>
                <strong style={strongPropsStyles}>disabled</strong> {TargetUnicode} boolean {TargetUnicode} Specifies that a button should be disabled
            </li>
            <li>
                <strong style={strongPropsStyles}>icon</strong> {TargetUnicode} IconType {TargetUnicode} <i><a
                className={'link'}
                href={'//react-icons.github.io/react-icons/'}>react-icons</a></i> {TargetUnicode} Adds icon to the
                button
            </li>
            <li>
                <strong style={strongPropsStyles}>iconClassName</strong>{' '}{TargetUnicode} string {TargetUnicode} CSS
                classes to be spread to the button element
            </li>
            <li>
                <strong style={strongPropsStyles}>type</strong> {TargetUnicode} string {TargetUnicode}
                <i>button|submit|reset</i> {TargetUnicode} Specifies the type of the button
            </li>
            <li>
                <strong
                    style={strongPropsStyles}>width</strong>{' '}{TargetUnicode} {`number | \`\${number}\${string}\``} {TargetUnicode} Setsthe
                width of the button
            </li>
        </ul>
    </>;
};