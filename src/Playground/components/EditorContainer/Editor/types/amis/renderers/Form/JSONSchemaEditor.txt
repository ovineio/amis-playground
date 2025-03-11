import React from 'react';
import { FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
import type { SchemaEditorItemPlaceholder } from 'amis-ui';
/**
 * JSON Schema Editor
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/json-schema-editor
 */
export interface JSONSchemaEditorControlSchema extends Omit<FormBaseControlSchema, 'placeholder'> {
    /**
     * 指定为 JSON Schema Editor
     */
    type: 'json-schema-editor';
    /**
     * 可以理解为类型模板，方便快速定义复杂类型
     */
    definitions?: {
        [propName: string]: {
            title: string;
            type: 'string' | 'number' | 'integer' | 'object' | 'array' | 'boolean' | 'null';
            [propName: string]: any;
        };
    };
    /**
     * 顶层是否允许修改类型
     */
    rootTypeMutable?: boolean;
    /**
     * 顶层类型信息是否隐藏
     */
    showRootInfo?: boolean;
    /**
     * 禁用类型，默认禁用了 null 类型
     */
    disabledTypes?: Array<string>;
    /**
     * 开启详情配置
     */
    enableAdvancedSetting?: boolean;
    /**
     * 自定义详情配置面板如：
     *
     * {
     *   boolean: [
     *      {type: "input-text", name: "aa", label: "AA" }
     *   ]
     * }
     *
     * 当配置布尔字段详情时，就会出现以上配置
     */
    advancedSettings?: {
        [propName: string]: any;
    };
    /**
     * 各属性输入控件的占位提示文本
     *
     * {
     *   key: "key placeholder",
     *   title: "title placeholder",
     *   description: "description placeholder",
     *   default: "default placeholder"
     * }
     *
     */
    placeholder?: SchemaEditorItemPlaceholder;
    /**
     * 是否为迷你模式，会隐藏一些不必要的元素
     */
    mini?: boolean;
}
export interface JSONSchemaEditorProps extends FormControlProps, Omit<JSONSchemaEditorControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export default class JSONSchemaEditorControl extends React.PureComponent<JSONSchemaEditorProps> {
    static defaultProps: {
        enableAdvancedSetting: boolean;
        placeholder: {
            key: string;
            title: string;
            description: string;
            default: string;
            empty: string;
        };
    };
    normalizePlaceholder(): SchemaEditorItemPlaceholder;
    renderModalProps(value: any, onChange: (value: any) => void): JSX.Element;
    render(): React.JSX.Element;
}
export declare class JSONSchemaEditorRenderer extends JSONSchemaEditorControl {
}
