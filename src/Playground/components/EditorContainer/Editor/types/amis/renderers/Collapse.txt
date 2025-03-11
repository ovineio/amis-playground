import React from 'react';
import { ActionObject, IScopedContext, RendererProps } from 'amis-core';
import { BaseSchema, SchemaCollection, SchemaTpl, SchemaObject } from '../Schema';
/**
 * Collapse 折叠渲染器，格式说明。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/collapse
 */
export interface CollapseSchema extends BaseSchema {
    /**
     * 指定为折叠器类型
     */
    type: 'collapse';
    /**
     * 标识
     */
    key?: string;
    /**
     * 标题展示位置
     */
    headerPosition?: 'top' | 'bottom';
    /**
     * 标题
     */
    header?: string | SchemaCollection;
    /**
     * 内容区域
     */
    body: SchemaCollection;
    /**
     * 配置 Body 容器 className
     */
    bodyClassName?: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否可折叠
     */
    collapsable?: boolean;
    /**
     * 默认是否折叠
     */
    collapsed?: boolean;
    /**
     * 图标是否展示
     */
    showArrow?: boolean;
    /**
     * 自定义切换图标
     */
    expandIcon?: SchemaObject;
    /**
     * 标题 CSS 类名
     */
    headingClassName?: string;
    /**
     * 收起的标题
     */
    collapseHeader?: SchemaTpl;
    /**
     * 控件大小
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'base';
    /**
     * 点开时才加载内容
     */
    mountOnEnter?: boolean;
    /**
     * 卡片隐藏就销毁内容。
     */
    unmountOnExit?: boolean;
    /**
     * 标题内容分割线
     */
    divideLine?: boolean;
}
export interface CollapseProps extends RendererProps, Omit<CollapseSchema, 'type' | 'className'> {
    wrapperComponent?: any;
    headingComponent?: any;
    children?: JSX.Element | ((props?: any) => JSX.Element);
    /** 当Collapse作为Form组件的子元素时，开启该属性后组件样式设置为FieldSet组件的样式，默认开启 */
    enableFieldSetStyle?: boolean;
}
export default class Collapse extends React.Component<CollapseProps, {}> {
    static propsList: Array<string>;
    basicCollapse: React.RefObject<any>;
    handleCollapseChange(collapsed: boolean): Promise<void>;
    doAction(action: ActionObject, data: object, throwErrors: boolean, args: object): any;
    render(): React.JSX.Element;
}
export declare class CollapseRenderer extends Collapse {
    static contextType: React.Context<IScopedContext>;
    constructor(props: CollapseProps, context: IScopedContext);
    componentWillUnmount(): void;
}
