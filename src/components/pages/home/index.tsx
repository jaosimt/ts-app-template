import React, { FC, useState } from 'react';
import {
    a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy,
    coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea,
    duotoneSpace, funky, ghcolors,
    gruvboxDark,
    gruvboxLight,
    holiTheme, hopscotch, lucario, materialDark, materialLight, materialOceanic, nightOwl, nord,
    okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84,
    tomorrow, twilight, vs, vscDarkPlus, xonokai,
    zTouch
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { targetUnicode } from '../../../constants';
import { BoxComponentSpecs } from '../../../constants/specs/box';
import { ButtonComponentSpecs } from '../../../constants/specs/buttons';
import { InputFieldsProps } from '../../../constants/specs/inputFields';
import { ProperCase } from '../../../utils';
import { Box } from '../../partials/box';

export const TargetUnicode = <span className={'color-magenta'}>{targetUnicode}</span>;

export const strongPropsStyles = {
    minWidth: '110px',
    display: 'inline-block'
}

export interface SelectedThemeProps {
    selectedTheme: string;
}

// Define the type for the theme object
export type Theme = Record<string, React.CSSProperties>;

// Map of theme names to imported theme objects
export const themes: Record<string, Theme> = {
    'a11yDark': a11yDark,
    'atomDark': atomDark,
    'base16AteliersulphurpoolLight': base16AteliersulphurpoolLight,
    'cb': cb,
    'coldarkCold': coldarkCold,
    'coldarkDark': coldarkDark,
    'coyWithoutShadows': coyWithoutShadows,
    'coy': coy,
    'darcula': darcula,
    'dark': dark,
    'dracula': dracula,
    'duotoneDark': duotoneDark,
    'duotoneEarth': duotoneEarth,
    'duotoneForest': duotoneForest,
    'duotoneLight': duotoneLight,
    'duotoneSea': duotoneSea,
    'duotoneSpace': duotoneSpace,
    'funky': funky,
    'ghcolors': ghcolors,
    'gruvboxDark': gruvboxDark,
    'gruvboxLight': gruvboxLight,
    'holiTheme': holiTheme,
    'hopscotch': hopscotch,
    'lucario': lucario,
    'materialDark': materialDark,
    'materialLight': materialLight,
    'materialOceanic': materialOceanic,
    'nightOwl': nightOwl,
    'nord': nord,
    'okaidia': okaidia,
    'oneDark': oneDark,
    'oneLight': oneLight,
    'pojoaque': pojoaque,
    'prism': prism,
    'shadesOfPurple': shadesOfPurple,
    'solarizedDarkAtom': solarizedDarkAtom,
    'solarizedlight': solarizedlight,
    'synthwave84': synthwave84,
    'tomorrow': tomorrow,
    'twilight': twilight,
    'vs': vs,
    'vscDarkPlus': vscDarkPlus,
    'xonokai': xonokai,
    'zTouch': zTouch
};

const Home: FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>(localStorage.getItem('rshTheme') || 'nightOwl');

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTheme(event.target.value);
        localStorage.setItem('rshTheme', event.target.value);
    };

    return <div data-component={'home'} className={'width-100p'}>
        <h1 className={'mt-0 line-height-1'}>Home</h1>
        <Box
            borderColor={'#000000'}
            className={'p-0p5'}
            width={'100%'}
            title={'COMPONENTS'}
            borderRadius={4}
        >
            <div className={'display-flex justify-content-space-between mb-0p3'}>
                &nbsp;
                <select value={selectedTheme} onChange={handleThemeChange} style={{ marginLeft: '10px' }}>
                    {Object.keys(themes).map((themeName) => (
                        <option key={themeName} value={themeName}>
                            {ProperCase(themeName)}
                        </option>
                    ))}
                </select>
            </div>

            <BoxComponentSpecs selectedTheme={selectedTheme}/>
            <ButtonComponentSpecs selectedTheme={selectedTheme}/>
            <InputFieldsProps selectedTheme={selectedTheme}/>
        </Box>
    </div>
};

export default Home;

// const themes = [
//     'a11yDark', 'atomDark', 'base16AteliersulphurpoolLight', 'cb', 'coldarkCold', 'coldarkDark', 'coyWithoutShadows',
//     'coy', 'darcula', 'dark', 'dracula', 'duotoneDark', 'duotoneEarth', 'duotoneForest', 'duotoneLight', 'duotoneSea',
//     'duotoneSpace', 'funky', 'ghcolors', 'gruvboxDark', 'gruvboxLight', 'holiTheme', 'hopscotch', 'lucario',
//     'materialDark', 'materialLight', 'materialOceanic', 'nightOwl', 'nord', 'okaidia', 'oneDark', 'oneLight',
//     'pojoaque', 'prism', 'shadesOfPurple', 'solarizedDarkAtom', 'solarizedlight', 'synthwave84', 'tomorrow', 'twilight',
//     'vs', 'vscDarkPlus', 'xonokai', 'zTouch'
// ];
//
// export function CodeStyles(codeStyle: string) {
//     switch (codeStyle) {
//         case 'a11yDark':
//             return { a11yDark };
//         case 'atomDark':
//             return { atomDark };
//         case 'base16AteliersulphurpoolLight':
//             return { base16AteliersulphurpoolLight };
//         case 'cb':
//             return { cb };
//         case 'coldarkCold':
//             return { coldarkCold };
//         case 'coldarkDark':
//             return { coldarkDark };
//         case 'coyWithoutShadows':
//             return { coyWithoutShadows };
//         case 'coy':
//             return { coy };
//         case 'darcula':
//             return { darcula };
//         case 'dark':
//             return { dark };
//         case 'dracula':
//             return { dracula };
//         case 'duotoneDark':
//             return { duotoneDark };
//         case 'duotoneEarth':
//             return { duotoneEarth };
//         case 'duotoneForest':
//             return { duotoneForest };
//         case 'duotoneLight':
//             return { duotoneLight };
//         case 'duotoneSea':
//             return { duotoneSea };
//         case 'duotoneSpace':
//             return { duotoneSpace };
//         case 'funky':
//             return { funky };
//         case 'ghcolors':
//             return { ghcolors };
//         case 'gruvboxDark':
//             return { gruvboxDark };
//         case 'gruvboxLight':
//             return { gruvboxLight };
//         case 'holiTheme':
//             return { holiTheme };
//         case 'hopscotch':
//             return { hopscotch };
//         case 'lucario':
//             return { lucario };
//         case 'materialDark':
//             return { materialDark };
//         case 'materialLight':
//             return { materialLight };
//         case 'materialOceanic':
//             return { materialOceanic };
//         case 'nightOwl':
//             return { nightOwl };
//         case 'nord':
//             return { nord };
//         case 'okaidia':
//             return { okaidia };
//         case 'oneDark':
//             return { oneDark };
//         case 'oneLight':
//             return { oneLight };
//         case 'pojoaque':
//             return { pojoaque };
//         case 'prism':
//             return { prism };
//         case 'shadesOfPurple':
//             return { shadesOfPurple };
//         case 'solarizedDarkAtom':
//             return { solarizedDarkAtom };
//         case 'solarizedlight':
//             return { solarizedlight };
//         case 'synthwave84':
//             return { synthwave84 };
//         case 'tomorrow':
//             return { tomorrow };
//         case 'twilight':
//             return { twilight };
//         case 'vs':
//             return { vs };
//         case 'vscDarkPlus':
//             return { vscDarkPlus };
//         case 'xonokai':
//             return { xonokai };
//         case 'zTouch':
//             return { zTouch };
//         default:
//             return { lucario };
//     }
// }