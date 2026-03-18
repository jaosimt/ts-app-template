import { BsBuildingGear } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { VscVmRunning } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router';
import Button from '../components/partials/button';
import { ThemeProp } from '../constants/interfaces';
import {classNames} from '../utils';
import { getSecondaryBaseColor } from '../utils/themeUtils';

const mainNav = [
    {path: '/', label: 'Home', icon: FaHome},
    {path: '/specs', label: 'Component Specs', icon: BsBuildingGear},
    {path: '/demo', label: 'Component Demo', icon: VscVmRunning}
];

const NavigationMain = ({theme}: { theme: ThemeProp }) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    return <div className="display-flex flex-direction-column gap-0p5"
                style={{color: getSecondaryBaseColor(theme)}}>
        {
            mainNav.map((nav, i) => <Button
                key={`button-nav-${i}`}
                className={classNames((pathname === nav.path || (nav.path==='/demo' && pathname.startsWith('/demo'))) && 'default no-hover', 'white-space-nowrap')}
                icon={nav.icon}
                align={'space-between'}
                width={'100%'}
                onClick={() => navigate(nav.path)}
            >
                {nav.label}
            </Button>)
        }
    </div>
};

export default NavigationMain;

/* https://reactrouter.com/start/framework/navigating#navlink */