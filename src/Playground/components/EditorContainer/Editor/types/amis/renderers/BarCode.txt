/**
 * @file 用来条形码
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
/**
 * BarCode 显示渲染器，格式说明。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/barcode
 */
export interface BarCodeSchema extends BaseSchema {
    /**
     *  指定为颜色显示控件
     */
    type: 'barcode';
    /**
     * 宽度
     */
    width?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 显示配置
     */
    options: object;
}
export interface BarCodeProps extends RendererProps, Omit<BarCodeSchema, 'type' | 'className'> {
}
export declare class BarCodeField extends React.Component<BarCodeProps, object> {
    render(): React.JSX.Element;
}
export declare class BarCodeFieldRenderer extends BarCodeField {
}
