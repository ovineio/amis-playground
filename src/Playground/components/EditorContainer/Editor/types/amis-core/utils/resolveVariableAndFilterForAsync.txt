/**
 * 设置自定义函数，functions中找不到处理的函数时执行
 * @param fn
 */
export declare function setFormulaEvalErrorHandler(fn: (path: string, data?: object, ...args: any[]) => any): void;
export declare const resolveVariableAndFilterForAsync: (path?: string, data?: object, defaultFilter?: string, fallbackValue?: (value: any) => any, skipFormulaEvalErrorHandler?: boolean) => Promise<any>;
