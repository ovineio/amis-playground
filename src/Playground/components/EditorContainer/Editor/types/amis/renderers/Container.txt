import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection } from '../Schema';
/** 容器拖拽配置 */
export interface ContainerDraggableConfig {
    /**
     * 可拖拽的方向, 默认为所有方向, 支持设置为X或Y轴
     */
    axis?: 'both' | 'x' | 'y';
    /**
     * 元素的起始位置
     */
    defaultPosition?: {
        x: number;
        y: number;
    };
    /**
     * 拖拽的边界, 可以设置坐标, 也可以设置父级元素的选择器
     */
    bounds?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    } | string;
    /**
     * 以网格模式拖拽的步长
     */
    grid?: [number, number];
    /**
     * 初始化拖拽的选择器
     */
    handle?: string;
    /**
     * 禁止拖拽的选择器
     */
    cancel?: string;
    /**
     * 拖拽距离的缩放比, 默认为1
     */
    scale?: number;
    /**
     * 默认设置容器内部为'user-select:none', 可以设置true关闭
     */
    enableUserSelect?: boolean;
}
/**
 * Container 容器渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/container
 */
export interface ContainerSchema extends BaseSchema {
    /**
     * 指定为 container 类型
     */
    type: 'container';
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
     * 使用的标签
     */
    wrapperComponent?: string;
    /**
     * 是否需要对body加一层div包裹，默认为 true
     */
    wrapperBody?: boolean;
    /**
     * 是否开启容器拖拽
     */
    draggable?: boolean | string;
    /**
     * 是否开启容器拖拽配置
     */
    draggableConfig: ContainerDraggableConfig | string;
}
export interface ContainerProps extends RendererProps, Omit<ContainerSchema, 'type' | 'className' | 'style'> {
    children?: (props: any) => React.ReactNode;
}
export default class Container<T> extends React.Component<ContainerProps & T, object> {
    static propsList: Array<string>;
    static defaultProps: {
        className: string;
        draggableConfig: {
            axis: "x" | "y" | "both" | undefined;
            scale: number;
            enableUserSelect: boolean;
        };
    };
    handleClick(e: React.MouseEvent<any>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    renderBody(): JSX.Element | null;
    render(): React.JSX.Element;
}
export declare class ContainerRenderer extends Container<{}> {
}
