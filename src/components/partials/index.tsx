import { CSSProperties, FC } from 'react';
import { IconType } from 'react-icons';

export interface ReactIconProps {
    icon: IconType;
    size?: number;
    className?: string;
    onClick?: Function;
    style?: CSSProperties;
}

// @ts-ignore // "react": ["./node_modules/@types/react"] could also be added to tsconfig.json
const ReactIcon: FC<ReactIconProps> = ({icon: Icon, size, className, onClick, style}) => <Icon onClick={onClick} size={size} className={className} style={style}/>;

export { ReactIcon };

