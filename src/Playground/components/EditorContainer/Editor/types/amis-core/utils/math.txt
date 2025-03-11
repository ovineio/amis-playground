export declare function safeAdd(arg1: number, arg2: number): number;
export declare function safeSub(arg1: number, arg2: number): number;
export declare function numberFormatter(num: number | string, precision?: number): string;
/**
 * 判断一个数字是否为整数，且在给定范围内
 *
 * @param num 要判断的数字
 * @param options 范围选项，包括 start、end、left、right
 * @param options.start 范围起始值
 * @param options.end 范围结束值
 * @param options.left 范围的左边界类型，默认为 'inclusive'，可选值为 'inclusive'(闭区间) 或 'exclusive'(开区间)
 * @param options.right 范围的右边界类型，默认为 'inclusive'，可选值为 'inclusive'(闭区间) 或 'exclusive'(开区间)
 * @returns 如果数字在给定范围内则返回 true，否则返回 false
 */
export declare function isIntegerInRange(num: number, options: {
    start: number;
    end: number;
    left: 'inclusive' | 'exclusive';
    right: 'inclusive' | 'exclusive';
}): boolean;
