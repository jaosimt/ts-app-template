import { ColorTranslator } from 'colortranslator';
import { SubmitEvent } from 'react';
import { CSSUnit, HSLString, RGBString } from '../types';

export const isString = (str: unknown, validateNotEmpty: boolean = false): str is string =>
    validateNotEmpty
        ? typeof str === 'string' && str.trim() !== ''
        : typeof str === 'string';

export const filterDuplicates = <T>(array: readonly T[]): T[] =>
    array.filter((item, index, ar) => ar.findIndex((target) => target === item) === index);

export const classNames = (...args: unknown[]): string =>
    filterDuplicates(Array.from(args).filter((x): x is string => isString(x, true))).join(' ');


export const generateHuePalette = (colorCount = 20, maxHue = 200) => {
    const hues = Array.from({length: colorCount}, (_, i) => Math.floor(i * (maxHue / colorCount)));

    const color = new ColorTranslator('yellow');
    const palette: RGBString[] = [];

    for (let r = 0; r < hues.length; r++) {
        color.setH(hues[r]);

        let rgb: RGBString = '';
        Object.values(color.RGBObject).map(x => Math.floor(x)).forEach((y, i) => {
            const floored = Math.floor(y);
            switch (i) {
                case 0:
                    rgb += `rgb(${floored},`;
                    break;
                case 1:
                    rgb += `${floored},`;
                    break;
                case 2:
                    rgb += `${floored})`;
            }
        });

        // REMOVE RED's & GREEN's AS REQUIRED FOR THE FEATURE
        const values: number[] = (color.RGB.match(/\d+\.?\d*/g) || []).map(Number);
        if (
            (values[0] === 255 && values[1] === 0) ||
            (values[0] === 0 && values[1] === 255) ||
            (values[1] === 255 && values[2] === 0) ||
            palette.includes(rgb as RGBString)
        ) {
            continue;
        }

        palette.push(rgb as RGBString);
    }

    return palette;
};


/**
 * Generates an analogous color palette based on an RGB input.
 * @param rgb - {Red, Green, Blue} channels (0-255)
 * @param count - Number of colors to generate
 * @param stepShift - Hue shift degrees step
 * @returns Array of HSL color strings
 */
export const generateAnalogousPalette = (rgb: {
    r: number,
    g: number,
    b: number
}, count: number = 5, stepShift: number = 30): string[] => {
    const {r, g, b} = rgb;

    // Helper to convert RGB to HSL tuple
    const toHSL = (r: number, g: number, b: number): [number, number, number] => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number = 0;
        let s: number = 0;
        const l: number = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    };

    const [h, s, l] = toHSL(r, g, b);
    const palette: HSLString[] = [];

    for (let i = 0; i < count; i++) {
        // Shift hue by 30 degrees for each step
        const newHue = (h + (i * stepShift)) % 360;
        palette.push(`hsl(${Math.round(newHue)},${Math.round(s)}%,${Math.round(l)}%)`);
    }

    return palette;
};

export function ProperCase(input: string): string {
    return input
        .trim()
        // convert separators to spaces
        .replace(/[_-]+/g, " ")
        // space between lower->upper: "nightOwl" -> "night Owl"
        .replace(/([a-z\d])([A-Z])/g, "$1 $2")
        // space between acronym->word: "JSONData" -> "JSON Data"
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
}

export function parseCSSUnit(cssUnit: string): CSSUnit {
    return cssUnit.match(/\d$/) ? `${Math.ceil(parseFloat(cssUnit))}px` : cssUnit as CSSUnit;
}

export const getFormData = (event: SubmitEvent<HTMLFormElement>): Record<string, any> => {
    event.preventDefault(); // Stop default behavior

    // Access the form element via the currentTarget
    const formData = new FormData(event.currentTarget);

    // Convert to a JavaScript object for easier use
    return Object.fromEntries(formData.entries());
};

export const isDate = (arg:string) => {
    const _date = new Date(arg);
    return !isNaN(_date.valueOf());
};
export const isNumber = (arg:any, matchType?:boolean) =>
    matchType
        ? typeof arg === 'number' && Number.isFinite(arg)
        : Number.isFinite(parseFloat(arg)) &&
        String(arg)
            .replace(/,/g, '')
            ?.match(/^-*\d+(.\d+){0,1}$/) !== null;
export const parseIfNumberIsString = (arg:string) => (isNumber(arg) ? +arg : arg);
export const isNull = (arg: any) => arg === null;
export const isBoolean = (arg: any) => typeof arg === 'boolean';
export const isFunction = (arg: any) => typeof arg === 'function';
export const isUndefined = (arg: any) => typeof arg === 'undefined';
export const isObject = (arg: any) => typeof arg === 'object' && !isNull(arg) && !Array.isArray(arg);
export const isNullOrUndefined = (arg: any) => isNull(arg) || isUndefined(arg);
export const isEmpty = (arg: any) => {
    if (isString(arg)) return arg.trim() === '';
    else if (isObject(arg)) {
        if (arg?.constructor?.name === 'DOMRect') return false;
        return Object.keys(arg).length === 0;
    } else if (Array.isArray(arg)) return arg.length === 0;
    else return isNullOrUndefined(arg);
};

export const snakeCase = (str:string, delimiter = '_', keepNumbers = false) => {
    if (!isString(str, true)) return str;

    str = str
        .replace(/\.+/gm, delimiter)
        .replace(/[/\\]/gm, delimiter)
        .replace(/[^a-z0-9]+/gim, ' ')
        .trim()
        .replace(/([a-z0-9 ])([A-Z])/gm, (w, m1, m2) => `${m1} ${m2}`)
        .replace(/([0-9 ])([a-z])/gim, (w, m1, m2) => `${m1} ${m2}`)
        .replace(/([A-Z]{2,})([a-z]{2,})/gm, (w, m1, m2) => `${m1} ${m2}`)
        .replace(new RegExp(`^${delimiter}+|${delimiter}+$`, 'gm'), '')
        .toLowerCase();

    if (!keepNumbers) str = str.replace(/[0-9]+/gm, ' ').trim() || 'empty string on snake case';
    else str = str.replace(/(\d+)/gm, ' $1 ').trim();

    return str.replace(/ +/gm, delimiter);
};

export const camelCase = (str:string) =>
    isString(str, true)
        ? str
            .replace(/[^a-z0-9]+/gim, ' ')
            .trim()
            .replace(/([a-z0-9 ])([A-Z])/gm, (w, m1, m2) => `${m1} ${m2}`)
            .replace(/([0-9 ])([a-z])/gim, (w, m1, m2) => `${m1} ${m2}`)
            .replace(/([A-Z]{2,})([a-z]{2,})/gm, (w, m1, m2) => `${m1} ${m2}`)
            .toLowerCase()
            .trim()
            .replace(/ +(\w)/gm, (w, m) => m.toUpperCase())
        : str;

export const deCamelCase = (str:string) =>
    isString(str, true)
        ? str
            .replace(/ *([A-Z])/gm, ' $1')
            .replace(/^./, m => m.toUpperCase())
            .trim()
        : str;

export const capitalize = (str:string, properCase = true) =>
    isString(str, true)
        ? properCase
            ? str.toLowerCase().replace(/(^|\s)\S/g, m => m.toUpperCase())
            : str.toLowerCase().replace(/(^|[.!?]) *./gm, m => m.toUpperCase())
        : str;

export const parseBooleanString = (value:string): boolean => value === 'true';