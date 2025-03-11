/**
 * 合并两次数据，满足轮训时总合并数据的需求，比如日志接口，每次返回一部分，但是前端组件需要全部展示。
 *
 * @param data
 * @param origin
 * @param keys
 */
export declare function concatData(data: any, origin: any, keys: string | string[]): any;
