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
import styled from 'styled-components';
import { classNames } from '../../../utils';
import Dropdown from '../../partials/dropdown';
import Tab, { TabItemType } from '../../partials/tab';
import SpecsBox from './specs/box';
import SpecsButton from './specs/buttons';
import SpecsCheckbox from './specs/checkbox';
import SpecsDrawer from './specs/drawer';
import SpecsDropdown from './specs/dropdown';
import SpecsInputField from './specs/inputFields';
import SpecsLoading from './specs/loading';
import SpecsModal from './specs/modal';
import SpecsPortalWindow from './specs/windowPortal';
import SpecsTab from './specs/tab';
import SpecsToast from './specs/toast';

import { $gridBorderColor } from '../../../styles/variables';

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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        h1 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        [data-component="dropdown"] {
        }
    }
`;

// noinspection CssUnusedSymbol
const Grid = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto auto;

    > * {
        padding: 0.5rem;
        border-left: 1px solid ${$gridBorderColor};
        border-bottom: 1px solid ${$gridBorderColor};

        &:nth-child(-n+4) { border-top: 1px solid ${$gridBorderColor}; }

        &:nth-child(4n) { border-right: 1px solid ${$gridBorderColor}; }
        
        .mobile-only { display: none; }
    }
    
    @media (max-width: 768px) {
        grid-template-columns: auto;
        > * {
            padding: 0.25rem;
            border: unset !important;
            
            &.description {
                margin-bottom: 1rem;
            }
            
            &.indent-row {
                padding-left: 1rem;
                align-items: flex-start;
                display: flex;
                flex-direction: column;
                
                .mobile-only {
                    display: inline;
                    padding-right: 0.3rem;
                    color: #999;
                    font-size: 0.5rem;
                }
            }
        }
    }
`;

const ComponentSpecs: FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>(sessionStorage.getItem('rshTheme') || 'nightOwl');

    const tabData: TabItemType[] = [
        {
            name: 'Box',
            content: <SpecsBox selectedTheme={selectedTheme}/>
        }, {
            name: 'Button',
            content: <SpecsButton selectedTheme={selectedTheme}/>
        }, {
            name: 'Checkbox',
            content: <SpecsCheckbox selectedTheme={selectedTheme}/>
        }, {
            name: 'Drawer',
            content: <SpecsDrawer selectedTheme={selectedTheme}/>
        }, {
            name: 'Dropdown',
            content: <SpecsDropdown selectedTheme={selectedTheme}/>
        }, {
            name: 'InputField',
            content: <SpecsInputField selectedTheme={selectedTheme}/>
        }, {
            name: 'Loading',
            content: <SpecsLoading selectedTheme={selectedTheme}/>
        }, {
            name: 'Modal',
            content: <SpecsModal selectedTheme={selectedTheme}/>
        }, {
            name: 'Tabs',
            content: <SpecsTab selectedTheme={selectedTheme}/>
        }, {
            name: 'Toast',
            content: <SpecsToast selectedTheme={selectedTheme}/>
        }, {
            name: 'WindowPortal',
            content: <SpecsPortalWindow selectedTheme={selectedTheme}/>
        }
    ];

    const handleThemeChange = (value: string) => {
        setSelectedTheme(value);
        sessionStorage.setItem('rshTheme', value);
    };

    return <div data-component={'home'} className={'width-100p'}>
        <Header className={'background'}>
            <h1 className={'m-0 line-height-1'}>Custom Component Specs</h1>
            <Dropdown maxDropdownHeight={300} options={Object.keys(themes)} selected={selectedTheme}
                      onChange={handleThemeChange}/>
        </Header>
        <Tab minContentHeight={300} id={'component-specs'} rememberActiveTab={true} data={tabData}/>
    </div>;
};

export default ComponentSpecs;

export type PropsListProps = {
    name: any;
    types: any;
    values: any
    description: any[]
}

export const propsList: FC<PropsListProps[]> = (props) => <Grid
    className={classNames(
        'line-height-normal',
        'font-monospace',
        'color-black',
        'font-size-smaller',
    )}
>
    {
        props.map(({name, types, values, description}, i) => <Fragment key={i}>
            <strong>{name}</strong>
            <span className={'indent-row'}><span className="mobile-only">Type:</span>{types}</span>
            <span className={'indent-row'}><span className="mobile-only">Value:</span><i>{values}</i></span>
            <span className={'description indent-row'}><span className="mobile-only">Description:</span>{description.map((d, j) => <span key={j} className={'display-block'}>{d}</span>)}</span>
        </Fragment>)
    }
</Grid>;