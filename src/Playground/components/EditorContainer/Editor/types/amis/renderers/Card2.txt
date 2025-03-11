import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection } from '../Schema';
/**
 * Card2 新卡片渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/card2
 */
export interface Card2Schema extends BaseSchema {
    /**
     * 指定为 card2 类型
     */
    type: 'card2';
    /**
     * 内容
     */
    body: SchemaCollection;
    /**
     * body 类名
     */
    bodyClassName?: SchemaClassName;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 隐藏选框
     */
    hideCheckToggler?: boolean;
    /**
     * 不配置href且cards容器下生效，点击整个卡片触发选中
     */
    checkOnItemClick: boolean;
    /**
     * 渲染标签
     */
    wrapperComponent?: string;
}
export interface Card2Props extends RendererProps, Omit<Card2Schema, 'type' | 'className'> {
    /**
     * 选择事件
     */
    onCheck: () => void;
    /**
     * 数据
     */
    item: any;
    /**
     * 是否可选，当disabled时，将禁用
     */
    selectable?: boolean;
    /**
     * 是否可多选
     */
    multiple?: boolean;
    /**
     * 是否默认选中
     */
    selected?: boolean;
}
export default class Card2<T> extends React.Component<Card2Props & T, object> {
    static propsList: Array<string>;
    static defaultProps: {
        className: string;
    };
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleCheck(): void;
    renderCheckbox(): JSX.Element | null;
    /**
     * 渲染内容区
     */
    renderBody(): JSX.Element | null;
    render(): React.JSX.Element;
}
export declare class Card2Renderer extends Card2<{}> {
}
