import React from 'react';
import { FormControlProps } from 'amis-core';
import { BadgeObject } from 'amis-ui';
import { ActionObject } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
import type { TestIdBuilder } from 'amis-core';
export interface SchemaMap {
    checkbox: CheckboxControlSchema;
}
/**
 * Checkbox 勾选框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/checkbox
 */
export interface CheckboxControlSchema extends FormBaseControlSchema {
    /**
     * 指定为多行文本输入框
     */
    type: 'checkbox';
    /**
     * 勾选值
     */
    trueValue?: boolean | string | number;
    /**
     * 未勾选值
     */
    falseValue?: boolean | string | number;
    /**
     * 选项说明
     */
    option?: string;
    /**
     * 角标
     */
    badge?: BadgeObject;
    partial?: boolean;
    optionType?: 'default' | 'button';
    checked?: boolean;
    testIdBuilder?: TestIdBuilder;
}
export interface CheckboxProps extends FormControlProps, Omit<CheckboxControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export default class CheckboxControl extends React.Component<CheckboxProps, any> {
    static defaultProps: Partial<CheckboxProps>;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    dispatchChangeEvent(eventData?: any): Promise<void>;
    renderStatic(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class CheckboxControlRenderer extends CheckboxControl {
}
