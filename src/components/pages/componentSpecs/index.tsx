import { CSSProperties, FC, Fragment } from 'react';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { classNames } from '../../../utils';
import { getSecondaryBaseColor } from '../../../utils/themeUtils';
import Tab, { TabItemType } from '../../partials/tab';
import SpecsBox from './specs/box';
import SpecsButton from './specs/buttons';
import SpecsCheckbox from './specs/checkbox';
import SpecsCollapsibleLink from './specs/collapsibleLink';
import SpecsDrawer from './specs/drawer';
import SpecsDropdown from './specs/dropdown';
import SpecsInputField from './specs/inputFields';
import SpecsLoading from './specs/loading';
import SpecsModal from './specs/modal';
import SpecsPortalWindow from './specs/windowPortal';
import SpecsTab from './specs/tab';
import SpecsToast from './specs/toast';

export interface SelectedThemeProps {
    selectedTheme: string;
    theme: ThemeProp;
}

// Define the type for the theme object
type ThemeType = Record<string, CSSProperties>;

// Map of theme names to imported theme objects
export const themes: Record<string, ThemeType> = {
    'oneLight': oneLight,
    'oneDark': oneDark,
};

const Container = styled.div`
    padding-right: 2rem;
    
    @media (max-width: 768px) {
        padding-right: 0.5rem;
    }
`;

const Header = styled.div`
    display         : flex;
    justify-content : space-between;
    align-items     : flex-end;

    @media (max-width : 768px) {
        flex-direction : column;
        align-items    : flex-start;
        h1 {
            font-size     : 1.2rem;
            margin-bottom : 0.5rem;
        }

        [data-component="dropdown"] {
        }
    }
`;

// noinspection CssUnusedSymbol
const Grid = styled.div<{
    $theme: ThemeProp;
}>`
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto auto;

    > * {
        padding: 0.5rem;
        border-left: ${props => `1px solid ${getSecondaryBaseColor(props.$theme)}`};
        border-bottom: ${props => `1px solid ${getSecondaryBaseColor(props.$theme)}`};

        &:nth-child(-n+4) {
            border-top: ${props => `1px solid ${getSecondaryBaseColor(props.$theme)}`};
        }

        &:nth-child(4n) {
            border-right: ${props => `1px solid ${getSecondaryBaseColor(props.$theme)}`};
        }

        .mobile-only {
            display: none;
        }
    }

    @media (max-width: 768px) {
        grid-template-columns: auto;
        > * {
            padding: 0.25rem;
            border: unset !important;

            &.description {
                margin-bottom : 1rem;
            }

            &.indent-row {
                padding-left: 1rem;
                align-items: flex-start;
                display: flex;
                flex-direction: column;

                .mobile-only {
                    display       : inline;
                    padding-right : 0.3rem;
                    color         : #999;
                    font-size     : 0.5rem;
                }
            }
        }
    }
`;

const ComponentSpecs: FC<{ theme: ThemeProp }> = ({theme}) => {
    // const [selectedTheme, setSelectedTheme] = useState<string>(sessionStorage.getItem('rshTheme') || 'nightOwl');
    const selectedTheme = theme === Theme.DARK ? 'oneLight' : 'oneDark';

    const tabData: TabItemType[] = [
        {
            name: 'Box',
            content: <SpecsBox selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Button',
            content: <SpecsButton selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Checkbox',
            content: <SpecsCheckbox selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'CollapsibleLink',
            content: <SpecsCollapsibleLink selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Drawer',
            content: <SpecsDrawer selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Dropdown',
            content: <SpecsDropdown selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'InputField',
            content: <SpecsInputField selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Loading',
            content: <SpecsLoading selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Modal',
            content: <SpecsModal selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Tabs',
            content: <SpecsTab selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'Toast',
            content: <SpecsToast selectedTheme={selectedTheme} theme={theme}/>
        }, {
            name: 'WindowPortal',
            content: <SpecsPortalWindow selectedTheme={selectedTheme} theme={theme}/>
        }
    ];

    // const handleThemeChange = (value: string) => {
    //     setSelectedTheme(value);
    //     sessionStorage.setItem('rshTheme', value);
    // };

    return <Container data-component={'component-specs'} className={'width-100p'}>
        <Header>
            <h1 className={'line-height-1'}>Custom Component Specs</h1>
            {/*<Dropdown maxDropdownHeight={300} options={Object.keys(themes)} selected={selectedTheme} onChange={handleThemeChange}/>*/}
        </Header>
        <Tab minContentHeight={300} id={'component-specs'} rememberActiveTab={true} moveSelectedOnScroll={true}
             data={tabData} theme={theme}/>
    </Container>;
};

export default ComponentSpecs;

export type PropsListProps = {
    name: any;
    types: any;
    values: any
    description: any[]
}

export const propsList = (props: PropsListProps[], theme: ThemeProp) => {
    return <Grid
        className={classNames(
            'line-height-normal',
            'font-monospace',
            'font-size-smaller',
            'trim'
        )}
        $theme={theme}
    >
        {
            props.map(({name, types, values, description}, i) => <Fragment key={`props-${name}-${i}`}>
                <strong>{name}</strong>
                <span className={'indent-row'}><span className="mobile-only">Type:</span>{types}</span>
                <span className={'indent-row'}><span className="mobile-only">Value:</span><i>{Array.isArray(values) ? values.map((value, i) => <Fragment key={`value-${i}`}>{value}</Fragment>) : values}</i></span>
                <span className={'description indent-row'}>
                    <span className="mobile-only">Description:</span>
                    {description.map((d, j) => <span key={j} className={'display-block'}>{d}
                    </span>)}
                </span>
            </Fragment>)
        }
    </Grid>;
};
