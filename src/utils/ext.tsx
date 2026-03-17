import React, { ReactNode } from 'react';
import { ThemeProp } from '../constants/interfaces';
import { getAccentColor, getPrimaryColor } from './themeUtils';

export const createLink = (label: string | ReactNode, url: string, className?: string, target?: '_blank' | '_self' | '_parent' | '_top') =>
    <a className={className || ''} target={target || '_blank'} href={url} rel="noreferrer"><b
        className={className || ''}>{label}</b></a>;

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

export const themedLogoBase64 = (theme: ThemeProp) => {
    const logoString = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <g fill="${getPrimaryColor(theme)}" transform="translate(-107.44 -31.278) scale(.6115)">
            <path
                d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4Z"/>
            <circle cx="420.9" cy="296.5" r="45.7"/>
            <path d="M520.5 78.1Z"/>
        </g>
        <path style="fill: ${getAccentColor(theme)}; stroke: #fff; stroke-width: 1; stroke-linecap: butt; stroke-linejoin: miter; stroke-dasharray: none; stroke-opacity: 1" d="M133.618 132.828c-1.289 0-2.327.824-2.327 1.85l-.003 4.883-1.017.003c-1.05 0-1.9.877-1.9 1.966v2.967c0 1.088.85 1.958 1.9 1.965l1.017.008.003 9.414c0 7.373 2.325 10.853 8.16 11.172 5.086.276 8.854-.001 8.854-2.564.867 2.275 26.25 7.681 22.906-9.105-3.64-7.817-15.342-4.43-14.98-8.062.555-2.185 7.104-1.715 9.948.246 2.052 1.519 4.46 1.6 4.46-1.101l-.005-3.886c0-1.936-3.339-2.48-5.526-3.025-14.536-3.01-20.109 6.905-15.685 12.958 3.881 5.494 16.948 3.114 13.445 7.082-1.57.776-5.378 1.557-11.235-1.747-1.78-1.209-4.036-.834-3.774 2.102-1.541-3.08-8.397 4.869-8.407-4.186l.01-9.301 6.947-.003a1.895 1.962 0 0 0 1.896-1.968v-2.966c0-1.089-.845-1.965-1.896-1.965h-6.947l-.01-4.888c0-1.024-1.038-1.85-2.327-1.85zm1.57 3.61h.376v4.857c.047.57.006 1.134 1.175 1.73-.75.353-1.084.915-1.175 1.594v12.559c0 4.612 2.453 5.708 4.543 6.284-2.058-.493-4.542-.478-4.918-5.386V144.62c-.086-.605-.306-1.178-1.172-1.594.746-.29 1.137-.868 1.172-1.73zm29.43 6.592 2.164.577v.353zm-11.178 1.51c-3.5 5.504 1.521 7.49 6.32 8.376 8.255 1.054 9.266 4.154 6.911 8.206 1.638-3.925 0-6.897-6.33-7.875-11.664-.94-8.708-6.897-6.9-8.708zm-1.72 17.335c1.03.56 2.425 1.035 3.69 1.49-1.245-.281-2.53-.494-3.69-.917z"/>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(logoString)}`;
};

export const themedBannerBase64 = (theme: ThemeProp) => {
    const bannerString = `<svg width="301mm" height="56mm" viewBox="0 0 301 56" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${getPrimaryColor(theme)};fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m-441.019-147.475-.039 12.205c199.76 44.882 252.647-35.922 399.52 0l.04-12.205c-146.874-35.922-182.408 67.574-399.52 0z" transform="matrix(-.75333 0 0 .75434 -31.262 147.5)"/>
        <path style="fill:${getAccentColor(theme)};fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M-41.498-147.475c-146.874-35.922-182.408 67.574-399.52 0v-48.06h399.371z" transform="matrix(-.75333 0 0 .75434 -31.262 147.5)"/>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(bannerString)}`;
};

export const themedInvertedBannerBase64 = (theme: ThemeProp) => {
    const bannerString = `<svg width="301mm" height="56mm" viewBox="0 0 301 56" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <path style="fill:${getPrimaryColor(theme)};fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m-441.019-147.475-.039 12.205c199.76 44.882 252.647-35.922 399.52 0l.04-12.205c-146.874-35.922-182.408 67.574-399.52 0z" transform="matrix(.75333 0 0 -.75434 332.262 -91.5)"/>
        <path style="fill:${getAccentColor(theme)};fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M-41.498-147.475c-146.874-35.922-182.408 67.574-399.52 0v-48.06h399.371z" transform="matrix(.75333 0 0 -.75434 332.262 -91.5)"/>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(bannerString)}`;
};