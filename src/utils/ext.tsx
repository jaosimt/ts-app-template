import { ReactNode } from 'react';

export const createLink = (label: string | ReactNode, url: string, target?: '_blank' | '_self' | '_parent' | '_top') =>
    <a target={target || '_blank'} href={url}><b>{label}</b></a>;