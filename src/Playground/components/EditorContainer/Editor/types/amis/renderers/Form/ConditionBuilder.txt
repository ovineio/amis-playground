import React from 'react';
import { FormControlProps, Schema } from 'amis-core';
import { FormBaseControlSchema, SchemaApi, SchemaTokenizeableString } from '../../Schema';
import { ConditionBuilderFields, ConditionBuilderFuncs, ConditionBuilderConfig } from 'amis-ui';
import { IconSchema } from '../Icon';
import type { InputFormulaControlSchema } from './InputFormula';
/**
 * 条件组合控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/condition-builder
 */
export interface ConditionBuilderControlSchema extends FormBaseControlSchema {
    /**
     * 指定为
     */
    type: 'condition-builder';
    /**
     * 内嵌模式，默认为 true
     */
    embed?: boolean;
    /**
     * 非内嵌模式时 弹窗触发icon
     */
    pickerIcon?: IconSchema;
    /**
     * 函数集合
     */
    funcs?: ConditionBuilderFuncs;
    /**
     * 字段集合
     */
    fields: ConditionBuilderFields;
    /**
     * 其他配置
     */
    config?: ConditionBuilderConfig;
    /**
     * 通过远程拉取配置项
     */
    source?: SchemaApi | SchemaTokenizeableString;
    /**
     * 展现模式
     */
    builderMode?: 'simple' | 'full';
    /**
     * 是否显示并或切换键按钮，只在简单模式下有用
     */
    showANDOR?: boolean;
    /**
     * 是否可拖拽，默认为 true
     */
    draggable?: boolean;
    addBtnVisibleOn?: string;
    /**
     * 表达式：控制按钮“添加条件组”的显示
     */
    addGroupBtnVisibleOn?: string;
    /**
     * 将字段输入控件变成公式编辑器。
     */
    formula?: Omit<InputFormulaControlSchema, 'type'>;
    /**
     * if 里面公式编辑器配置
     */
    formulaForIf?: any;
}
export interface ConditionBuilderProps extends FormControlProps, Omit<ConditionBuilderControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export default class ConditionBuilderControl extends React.PureComponent<ConditionBuilderProps> {
    renderEtrValue(schema: Schema, props: any): JSX.Element;
    renderPickerIcon(): JSX.Element | undefined;
    getAddBtnVisible(param: {
        depth: number;
        breadth: number;
    }): boolean;
    getAddGroupBtnVisible(param: {
        depth: number;
        breadth: number;
    }): boolean;
    validate(): any;
    render(): React.JSX.Element;
}
export declare class ConditionBuilderRenderer extends ConditionBuilderControl {
}
