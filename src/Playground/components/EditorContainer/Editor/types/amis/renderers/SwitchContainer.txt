import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaCollection } from '../Schema';
import { JSONSchema } from '../types';
export interface StateSchema extends Omit<BaseSchema, 'type'> {
    /**
     * 状态标题
     */
    title?: string;
    /**
     * 内容
     */
    body?: SchemaCollection;
    /**
     * 显示条件
     */
    visibleOn?: string;
}
/**
 * SwitchContainer 状态容器渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/state-container
 */
export interface SwitchContainerSchema extends BaseSchema {
    /**
     * 指定为 container 类型
     */
    type: 'switch-container';
    /**
     * 状态项列表
     */
    items: Array<StateSchema>;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
}
export interface SwitchContainerProps extends RendererProps, Omit<SwitchContainerSchema, 'type' | 'className' | 'style'> {
    children?: (props: any) => React.ReactNode;
}
export interface SwtichContainerState {
    activeIndex: number;
}
export default class SwitchContainer extends React.Component<SwitchContainerProps, SwtichContainerState> {
    static propsList: Array<string>;
    static defaultProps: {
        className: string;
    };
    constructor(props: SwitchContainerProps);
    componentDidUpdate(preProps: SwitchContainerProps): void;
    handleClick(e: React.MouseEvent<any>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    renderBody(item: JSONSchema): JSX.Element | null;
    switchTo(index: number): void;
    render(): React.JSX.Element;
}
export declare class SwitchContainerRenderer extends SwitchContainer {
}
