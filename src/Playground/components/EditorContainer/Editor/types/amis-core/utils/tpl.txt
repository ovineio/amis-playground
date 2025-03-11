export interface Enginer {
    test: (tpl: string) => boolean;
    removeEscapeToken?: (tpl: string) => string;
    compile: (tpl: string, data: object, ...rest: Array<any>) => string;
    asyncCompile: (tpl: string, data: object, ...rest: Array<any>) => Promise<string>;
}
export declare function registerTplEnginer(name: string, enginer: Enginer): void;
export declare function filter(tpl?: any, data?: object, ...rest: Array<any>): string;
export declare function asyncFilter(tpl?: any, data?: object, ...rest: Array<any>): Promise<string>;
export declare function setCustomEvalExpression(fn: (expression: string, data?: any) => boolean): void;
export declare function evalExpression(expression: string, data?: object): boolean;
/**
 * 解析表达式（支持condition-builder）
 * @param expression 表达式 or condition-builder对象
 * @param data 上下文
 * @returns
 */
export declare function evalExpressionWithConditionBuilderAsync(expression: any, data?: object, defaultResult?: boolean): Promise<boolean>;
/**
 * 解析表达式（支持condition-builder）
 * @param expression 表达式 or condition-builder对象
 * @param data 上下文
 * @returns
 */
export declare function evalExpressionWithConditionBuilder(expression: any, data?: object, defaultResult?: boolean): boolean | Promise<boolean>;
export declare function setCustomEvalJs(fn: (expression: string, data?: any) => any): void;
export declare function evalJS(js: string, data: object): any;
