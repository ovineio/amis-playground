import { RendererProps, SchemaClassName } from 'amis-core';
import React from 'react';
import { BaseSchema } from '../Schema';
/**
 * 渲染数据里的 amis schema
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/amis
 */
export interface AIMSRenderSchema extends BaseSchema {
    /**
     * 指定类型
     */
    type: 'amis';
    /**
     * 类名
     */
    className?: SchemaClassName;
}
export declare class AMISRenderer extends React.Component<RendererProps> {
    render(): JSX.Element;
}
