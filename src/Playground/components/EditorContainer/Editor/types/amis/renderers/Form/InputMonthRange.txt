import React from 'react';
import InputDateRange, { DateRangeControlSchema } from './InputDateRange';
/**
 * MonthRange 月范围控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/month-range
 */
export interface MonthRangeControlSchema extends Omit<DateRangeControlSchema, 'type'> {
    type: 'input-month-range';
}
export default class MonthRangeControl extends InputDateRange {
    render(): React.JSX.Element;
}
export declare class MonthRangeControlRenderer extends MonthRangeControl {
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
