import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { strongPropsStyles, TargetUnicode } from '../../components/pages/home';

const code = `<Box>
    <div>Box Content</div>
</Box>`;

export const BoxComponentSpecs = () => {
    return <>
        <h4 className={'m-0 color-gray mb-0p3'}>Box</h4>
        <SyntaxHighlighter
            codeTagProps={{style: {margin: 0, background: 'transparent', paddingTop: 0, paddingBottom: 0}}}
            style={lucario}
            showLineNumbers={true}
            language="jsx"
            customStyle={{padding: '0.5rem', margin: 0}}
        >
            {code}
        </SyntaxHighlighter>
        <h4 className={'mt-1 color-gray mb-0p3 flex align-items-center'}>Properties [<span
            className={'color font-monospace font-size-smaller'}>extends HTMLAttributes{`<HTMLDivElement>`}</span>]</h4>
        <ul className={'m-0 color-black font-monospace font-size-smaller line-height-normal'}>
            <li>
                <strong
                    style={strongPropsStyles}>borderRadius</strong>{' '}{TargetUnicode} {`number | \`\${number}\${string}\``}
                <ul className={'font-size-small'}>
                    <li>adds border radius to box's border</li>
                    <li>adds border/2 radius to box's title - if enabled!</li>
                </ul>
            </li>
            <li>
                <strong style={strongPropsStyles}>borderColor</strong>{' '}{TargetUnicode} HSLString | RGBString |
                HEXString {TargetUnicode} Color to border as implied!
            </li>
            <li>
                <strong style={strongPropsStyles}>boxClassName</strong>{' '}{TargetUnicode} string {TargetUnicode} CSS
                classes to be spread to the box element
            </li>
            <li>
                <strong style={strongPropsStyles}>title</strong>{' '}{TargetUnicode} string {TargetUnicode} Adds a title
                to the box
            </li>
            <li>
                <strong style={strongPropsStyles}>titleColor</strong>{' '}{TargetUnicode} string {TargetUnicode} Sets
                the color of the title - if enabled!
            </li>
            <li>
                <strong
                    style={strongPropsStyles}>width</strong>{' '}{TargetUnicode} {`number | \`\${number}\${string}\``} {TargetUnicode} Sets
                the width of the box
            </li>
        </ul>
    </>;
};