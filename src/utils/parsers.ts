import { isObject } from "@/utils/typeof";

export const parseObject = (value: unknown): {[key: string]: unknown} => {
    if (!isObject(value)) throw new Error('Expected object');
    return value as {[key: string]: unknown};
};

export const parseString = (value: unknown): string => {
    if (typeof value !== 'string') throw new Error('Expected string');
    return value;
};

export const parseNumber = (value: unknown): number => {
    if (typeof value !== 'number') throw new Error('Expected number');
    return value;
};