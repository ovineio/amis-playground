import React from 'react';
import { FormControlProps } from 'amis-core';
import type { ListenerAction } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * TextArea 多行文本输入框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/textarea
 */
export interface TextareaControlSchema extends FormBaseControlSchema {
    /**
     * 指定为多行文本输入框
     */
    type: 'textarea';
    /**
     * 最大行数
     */
    maxRows?: number;
    /**
     * 最小行数
     */
    minRows?: number;
    /**
     * 是否只读
     */
    readOnly?: boolean;
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 限制文字个数
     */
    maxLength?: number;
    /**
     * 是否显示计数
     */
    showCounter?: boolean;
    /**
     * 输入内容是否可清除
     */
    clearable?: boolean;
    /**
     * 重置值
     */
    resetValue?: string;
}
export type TextAreaRendererEvent = 'blur' | 'focus' | 'change';
export interface TextAreaProps extends FormControlProps {
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    clearable?: boolean;
    resetValue?: string;
}
export interface TextAreaState {
    focused: boolean;
}
export default class TextAreaControl extends React.Component<TextAreaProps, TextAreaState> {
    static defaultProps: Partial<TextAreaProps>;
    inputRef: React.RefObject<any>;
    doAction(action: ListenerAction, data: any, throwErrors?: boolean, args?: any): void;
    focus(): void;
    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    handleFocus(e: React.FocusEvent<HTMLTextAreaElement>): void;
    handleBlur(e: React.FocusEvent<HTMLTextAreaElement>): void;
    renderStatic(displayValue?: string): JSX.Element;
    render(): React.JSX.Element;
}
export declare class TextAreaControlRenderer extends TextAreaControl {
}
