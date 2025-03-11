/**
 * 默认的 parseInt 如果解析失败会返回 NaN，这个函数会返回 0
 * @param value 要解析的值
 * @param defaultValue
 * @returns 默认按十进制解析，失败就返回 defaultValue 或 0
 */
export declare function toNumber(value: any, defaultValue?: number): number;
