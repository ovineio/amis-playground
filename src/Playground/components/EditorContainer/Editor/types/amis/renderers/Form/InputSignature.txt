/**
 * @file Signature.tsx 签名组件
 *
 * @created: 2024/03/04
 */
import React from 'react';
import { IScopedContext, FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
export interface InputSignatureSchema extends FormBaseControlSchema {
    type: 'input-signature';
    /**
     * 组件宽度，默认占满父容器
     */
    width?: number;
    /**
     * 组件高度，默认占满父容器
     */
    height?: number;
    /**
     * 组件字段颜色
     * @default #000
     */
    color?: string;
    /**
     * 组件背景颜色
     * @default #efefef
     */
    bgColor?: string;
    /**
     * 清空按钮名称
     * @default 清空
     */
    clearBtnLabel?: string;
    /**
     * 清空按钮图标
     * @default 清空
     */
    clearBtnIcon?: string;
    /**
     * 撤销按钮名称
     * @default 撤销
     */
    undoBtnLabel?: string;
    /**
     * 清空按钮图标
     * @default 清空
     */
    undoBtnIcon?: string;
    /**
     * 确认按钮名称
     * @default 确认
     */
    confirmBtnLabel?: string;
    /**
     * 确认按钮图标
     * @default 确认
     */
    confirmBtnIcon?: string;
    /**
     * 是否内嵌
     */
    embed?: boolean;
    /**
     * 弹窗确认按钮名称
     */
    embedConfirmLabel?: string;
    /**
     * 弹窗确认按钮图标
     */
    embedConfirmIcon?: string;
    /**
     * 弹窗取消按钮名称
     */
    ebmedCancelLabel?: string;
    /**
     * 弹窗取消按钮图标
     */
    ebmedCancelIcon?: string;
    /**
     * 弹窗按钮图标
     */
    embedBtnIcon?: string;
    /**
     * 弹窗按钮文案
     */
    embedBtnLabel?: string;
}
export interface IInputSignatureProps extends FormControlProps {
}
interface IInputSignatureState {
    loading: boolean;
}
export default class InputSignatureComp extends React.Component<IInputSignatureProps, IInputSignatureState> {
    render(): React.JSX.Element;
}
export declare class InputSignatureRenderer extends InputSignatureComp {
    static contextType: React.Context<IScopedContext>;
    constructor(props: IInputSignatureProps, context: IScopedContext);
    componentWillUnmount(): void;
}
export {};
