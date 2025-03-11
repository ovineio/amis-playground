import React from 'react';
import { StateChangeOptions } from 'downshift';
import { FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * 图标选择器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/icon-picker
 */
export interface IconPickerControlSchema extends FormBaseControlSchema {
    type: 'icon-picker';
}
export interface IconPickerProps extends FormControlProps {
    placeholder?: string;
    resetValue?: any;
    noDataTip?: string;
    clearable?: boolean;
}
export interface IconPickerState {
    isOpen?: boolean;
    inputValue?: string;
    isFocused?: boolean;
    vendorIndex?: number;
}
export default class IconPickerControl extends React.PureComponent<IconPickerProps, IconPickerState> {
    input?: HTMLInputElement;
    state: IconPickerState;
    static defaultProps: Pick<IconPickerProps, 'resetValue' | 'placeholder' | 'noDataTip'>;
    componentDidUpdate(prevProps: IconPickerProps): void;
    changeVendor(index: number): void;
    formatOptions(): {
        label: string;
        value: string;
    }[];
    getVendors(): string[];
    inputRef(ref: any): void;
    focus(): void;
    handleClick(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    handleChange(value: any): void;
    handleStateChange(changes: StateChangeOptions<any>): void;
    handleClear(): void;
    renderFontIcons(): React.JSX.Element;
    render(): JSX.Element;
}
export declare class IconPickerControlRenderer extends IconPickerControl {
}
