import React from 'react';
import { RendererProps } from 'amis-core';
import { FormBaseControlSchema, SchemaCollection } from '../../Schema';
/**
 * Control 表单项包裹
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/control
 */
export interface FormControlSchema extends FormBaseControlSchema {
    type: 'control';
    /**
     * FormItem 内容
     */
    body: SchemaCollection;
}
export declare class ControlRenderer extends React.Component<RendererProps> {
    renderInput(): JSX.Element;
    render(): React.JSX.Element;
}
