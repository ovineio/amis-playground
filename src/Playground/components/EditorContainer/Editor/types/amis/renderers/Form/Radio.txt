import React from 'react';
import { FormControlProps } from 'amis-core';
import { BadgeObject } from 'amis-ui';
import { ActionObject } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * Radio 单选框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/radios
 */
export interface RadioControlSchema extends FormBaseControlSchema {
    /**
     * 指定为多行文本输入框
     */
    type: 'radio';
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
}
export interface RadioProps extends FormControlProps, Omit<RadioControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
    checked?: boolean;
    onRadioChange?: (value: any, ctx: any) => any;
}
export default class RadioControl extends React.Component<RadioProps, any> {
    static defaultProps: Partial<RadioProps>;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    dispatchChangeEvent(eventData?: any): Promise<void>;
    renderStatic(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class RadioControlRenderer extends RadioControl {
}
