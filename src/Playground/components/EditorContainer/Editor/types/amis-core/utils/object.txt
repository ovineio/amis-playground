export declare function createObject<P extends {
    [propName: string]: any;
} | null>(superProps?: P, props?: P, properties?: any): object;
export declare function extractObjectChain(value: any): object[];
export declare function createObjectFromChain(chain: Array<object>): object;
/**
 * 向最近一层插入新链
 * @param obj
 * @param value
 * @returns
 */
export declare function injectObjectChain(obj: any, value: any): object;
export declare function cloneObject(target: any, persistOwnProps?: boolean): any;
export declare function extendObject(target: any, src?: any, persistOwnProps?: boolean): any;
export declare function isObject(obj: any): any;
export declare function setVariable(data: {
    [propName: string]: any;
}, key: string, value: any, convertKeyToPath?: boolean): void;
export declare function deleteVariable(data: {
    [propName: string]: any;
}, key: string): void;
export declare function pickValues(names: string, data: object): any;
