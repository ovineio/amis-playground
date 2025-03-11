import React from 'react';
import { FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
import { InputFormulaControlSchema } from './InputFormula';
/**
 * JSON Schema
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/json-schema
 */
export interface JSONSchemaControlSchema extends FormBaseControlSchema {
    /**
     * 指定为 JSON Schema
     */
    type: 'json-schema';
    /**
     * json-schema 详情，支持关联上下文数据
     */
    schema?: any;
    /**
     * 将字段输入控件变成公式编辑器。
     */
    formula?: Omit<InputFormulaControlSchema, 'type'>;
}
export interface JSONSchemaProps extends FormControlProps, Omit<JSONSchemaControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export default class JSONSchemaControl extends React.PureComponent<JSONSchemaProps> {
    control: any;
    controlRef(ref: any): void;
    validate(): any;
    render(): React.JSX.Element;
}
export declare class JSONSchemaRenderer extends JSONSchemaControl {
}
