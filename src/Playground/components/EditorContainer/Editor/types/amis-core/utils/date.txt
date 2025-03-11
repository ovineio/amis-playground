import moment from 'moment';
export declare const relativeValueRe: RegExp;
export declare const filterDate: (value: string, data?: object, format?: string, utc?: boolean) => moment.Moment;
export declare function parseDuration(str: string): moment.Duration | undefined;
/**
 * 解析日期，先尝试用 format 解析，如果失败，再尝试用其他标准格式解析
 * @param value
 * @param format
 * @returns
 */
export declare function normalizeDate(value: any, format?: string, options?: {
    utc?: boolean;
}): moment.Moment | undefined;
