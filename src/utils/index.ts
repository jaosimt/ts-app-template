export const isString = (str: unknown, validateNotEmpty: boolean = false): str is string =>
    validateNotEmpty
        ? typeof str === "string" && str.trim() !== ""
        : typeof str === "string";

export const filterDuplicates = <T>(array: readonly T[]): T[] =>
    array.filter((item, index, ar) => ar.findIndex((target) => target === item) === index);

export const classNames = (...args: unknown[]): string =>
    filterDuplicates(Array.from(args).filter((x): x is string => isString(x, true))).join(" ");