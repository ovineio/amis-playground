import React from 'react';
import { FormControlProps, ActionObject } from 'amis-core';
import { FormBaseControlSchema, SchemaObject } from '../../Schema';
import type { SchemaTokenizeableString } from '../../Schema';
/**
 * Range
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/range
 */
export type Value = string | MultipleValue | number | [number, number];
export type FormatValue = MultipleValue | number;
export type TooltipPosType = 'auto' | 'top' | 'right' | 'bottom' | 'left';
export type InputRangeRendererEvent = 'change' | 'blur' | 'focus';
export type InputRangeRendererAction = 'clear';
export interface RangeControlSchema extends FormBaseControlSchema {
    type: 'input-range';
    /**
     * 滑块值
     */
    value?: Value;
    /**
     * 最大值
     */
    max?: number | SchemaTokenizeableString;
    /**
     * 最小值
     */
    min?: number | SchemaTokenizeableString;
    /**
     * 步长
     */
    step?: number | SchemaTokenizeableString;
    /**
     * 单位
     */
    unit?: string;
    /**
     * 是否展示步长
     */
    showSteps?: boolean;
    /**
     * 分割块数
     */
    parts?: number | number[];
    /**
     * 刻度
     */
    marks?: MarksType;
    /**
     * 是否展示标签
     */
    tooltipVisible?: boolean;
    /**
     * 标签方向
     */
    tooltipPlacement?: TooltipPosType;
    /**
     * 是否为双滑块
     */
    multiple?: boolean;
    /**
     * 是否通过分隔符连接
     */
    joinValues?: boolean;
    /**
     * 分隔符
     */
    delimiter?: string;
    /**
     * 是否展示输入框
     */
    showInput?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 输入框是否可清除
     */
    clearable?: boolean;
}
type MarksType = {
    [index: string | number]: MarksValue;
};
type MarksValue = string | number | SchemaObject | {
    style?: React.CSSProperties;
    label?: string;
};
export interface RangeProps extends FormControlProps {
    /**
     * 滑块值
     */
    value: Value;
    /**
     * 最小值
     */
    min: number | SchemaTokenizeableString;
    /**
     * 最大值
     */
    max: number | SchemaTokenizeableString;
    /**
     * 步长
     */
    step: number | SchemaTokenizeableString;
    /**
     * 是否展示步长
     */
    showSteps: boolean;
    /**
     * 分割块数
     */
    parts: number;
    /**
     * 刻度
     */
    marks?: MarksType;
    /**
     * 是否展示标签
     */
    tooltipVisible: boolean;
    /**
     * 标签方向
     */
    tooltipPlacement: TooltipPosType;
    /**
     * 控制滑块标签显隐函数
     */
    tipFormatter?: (value: Value) => boolean;
    /**
     * 是否为双滑块
     */
    multiple: boolean;
    /**
     * 是否通过分隔符连接
     */
    joinValues: boolean;
    /**
     * 分隔符
     */
    delimiter: string;
    /**
     * 单位
     */
    unit?: string;
    /**
     * 是否展示输入框
     */
    showInput: boolean;
    /**
     * 输入框是否显示单位
     */
    showInputUnit?: boolean;
    /**
     * 是否禁用
     */
    disabled: boolean;
    /**
     * 输入框是否可清除
     */
    clearable?: boolean;
    /**
     * value改变事件
     */
    onChange: (value: Value) => void;
    /**
     * 鼠标松开事件
     */
    onAfterChange?: (value: Value) => any;
}
export interface MultipleValue {
    min: number;
    max: number;
}
export interface DefaultProps {
    value: Value;
    max: number;
    min: number;
    step: number;
    unit: string;
    clearable: boolean;
    disabled: boolean;
    showInput: boolean;
    showInputUnit: boolean;
    multiple: boolean;
    joinValues: boolean;
    delimiter: string;
    showSteps: boolean;
    parts: number;
    tooltipPlacement: TooltipPosType;
}
export interface RangeItemProps extends Omit<RangeProps, 'min' | 'max' | 'step'> {
    min: number;
    max: number;
    step: number;
    value: FormatValue;
    onChange: (value: Value) => void;
    onAfterChange: () => void;
}
export interface RangeState {
    value: FormatValue;
}
/**
 * 格式化初始value值
 * @param value 初始value值 Value
 * @param props RangeProps
 * @returns number | {min: number, max: number}
 */
export declare function formatValue(value: Value, props: {
    multiple: boolean;
    delimiter: string;
    min: number;
    max: number;
}): FormatValue;
/**
 * 输入框
 */
export declare class Input extends React.Component<RangeItemProps, any> {
    /**
     * onChange事件，只能输入数字
     * @param e React.ChangeEvent
     */
    handleInputNumberChange(value: number): void;
    /**
     * 双滑块 更新value
     * @param value 输入的value值
     */
    onUpdateValue(value: number): void;
    checkNum(value: number | string | undefined): number | undefined;
    /**
     * 获取步长小数精度
     * @returns
     */
    getStepPrecision(): number;
    /**
     * 处理数据
     * @param value input数据
     * @param type min | max 双滑块
     * @returns 处理之后数据
     */
    getValue(value: string | number, type?: string): number;
    /**
     * 失焦事件
     */
    onBlur(e: any): Promise<void>;
    /**
     * 聚焦事件
     */
    onFocus(e: any): Promise<void>;
    render(): React.JSX.Element;
}
export default class RangeControl extends React.PureComponent<RangeProps, RangeState> {
    midLabel?: HTMLSpanElement;
    static defaultProps: DefaultProps;
    constructor(props: RangeProps);
    componentDidUpdate(prevProps: RangeProps): void;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    resetValue(): void;
    clearValue(type?: string): void;
    /**
     * 获取步长小数精度
     * @returns
     */
    getStepPrecision(): number;
    getValue(value: FormatValue): number | {
        max: number;
        min: number;
    };
    /**
     * 所有触发value变换 -> onChange
     * @param value
     */
    handleChange(_value: FormatValue): Promise<void>;
    /**
     * 鼠标松开事件
     */
    onAfterChange(): void;
    /**
     * 获取导出格式数据
     */
    getFormatValue(value: FormatValue): Value;
    render(): React.JSX.Element;
}
export declare class RangeControlRenderer extends RangeControl {
}
export {};
