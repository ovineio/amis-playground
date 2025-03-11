/**
 * @file 用来展示面包屑导航
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaIcon, SchemaUrlPath } from '../Schema';
import type { TestIdBuilder } from 'amis-core';
export type BreadcrumbBaseItemSchema = {
    /**
     * 文字
     */
    label?: string;
    /**
     * 图标类名
     */
    icon?: SchemaIcon;
    /**
     * 链接地址
     */
    href?: SchemaUrlPath;
} & Omit<BaseSchema, 'type'>;
export type BreadcrumbItemSchema = {
    /**
     * 文字
     */
    label?: string;
    /**
     * 图标类名
     */
    icon?: SchemaIcon;
    /**
     * 链接地址
     */
    href?: SchemaUrlPath;
    /**
     * 下拉菜单
     */
    dropdown?: Array<BreadcrumbBaseItemSchema>;
} & Omit<BaseSchema, 'type'>;
export type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right';
export type ItemPlace = 'start' | 'middle' | 'end';
/**
 * Breadcrumb 显示渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/breadcrumb
 */
export interface BreadcrumbSchema extends BaseSchema {
    /**
     *  指定为面包屑显示控件
     */
    type: 'breadcrumb';
    /**
     * 面包项类名
     */
    itemClassName?: string;
    /**
     * 分隔符
     */
    separator?: string;
    /**
     * 分隔符类名
     */
    separatorClassName?: string;
    /**
     * 下拉菜单类名
     */
    dropdownClassName?: string;
    /**
     * 下拉菜单项类名
     */
    dropdownItemClassName?: string;
    /**
     * 列表
     */
    items: Array<BreadcrumbItemSchema>;
    /**
     * labelMaxLength
     */
    labelMaxLength?: number;
    /**
     * 浮窗提示位置
     */
    tooltipPosition?: TooltipPositionType;
    testIdBuilder?: TestIdBuilder;
}
export interface BreadcrumbProps extends RendererProps, Omit<BreadcrumbSchema, 'type' | 'className'> {
}
export declare class BreadcrumbField extends React.Component<BreadcrumbProps, object> {
    render(): React.JSX.Element;
}
export declare class BreadcrumbFieldRenderer extends BreadcrumbField {
}
