import React from 'react';
import { OptionsControlProps } from 'amis-core';
import { FormOptionsSchema } from '../../Schema';
/**
 * 图表 Radio 单选框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/chart-radios
 */
export interface ChartRadiosControlSchema extends FormOptionsSchema {
    type: 'chart-radios';
    config: any;
    showTooltipOnHighlight?: boolean;
    chartValueField?: string;
}
export interface ChartRadiosProps extends OptionsControlProps {
    placeholder?: any;
    labelClassName?: string;
    labelField?: string;
    config: any;
}
export default class ChartRadiosControl extends React.Component<ChartRadiosProps, any> {
    highlightIndex: number;
    prevIndex: number;
    chart?: any;
    chartRef(chart?: any): void;
    highlight(index?: number): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    renderStatic(displayValue?: string): React.JSX.Element;
    render(): JSX.Element;
}
export declare class RadiosControlRenderer extends ChartRadiosControl {
    static defaultProps: {
        multiple: boolean;
    };
}
