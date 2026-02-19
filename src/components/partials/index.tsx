import React, { FC } from 'react';
import { IconProps } from '../../interafaces';

export const ReactIcon: FC<IconProps> = ({icon: Icon, size, className}) => {
    // @ts-ignore
    return <Icon size={size} className={className}/>
}