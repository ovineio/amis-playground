import { PlainObject } from '../types';
export declare function resolveMapping(value: any, data: PlainObject, defaultFilter?: string, ignoreIfNotMatch?: boolean): any;
/**
 * 遍历对象，对每个字符串 key 进行数据映射
 * @param value 要映射的对象
 * @param data 数据上下文
 */
export declare function resolveMappingObject(value: PlainObject, data: PlainObject): PlainObject;
export declare function dataMapping(to: any, from?: PlainObject, ignoreFunction?: boolean | ((key: string, value: any) => boolean), convertKeyToPath?: boolean, ignoreIfNotMatch?: boolean): any;
