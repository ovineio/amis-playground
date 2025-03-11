/**
 * 用于存储当前可用运算器，默认支持 tpl、formula、js、var 四种类型运算器
 * 备注：在这里统一参数。
 */
export declare const FormulaExec: {
    [key: string]: Function;
};
export declare function formulaExec(value: any, data: any, execMode?: string | boolean): any;
export declare function registerFormulaExec(execMode: string, formulaExec: Function): void;
export declare function isExpression(expression: any): boolean;
export declare function isNeedFormula(expression: any, prevData: {
    [propName: string]: any;
}, curData: {
    [propName: string]: any;
}): boolean;
export declare function replaceExpression(expression: any): any;
