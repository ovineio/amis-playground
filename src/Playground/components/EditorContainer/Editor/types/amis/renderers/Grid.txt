import React from 'react';
import { FormHorizontal, RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection } from '../Schema';
import { SpinnerExtraProps } from 'amis-ui';
export declare const ColProps: string[];
export type GridColumnObject = {
    /**
     * 组件唯一 id
     */
    id?: string;
    /**
     * 极小屏（<768px）时宽度占比
     */
    xs?: number | 'auto';
    /**
     * 小屏时（>=768px）宽度占比
     */
    sm?: number | 'auto';
    /**
     * 中屏时(>=992px)宽度占比
     */
    md?: number | 'auto';
    /**
     * 大屏时(>=1200px)宽度占比
     */
    lg?: number | 'auto';
    /**
     * 垂直对齐方式
     */
    valign?: 'top' | 'middle' | 'bottom' | 'between';
    /**
     * 配置子表单项默认的展示方式。
     */
    mode?: 'normal' | 'inline' | 'horizontal';
    /**
     * 如果是水平排版，这个属性可以细化水平排版的左右宽度占比。
     */
    horizontal?: FormHorizontal;
    body?: SchemaCollection;
    /**
     * 列类名
     */
    columnClassName?: SchemaClassName;
    /**
     * 样式
     */
    style?: any;
    wrapperCustomStyle?: any;
    themeCss?: any;
};
export type GridColumn = GridColumnObject;
export type ColumnNode = GridColumn;
export interface ColumnArray extends Array<ColumnNode> {
}
/**
 * Grid 格子布局渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/grid
 */
export interface GridSchema extends BaseSchema {
    /**
     * 指定为 Grid 格子布局渲染器。
     */
    type: 'grid';
    /**
     * 列集合
     */
    columns: Array<GridColumn>;
    /**
     * 水平间距
     */
    gap?: 'xs' | 'sm' | 'base' | 'none' | 'md' | 'lg';
    /**
     * 垂直对齐方式
     */
    valign?: 'top' | 'middle' | 'bottom' | 'between';
    /**
     * 水平对齐方式
     */
    align?: 'left' | 'right' | 'between' | 'center';
}
export interface GridProps extends RendererProps, Omit<GridSchema, 'type' | 'className' | 'columnClassName'>, SpinnerExtraProps {
    itemRender?: (item: any, length: number, props: any) => JSX.Element;
}
export default class Grid<T> extends React.Component<GridProps & T, object> {
    static propsList: Array<string>;
    static defaultProps: {};
    renderChild(region: string, node: SchemaCollection, length: number, props?: any): JSX.Element;
    renderColumn(column: ColumnNode, key: number, length: number): React.JSX.Element;
    renderColumns(columns: ColumnArray): React.JSX.Element[] | null;
    render(): React.JSX.Element;
}
export declare class GridRenderer extends Grid<{}> {
}
