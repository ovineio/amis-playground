import React from 'react';
import InputDateRange, { DateRangeControlSchema } from './InputDateRange';
/**
 * YearRange 年份范围控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/input-year-range
 */
export interface YearRangeControlSchema extends Omit<DateRangeControlSchema, 'type'> {
    type: 'input-year-range';
}
export default class YearRangeControl extends InputDateRange {
    render(): React.JSX.Element;
}
export declare class YearRangeControlRenderer extends YearRangeControl {
    static defaultProps: {
        format: string;
        inputFormat: string;
        joinValues: boolean;
        delimiter: string;
        /** shortcuts的兼容配置 */
        ranges: string;
        shortcuts: string;
        animation: boolean;
    };
}
