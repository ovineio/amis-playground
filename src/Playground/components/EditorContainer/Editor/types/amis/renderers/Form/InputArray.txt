import React from 'react';
import { FormControlProps } from 'amis-core';
import { IComboStore } from 'amis-core';
import { ComboControlSchema } from './Combo';
import { SchemaCollection } from '../../Schema';
/**
 * InputArray 数组输入框。 combo 的别名。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/array
 */
export interface ArrayControlSchema extends Omit<ComboControlSchema, 'type' | 'controls' | 'conditions' | 'items'> {
    /**
     * 指定为数组输入框类型
     */
    type: 'input-array';
    /**
     * 成员渲染器配置
     */
    items: SchemaCollection;
    /**
     * 新增成员时的默认值
     */
    scaffold?: any;
}
export interface InputArrayProps extends FormControlProps, Omit<ArrayControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
    store: IComboStore;
}
export default class InputArrayControl extends React.Component<InputArrayProps> {
    comboInstance: any;
    constructor(props: InputArrayProps);
    comboRef(ref: any): void;
    validate(args: Array<any>): any;
    render(): React.JSX.Element;
}
export declare class ArrayControlRenderer extends InputArrayControl {
}
