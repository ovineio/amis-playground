import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaCollection } from '../Schema';
/**
 * Divider 分割线渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/divider
 */
export interface DividerSchema extends BaseSchema {
    type: 'divider';
    lineStyle?: 'dashed' | 'solid';
    direction?: 'horizontal' | 'vertical';
    color?: string;
    rotate?: number;
    title?: SchemaCollection;
    titleClassName?: string;
    titlePosition?: 'left' | 'center' | 'right';
    [propName: string]: any;
}
export interface DividerProps extends RendererProps, Omit<DividerSchema, 'type' | 'className'> {
}
export default class Divider extends React.Component<DividerProps, object> {
    static defaultProps: Pick<DividerProps, 'className' | 'lineStyle' | 'titleClassName' | 'titlePosition'>;
    render(): React.JSX.Element;
}
export declare class DividerRenderer extends Divider {
}
