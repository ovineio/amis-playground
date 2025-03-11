import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
import { Option, PlainObject } from 'amis-core';
/**
 * Number 展示渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/number
 */
export interface NumberSchema extends BaseSchema {
    /**
     * 指定为数字展示类型
     */
    type: 'number';
    /**
     * 精度，用来控制小数点位数
     */
    precision?: number;
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 后缀
     */
    suffix?: string;
    /**
     * 是否千分分隔
     */
    kilobitSeparator?: boolean;
    /**
     * 百分比显示
     */
    percent?: boolean | number;
    /**
     * 占位符
     */
    placeholder?: string;
    /**
     * 单位列表
     */
    unitOptions?: string | Array<Option> | string[] | PlainObject;
}
export interface NumberProps extends RendererProps, Omit<NumberSchema, 'type' | 'className'> {
}
export declare class NumberField extends React.Component<NumberProps> {
    static defaultProps: Pick<NumberProps, 'placeholder' | 'kilobitSeparator'>;
    render(): React.JSX.Element;
}
export declare class NumberFieldRenderer extends NumberField {
}
