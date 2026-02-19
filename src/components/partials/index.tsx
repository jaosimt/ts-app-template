import React, { FC } from 'react';
import { IconProps } from '../../interafaces';

export const ReactIcon: FC<IconProps> = ({icon: Icon, size, className}) => {
    /* "react": ["./node_modules/@types/react"] could also be added to tsconfig.json */
    // @ts-ignore
    return <Icon size={size} className={className}/>
}