import { CSSProperties, FC, Fragment, useState } from 'react';
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
import { BoxComponentSpecs } from '../../../constants/specs/box';
import { ButtonComponentSpecs } from '../../../constants/specs/buttons';
import InputFieldsProps from '../../../constants/specs/inputFields';
import { classNames, ProperCase } from '../../../utils';
import Box from '../../partials/box';

export interface SelectedThemeProps {
    selectedTheme: string;
}

// Define the type for the theme object
export type Theme = Record<string, CSSProperties>;

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
        <div className={'display-flex justify-content-space-between align-items-end'}>
            <h1 className={'mt-0 line-height-1'}>Home</h1>
            <div className={'display-flex justify-content-space-between'}>
                &nbsp;
                <select value={selectedTheme} onChange={handleThemeChange} style={{ marginLeft: '10px' }}>
                    {Object.keys(themes).map((themeName) => (
                        <option key={themeName} value={themeName}>
                            {ProperCase(themeName)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <Box
            borderColor={'#000000'}
            className={'p-0p5'}
            width={'100%'}
            label={'COMPONENTS'}
            borderRadius={4}
        >
            <BoxComponentSpecs selectedTheme={selectedTheme}/>
            <ButtonComponentSpecs selectedTheme={selectedTheme}/>
            <InputFieldsProps selectedTheme={selectedTheme}/>
        </Box>
    </div>
};

export default Home;

export type PropsListProps = {
    name: string;
    types: string;
    values: any
    description: any[]
}

export const propsList: FC<PropsListProps[]> = (props) => <div
    className={classNames(
        'grid',
        'cols-4',
        'auto',
        'line-height-normal',
        'width-fit-content',
        'font-monospace',
        'color-black', 'font-size-smaller')}>
    {
        props.map(({name, types, values, description}, i) => <Fragment key={i}>
            <strong>{name}</strong>
            <span>{types}</span>
            <i>{values}</i>
            <span>
                    {description.map((d, j) => <span key={j} className={'display-block'}>{d}</span>)}
                </span>
        </Fragment>)
    }
</div>;