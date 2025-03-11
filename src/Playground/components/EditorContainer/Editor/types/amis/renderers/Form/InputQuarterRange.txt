import React from 'react';
import InputDateRange, { DateRangeControlSchema } from './InputDateRange';
/**
 * QuarterRange 季度范围控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/input-quarter-range
 */
export interface QuarterRangeControlSchema extends Omit<DateRangeControlSchema, 'type'> {
    type: 'input-quarter-range';
}
export default class QuarterRangeControl extends InputDateRange {
    render(): React.JSX.Element;
}
export declare class QuarterRangeControlRenderer extends QuarterRangeControl {
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
