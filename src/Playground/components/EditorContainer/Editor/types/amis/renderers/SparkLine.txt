import { RendererProps } from 'amis-core';
import React from 'react';
import { BaseSchema, SchemaClassName } from '../Schema';
import { ActionSchema } from './Action';
export interface SparkLineSchema extends BaseSchema {
    type: 'sparkline';
    /**
     * css 类名
     */
    className?: SchemaClassName;
    /**
     * 关联数据变量。
     */
    name?: string;
    /**
     * 宽度
     * @default 100
     */
    width?: number;
    /**
     * 高度
     * @default 50
     */
    height?: number;
    /**
     * 点击行为
     */
    clickAction?: ActionSchema;
    /**
     * 空数据时显示的内容
     */
    placeholder?: string;
    value?: Array<number | {
        value: number;
        label?: string;
    }>;
}
interface SparkLineRendProps extends RendererProps, Omit<SparkLineSchema, 'type' | 'className'> {
}
export declare class SparkLineRenderer extends React.Component<SparkLineRendProps> {
    handleClick(e: React.MouseEvent, ctx: any): void;
    render(): React.JSX.Element;
}
export {};
