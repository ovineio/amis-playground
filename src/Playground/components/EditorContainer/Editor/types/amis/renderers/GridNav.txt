import React from 'react';
import { ClassName, RendererProps } from 'amis-core';
import { BaseSchema, SchemaTokenizeableString, SchemaTpl, SchemaUrlPath } from '../Schema';
import { ActionSchema } from './Action';
import { GridNavDirection } from 'amis-ui';
import { BadgeObject } from 'amis-ui';
export interface ListItemSchema extends Omit<BaseSchema, 'type'> {
    /**
     * 单项点击事件
     */
    clickAction?: ActionSchema;
    /**
     * 跳转地址
     */
    link?: string;
    /**
     * 打开方式
     */
    blank?: string;
    /**
     * 图片地址
     */
    icon?: SchemaUrlPath;
    /**
     * 描述
     */
    text?: SchemaTpl;
    /**
     * 图标最大宽度比例 0-100
     */
    iconRatio?: number;
    /**
     * 角标
     */
    badge?: BadgeObject;
}
/**
 * List 列表展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/card
 */
export interface ListSchema extends BaseSchema {
    /**
     * 指定为 List 列表展示控件。
     */
    type: 'grid-nav';
    /**
     * 列表项类名
     */
    itemClassName?: ClassName;
    /**
     * 列表项内容类名
     */
    contentClassName?: ClassName;
    /**
     * 静态图片列表配置
     */
    options?: Array<ListItemSchema>;
    /**
     * 是否将列表项固定为正方形
     */
    square?: boolean;
    /**
     * 是否将列表项内容居中显示
     */
    center?: boolean;
    /**
     * 是否显示列表项边框
     */
    border?: boolean;
    /**
     * 列表项之间的间距，默认单位为px
     */
    gutter?: number;
    /**
     * 图标宽度占比, 1-100
     */
    iconRatio?: number;
    /**
     * 列表项内容排列的方向，可选值为 horizontal 、vertical
     */
    direction?: GridNavDirection;
    /**
     * 列数
     */
    columnNum?: number;
    /**
     * 数据源: 绑定当前环境变量
     *
     * @default ${items}
     */
    source?: SchemaTokenizeableString;
}
export interface Column {
    type: string;
    [propName: string]: any;
}
export interface ListProps extends RendererProps, Omit<ListSchema, 'type' | 'className'> {
    handleClick: (item?: ListItemSchema) => void;
}
export default class List extends React.Component<ListProps, object> {
    handleClick(item: ListItemSchema): (e: React.MouseEvent) => void;
    render(): React.JSX.Element | null;
}
