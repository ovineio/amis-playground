import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaCollection } from '../Schema';
/**
 * WebComponent 容器渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/web-component
 */
export interface WebComponentSchema extends BaseSchema {
    /**
     * 指定为 web-component 类型
     */
    type: 'web-component';
    /**
     * 标签
     */
    tag: string;
    /**
     * 子节点
     */
    body: SchemaCollection;
    /**
     * 组件属性
     */
    props?: {
        [propName: string]: any;
    };
}
export default class WebComponent extends React.Component<RendererProps> {
    renderBody(): JSX.Element | null;
    render(): React.JSX.Element;
}
export declare class WebComponentRenderer extends WebComponent {
}
