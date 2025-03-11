import React from 'react';
import { RendererProps } from 'amis-core';
import { SchemaTpl, SchemaClassName, BaseSchema, SchemaCollection, SchemaIcon } from '../Schema';
import { ActionSchema } from './Action';
/**
 * 栏目容器渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/portlet
 */
export interface PortletTabSchema extends Omit<BaseSchema, 'type'> {
    /**
     * Tab 标题
     */
    title?: string;
    /**
     * 内容
     * @deprecated 用 body 属性
     */
    tab?: SchemaCollection;
    /**
     * 可以在右侧配置点其他功能按钮，随着tab切换而切换
     */
    toolbar?: Array<ActionSchema>;
    /**
     * 内容
     */
    body?: SchemaCollection;
    /**
     * 按钮图标
     */
    icon?: SchemaIcon;
    iconPosition?: 'left' | 'right';
    /**
     * 设置以后内容每次都会重新渲染
     */
    reload?: boolean;
    /**
     * 点开时才加载卡片内容
     */
    mountOnEnter?: boolean;
    /**
     * 卡片隐藏就销毁卡片节点。
     */
    unmountOnExit?: boolean;
}
export interface PortletSchema extends Omit<BaseSchema, 'type'> {
    /**
     * 指定为 portlet 类型
     */
    type: 'portlet';
    tabs: Array<PortletTabSchema>;
    /**
     * 关联已有数据，选项卡直接根据目标数据重复。
     */
    source?: string;
    /**
     * 类名
     */
    tabsClassName?: SchemaClassName;
    /**
     * 展示形式
     */
    tabsMode?: '' | 'line' | 'card' | 'radio' | 'vertical' | 'tiled';
    /**
     * 内容类名
     */
    contentClassName?: SchemaClassName;
    /**
     * 链接外层类名
     */
    linksClassName?: SchemaClassName;
    /**
     * 卡片是否只有在点开的时候加载？
     */
    mountOnEnter?: boolean;
    /**
     * 卡片隐藏的时候是否销毁卡片内容
     */
    unmountOnExit?: boolean;
    /**
     * 可以在右侧配置点其他功能按钮。不会随着tab切换
     */
    toolbar?: Array<ActionSchema>;
    /**
     * 是否支持溢出滚动
     */
    scrollable?: boolean;
    /**
     * header和内容是否展示分割线
     */
    divider?: boolean;
    /**
     * 标题右侧的描述
     */
    description?: SchemaTpl;
    /**
     * 隐藏头部
     */
    hideHeader?: boolean;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
}
export interface PortletProps extends RendererProps, Omit<PortletSchema, 'className' | 'contentClassName'> {
    activeKey?: number;
    tabRender?: (tab: PortletTabSchema, props: PortletProps, index: number) => JSX.Element;
}
export interface PortletState {
    activeKey?: number;
}
export declare class Portlet extends React.Component<PortletProps, PortletState> {
    static defaultProps: Partial<PortletProps>;
    renderTab?: (tab: PortletTabSchema, props: PortletProps, index: number) => JSX.Element;
    constructor(props: PortletProps);
    handleSelect(key: number): void;
    renderToolbarItem(toolbar: Array<ActionSchema>): JSX.Element[];
    renderToolbar(): React.JSX.Element | null;
    renderDesc(): React.JSX.Element | null;
    renderTabs(): React.JSX.Element | null;
    render(): React.JSX.Element;
}
export declare class PortletRenderer extends Portlet {
}
