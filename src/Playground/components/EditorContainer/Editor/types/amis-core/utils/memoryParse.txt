import type { ASTNode } from 'amis-formula';
export declare function memoryParse(input: string, options?: {
    /**
     * 直接是运算表达式？还是从模板开始 ${} 里面才算运算表达式
     */
    evalMode?: boolean;
    /**
     * 只支持取变量。
     */
    variableMode?: boolean;
    /**
     * 是否允许 filter 语法，比如：
     *
     * ${abc | html}
     */
    allowFilter?: boolean;
    variableNamespaces?: Array<string>;
}): ASTNode | undefined;
