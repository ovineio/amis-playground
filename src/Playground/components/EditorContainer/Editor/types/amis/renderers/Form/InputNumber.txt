import React from 'react';
import { FormControlProps, TestIdBuilder } from 'amis-core';
import { Option, PlainObject, ActionObject } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * 数字输入框
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/input-number
 */
export interface NumberControlSchema extends FormBaseControlSchema {
    type: 'input-number';
    /**
     * 最大值
     */
    max?: number;
    /**
     * 最小值
     */
    min?: number;
    /**
     * 步长
     */
    step?: number;
    /**
     * 精度
     */
    precision?: number;
    /**
     * 是否显示上下点击按钮
     */
    showSteps?: boolean;
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 后缀
     */
    suffix?: string;
    /**
     * 单位列表
     */
    unitOptions?: string | Array<Option> | string[] | PlainObject;
    /**
     * 是否是大数，如果是的话输入输出都将是字符串
     */
    big?: boolean;
    /**
     * 是否千分分隔
     */
    kilobitSeparator?: boolean;
    /**
     * 只读
     */
    readOnly?: boolean;
    /**
     * 是否启用键盘行为
     */
    keyboard?: boolean;
    /**
     * 输入框为基础输入框还是加强输入框
     */
    displayMode?: 'base' | 'enhance';
    /**
     * 用来开启百分号的展示形式
     */
    showAsPercent?: boolean;
}
export interface NumberProps extends FormControlProps {
    placeholder?: string;
    max?: number | string;
    min?: number | string;
    step?: number;
    /**
     *  精度
     */
    precision?: number;
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
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
     * 只读
     */
    readOnly?: boolean;
    /**
     * 启用键盘行为，即通过上下方向键控制是否生效
     */
    keyboard?: boolean;
    /**
     * 输入框为基础输入框还是加强输入框
     */
    displayMode?: 'base' | 'enhance';
    /**
     * 是否是大数，如果是的话输入输出都将是字符串
     */
    big?: boolean;
    /**
     * 是否在清空内容时从数据域中删除该表单项对应的值
     */
    clearValueOnEmpty?: boolean;
    testIdBuilder?: TestIdBuilder;
    /**
     * 用来开启百分号的展示形式，搭配suffix使用
     */
    showAsPercent?: boolean;
}
interface NumberState {
    unit?: string;
    unitOptions?: Option[];
}
export type InputNumberRendererEvent = 'blur' | 'focus' | 'change';
export type InputNumberRendererAction = 'clear';
export default class NumberControl extends React.Component<NumberProps, NumberState> {
    input?: HTMLInputElement;
    static defaultProps: Partial<NumberProps>;
    constructor(props: NumberProps);
    /**
     * 动作处理
     */
    doAction(action: ActionObject, data: any, throwErrors?: boolean, args?: any): void;
    formatNumber(value: any, setPrinstine?: boolean): any;
    getUnit(): any;
    getValue(inputValue: any): any;
    dispatchEvent(eventName: string): Promise<void>;
    handleChange(inputValue: any): Promise<void>;
    changeCursorPos(value: number): void;
    filterNum(value: number | string | undefined): number | undefined;
    filterNum(value: number | string | undefined, isbig: boolean | undefined): number | string | undefined;
    handleChangeUnit(option: Option): void;
    componentDidUpdate(prevProps: NumberProps): void;
    inputRef(ref: any): void;
    focus(): void;
    render(): React.JSX.Element;
}
export declare class NumberControlRenderer extends NumberControl {
    static defaultProps: Partial<FormControlProps>;
}
export {};
