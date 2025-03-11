import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection } from '../Schema';
/**
 * AnchorNavSection 锚点区域渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/anchor-nav
 */
export type AnchorNavSectionSchema = {
    /**
     * 导航文字说明
     */
    title: string;
    /**
     * 锚点链接
     */
    href?: string;
    /**
     * 内容
     */
    body?: SchemaCollection;
    /**
     * 子节点
     */
    children?: Array<AnchorNavSectionSchema>;
} & Omit<BaseSchema, 'type'>;
/**
 * AnchorNav 锚点导航渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/anchor-nav
 */
export interface AnchorNavSchema extends BaseSchema {
    /**
     * 指定为 AnchorNav 锚点导航渲染器
     */
    type: 'anchor-nav';
    /**
     * 楼层集合
     */
    links: Array<AnchorNavSectionSchema>;
    /**
     * 被激活（定位）的楼层
     */
    active?: string | number;
    /**
     * 样式名
     */
    className?: SchemaClassName;
    /**
     * 导航样式名
     */
    linkClassName?: SchemaClassName;
    /**
     * 楼层样式名
     */
    sectionClassName?: SchemaClassName;
    direction?: 'vertical' | 'horizontal';
}
export interface AnchorNavProps extends RendererProps, Omit<AnchorNavSchema, 'className' | 'linkClassName' | 'sectionClassName'> {
    active?: string | number;
    sectionRender?: (section: AnchorNavSectionSchema, props: AnchorNavProps, index: number | string) => JSX.Element;
}
export interface AnchorNavState {
    active: any;
}
export default class AnchorNav extends React.Component<AnchorNavProps, AnchorNavState> {
    static defaultProps: Partial<AnchorNavProps>;
    renderSection?: (section: AnchorNavSectionSchema, props: AnchorNavProps, index: number | string) => JSX.Element;
    constructor(props: AnchorNavProps);
    getActiveSection(links: Array<AnchorNavSectionSchema>, active: string | number | undefined, section: AnchorNavSectionSchema | null): AnchorNavSectionSchema | null;
    handleSelect(key: any): void;
    locateTo(index: number): void;
    renderSections(links: AnchorNavSectionSchema[], parentIdx?: string | number): (JSX.Element | null)[];
    render(): React.JSX.Element | null;
}
export declare class AnchorNavRenderer extends AnchorNav {
}
