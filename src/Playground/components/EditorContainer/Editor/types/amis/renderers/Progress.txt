import React from 'react';
import { RendererProps, ActionObject, IScopedContext } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaTpl } from '../Schema';
import type { ColorMapType } from 'amis-ui/lib/components/Progress';
/**
 * 进度展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/progress
 */
export interface ProgressSchema extends BaseSchema {
    type: 'progress';
    /**
     * 关联字段名
     */
    name?: string;
    /**
     * 进度值
     */
    value: number;
    /**
     * 进度条类型
     */
    mode: 'line' | 'circle' | 'dashboard';
    /**
     * 进度条 CSS 类名
     */
    progressClassName?: SchemaClassName;
    /**
     * 配置不同的值段，用不同的样式提示用户
     */
    map?: ColorMapType;
    /**
     * 是否显示值
     */
    showLabel?: boolean;
    /**
     * 占位符
     */
    placeholder?: string;
    /**
     * 是否显示背景间隔
     */
    stripe?: boolean;
    /**
     * 是否显示动画（只有在开启的时候才能看出来）
     */
    animate?: boolean;
    /**
     * 进度条线的宽度
     */
    strokeWidth?: number;
    /**
     * 仪表盘进度条缺口角度，可取值 0 ~ 295
     */
    gapDegree?: number;
    /**
     * 仪表盘进度条缺口位置
     */
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * 内容的模板函数
     */
    valueTpl?: string;
    /**
     * 阈值
     */
    threshold?: {
        value: SchemaTpl;
        color?: string;
    } | {
        value: SchemaTpl;
        color?: string;
    }[];
    /**
     * 是否显示阈值数值
     */
    showThresholdText?: boolean;
}
export interface ProgressProps extends RendererProps, Omit<ProgressSchema, 'type' | 'className'> {
}
interface ProgressState {
    value: number;
}
export declare class ProgressField extends React.Component<ProgressProps, ProgressState> {
    static defaultProps: {
        placeholder: string;
        progressClassName: string;
        progressBarClassName: string;
        map: string[];
        valueTpl: string;
        showLabel: boolean;
        stripe: boolean;
        animate: boolean;
    };
    constructor(props: ProgressProps);
    componentDidUpdate(prevProps: Readonly<ProgressProps>): void;
    getValue(): any;
    format(value: number): JSX.Element;
    render(): React.JSX.Element;
}
export declare class ProgressFieldRenderer extends ProgressField {
    static contextType: React.Context<IScopedContext>;
    constructor(props: ProgressProps, context: IScopedContext);
    componentWillUnmount(): void;
    doAction(action: ActionObject, data: any, throwErrors: boolean, args?: any): any;
    setData(value: number): void;
}
export {};
