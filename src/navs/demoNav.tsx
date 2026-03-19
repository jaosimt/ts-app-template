import { BsWindowStack } from 'react-icons/bs';
import { FaRegWindowMaximize } from 'react-icons/fa6';
import { FiLoader } from 'react-icons/fi';
import { GoReport } from 'react-icons/go';
import { LiaBoxSolid, LiaCheckSquare, LiaCircle } from 'react-icons/lia';
import { PiLinkSimpleHorizontalLight, PiTabsDuotone } from 'react-icons/pi';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import { RxDropdownMenu, RxInput } from 'react-icons/rx';
import { useLocation, useNavigate } from 'react-router';
import Button from '../components/partials/button';
import { ThemeProp } from '../constants/interfaces';
import { classNames, isMobile } from '../utils';
import { getSecondaryBaseColor } from '../utils/themeUtils';

const demoNav = [
    {path: '/demo/box', label: 'Box', icon: LiaBoxSolid},
    {path: '/demo/button', label: 'Button', icon: LiaCircle},
    {path: '/demo/checkbox', label: 'Checkbox', icon: LiaCheckSquare},
    {path: '/demo/collapsible-link', label: 'Collapsible Link', icon: PiLinkSimpleHorizontalLight},
    {path: '/demo/drawer', label: 'Drawer', icon: RiArchiveDrawerLine},
    {path: '/demo/dropdown', label: 'Dropdown', icon: RxDropdownMenu},
    {path: '/demo/input-field', label: 'Input Field', icon: RxInput},
    {path: '/demo/loading', label: 'Loading', icon: FiLoader},
    {path: '/demo/modal', label: 'Modal', icon: FaRegWindowMaximize},
    {path: '/demo/tabs', label: 'Tabs', icon: PiTabsDuotone},
    {path: '/demo/toast', label: 'Toast', icon: GoReport}
];

if (!isMobile()) demoNav.push({path: '/demo/window-portal', label: 'WindowPortal', icon: BsWindowStack});

const NavigationDemo = ({theme, sidePanelHandler}: { theme: ThemeProp, sidePanelHandler: Function }) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    return <div className="display-flex flex-direction-column gap-0p5"
                style={{color: getSecondaryBaseColor(theme)}}>
        {
            demoNav.map((nav, i) => <Button
                key={`button-nav-${i}`}
                className={classNames(pathname === nav.path && 'default no-hover', 'white-space-nowrap')}
                icon={nav.icon}
                align={'space-between'}
                width={'100%'}
                onClick={() => {
                    navigate(nav.path);
                    if (isMobile()) sidePanelHandler();
                }}
            >
                {nav.label}
            </Button>)
        }
    </div>
};

export default NavigationDemo;

/* https://reactrouter.com/start/framework/navigating#navlink */