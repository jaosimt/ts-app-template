import React, { FC } from 'react';
import { IconProps } from '../../interafaces';

// @ts-ignore // "react": ["./node_modules/@types/react"] could also be added to tsconfig.json
const ReactIcon: FC<IconProps> = ({icon: Icon, size, className, onClick}) => <Icon onClick={onClick} size={size} className={className}/>;

export default ReactIcon;