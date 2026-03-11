import React, { ReactNode } from 'react';

export const createLink = (label: string | ReactNode, url: string, className?: string, target?: '_blank' | '_self' | '_parent' | '_top') =>
    <a className={className || ''} target={target || '_blank'} href={url} rel='noreferrer'><b className={className || ''}>{label}</b></a>;

export const CssColors = <span>All {createLink(
    'CSS Colors',
    'https://www.w3schools.com/cssref/css_colors.php'
)} including {createLink(
    'HSLs',
    '//www.w3schools.com/css/css_colors_hsl.asp'
)}, {createLink(
    'HEXs',
    '//www.w3schools.com/css/css_colors_hex.asp'
)} and {createLink(
    'RGBs',
    '//www.w3schools.com/css/css_colors_rgb.asp'
)}</span>;
