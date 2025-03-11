import React from 'react';
import { FormControlProps, ListenerAction } from 'amis-core';
import { IconSchema } from '../Icon';
import { FormBaseControlSchema, SchemaCollection } from '../../Schema';
import type { SpinnerExtraProps } from 'amis-ui';
/**
 * Switch
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/switch
 */
export interface SwitchControlSchema extends FormBaseControlSchema {
    /**
     * 指定为多行文本输入框
     */
    type: 'switch';
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
     * 开启时显示的内容
     */
    onText?: string | IconSchema | SchemaCollection;
    /**
     * 关闭时显示的内容
     */
    offText?: string | IconSchema | SchemaCollection;
    /** 开关尺寸 */
    size?: 'sm' | 'md';
    /** 是否处于加载状态 */
    loading?: boolean;
}
export interface SwitchProps extends FormControlProps, SpinnerExtraProps {
    option?: string;
    trueValue?: any;
    falseValue?: any;
    size?: 'sm';
    loading?: boolean;
}
export type SwitchRendererEvent = 'change';
export default class SwitchControl extends React.Component<SwitchProps, any> {
    static defaultProps: {
        trueValue: boolean;
        falseValue: boolean;
        optionAtLeft: boolean;
    };
    handleChange(checked: string | number | boolean): Promise<void>;
    getResult(): {
        on: any;
        off: any;
    };
    renderBody(children: any): React.JSX.Element;
    renderStatic(): React.JSX.Element;
    doAction(action: ListenerAction, data: any, throwErrors?: boolean, args?: any): void;
    render(): React.JSX.Element;
}
export declare class SwitchControlRenderer extends SwitchControl {
}
