import { ColorTranslator } from 'colortranslator';
import { ComponentType, lazy, SubmitEvent } from 'react';
import { CSSUnit, HSLString, RGBString } from '../types';

export const isNull = (arg: any) => arg === null;
export const isNullOrUndefined = (arg: any) => isNull(arg) || arg === undefined;

export const isString = (str: unknown, validateNotEmpty: boolean = false) => typeof str !== 'string' ? false : (validateNotEmpty ? str.trim() !== '' : true);

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
        // Shift hue by n degrees for each step
        const newHue = (h + (i * stepShift)) % 360;
        palette.push(`hsl(${Math.round(newHue)},${Math.round(s)}%,${Math.round(l)}%)`);
    }

    return palette;
};

export function ProperCase(input: string): string {
    return input
        .trim()
        // convert separators to spaces
        .replace(/[_-]+/g, ' ')
        // space between lower->upper: "nightOwl" -> "night Owl"
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        // space between acronym->word: "JSONData" -> "JSON Data"
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export function parseCSSUnit(cssUnit: CSSUnit): CSSUnit {
    return String(cssUnit).match(/\d$/) ? `${parseFloat(String(cssUnit))}px` : cssUnit as CSSUnit;
}

export const getFormData = (event: SubmitEvent<HTMLFormElement>): Record<string, any> => {
    event.preventDefault(); // Stop default behavior

    // Access the form element via the currentTarget
    const formData = new FormData(event.currentTarget);

    // Convert to a JavaScript object for easier use
    return Object.fromEntries(formData.entries());
};

export const isDate = (arg: string) => {
    const _date = new Date(arg);
    return !isNaN(_date.valueOf());
};
export const isNumber = (arg: any, matchType?: boolean) =>
    matchType
        ? typeof arg === 'number' && Number.isFinite(arg)
        : Number.isFinite(parseFloat(arg)) &&
        String(arg)
            .replace(/,/g, '')
            ?.match(/^-*\d+(.\d+){0,1}$/) !== null;
export const parseIfNumberIsString = (arg: string) => (isNumber(arg) ? +arg : arg);
export const isBoolean = (arg: any) => typeof arg === 'boolean';
export const isFunction = (arg: any) => typeof arg === 'function';
export const isObject = (arg: any): boolean => typeof arg === 'object' && !isNull(arg);
export const isEmpty = (arg: any) => {
    if (isString(arg)) return arg.trim() === '';
    else if (isObject(arg) && !Array.isArray(arg)) {
        if (arg?.constructor?.name === 'DOMRect') return false;
        return Object.keys(arg).length === 0;
    } else if (Array.isArray(arg)) return arg.length === 0;
    else return isNullOrUndefined(arg);
};

export const snakeCase = (str: string, delimiter = '_', keepNumbers = false) => {
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

export const camelCase = (str: string) =>
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

export const deCamelCase = (str: string) =>
    isString(str, true)
        ? str
            .replace(/ *([A-Z])/gm, ' $1')
            .replace(/^./, m => m.toUpperCase())
            .trim()
        : str;

export const capitalize = (str: string, properCase = true) =>
    isString(str, true)
        ? properCase
            ? str.toLowerCase().replace(/(^|\s)\S/g, m => m.toUpperCase())
            : str.toLowerCase().replace(/(^|[.!?]) *./gm, m => m.toUpperCase())
        : str;

export const parseBooleanString = (value: string): boolean => value === 'true';

export const getTextWidth = (text: string, font: string): number => {
    let canvas = document.querySelector('#app-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (!context) return 0;

    context.font = font; // e.g., "16px Arial"
    const metrics = context.measureText(text);
    return metrics.width;
};

export const Round = (number: number, precision: number = 0) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(number * multiplier) / multiplier;
};

export const numberToWords = (num: number) => {
    if (num > 999999999999999) return 'Number exceeds maximum range!';
    if (num === 0) return 'Zero';

    let decimal = 0;

    if (!Number.isInteger(num)) {
        const numSplit = String(num).split('.').map(n => +n);
        num = numSplit[0];
        decimal = numSplit[1];
    }

    if (decimal > 999999999999999) return 'Decimal digits exceeds maximum range!';

    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    const tenths = ['Tenths', 'Hundredths', 'Thousandths', 'Ten-Thousandths', 'Hundred-Thousandths', 'Millionths', 'Ten-Millionths', 'Hundred-Millionths', 'Billionths', 'Ten-Billionths', 'Hundred-Billionths', 'Trillionth', 'Ten-Trillionths', 'Hundred-Trillionths'];

    const convertGroup = (n: number) => {
        let res = '';
        if (n >= 100) {
            res += units[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 10 && n < 20) {
            res += teens[n - 10] + ' ';
        } else {
            if (n >= 20) {
                res += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            }
            if (n > 0) {
                res += units[n] + ' ';
            }
        }
        return res;
    };

    const convert = (n: number) => {
        let result = '';
        let scaleIndex = 0;

        while (n > 0) {
            let group = n % 1000;
            if (group !== 0) {
                result = convertGroup(group) + scales[scaleIndex] + ' ' + result;
            }
            n = Math.floor(n / 1000);
            scaleIndex++;
        }

        return result.trim();
    };

    let result = convert(num);
    if (decimal > 0) result += `' And ' ${convert(decimal)} ${tenths[String(decimal).length]}`;

    return result;
};

export const inStringNumberToWords = (str: string) => {
    const strSplit = str.split(' ');
    const result = strSplit.map(s => isNumber(s) ? numberToWords(+s) : s);
    return result.join(' ');
};

export const getRandStr =
    (len: number, chars = 'poiuytrewqasdfghjklmnbvcxzMNBVCXZASDFGHJKLPOIUYTREWQ') => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');

/**
 * Automatically retries a lazy load by refreshing the browser once.
 * @param componentImport The dynamic import function (e.g., () => import('./MyComp'))
 * @returns A promise that resolves to the component
 */
export function LazyRetry<T extends ComponentType<any>>(
    componentImport: () => Promise<{ default: T }>
) {
    return lazy(() =>
        componentImport().catch((error) => {
            // Check if this specific session has already attempted a refresh
            const hasRefreshed = window.sessionStorage.getItem('retry-lazy-refreshed') === 'true';

            if (!hasRefreshed && error.name === 'ChunkLoadError') {
                // Mark as refreshed and reload the page
                window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
                window.location.reload();
                return {default: () => null} as unknown as { default: T };
            }

            // If already refreshed once and still failing, throw the error
            throw error;
        }).then((component) => {
            // If load succeeds (either first try or after refresh), reset the flag
            window.sessionStorage.setItem('retry-lazy-refreshed', 'false');
            return component;
        })
    );
}

/**
 * Converts an HSL color value to RGB.
 * Assumes H is in the range [0, 360], S and L are in the range [0, 100].
 * @param h Hue
 * @param s Saturation
 * @param l Lightness
 * @returns An array [r, g, b] where R, G, B are in the range [0, 255].
 */
export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const hslToHex = (hsl: HSLString): string => {
    const match = hsl.match(/^hsl\((\d+), *(\d+)%, *(\d+)%\)$/);
    if (match && match?.length < 4) return hsl;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, h, s, l] = match as [HSLString, `${number}`, `${number}`, `${number}`];
    const sNormalized = parseFloat(s) / 100;
    const lNormalized = parseFloat(l) / 100;

    const a = sNormalized * Math.min(lNormalized, 1 - lNormalized);
    const f = (n: number) => {
        const k = (n + parseFloat(h) / 30) % 12;
        const color = lNormalized - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        // Convert to Hex and prefix with "0" if required
        return Math.round(color * 255)
            .toString(16)
            .padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`;
};

export const isElementOnTop = (element: HTMLElement): boolean => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    // Calculate the center coordinates relative to the viewport
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Check if the coordinates are within the visible viewport bounds
    if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
        return false; // Element is off-screen or not fully visible
    }

    // Get the topmost element at the center point
    const topElement = document.elementFromPoint(x, y);

    // Compare the top element with the target element Z
    return topElement === element || element.contains(topElement);
};

export const hashCode = (s: any) =>
    String(s)
        .split('')
        .reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
