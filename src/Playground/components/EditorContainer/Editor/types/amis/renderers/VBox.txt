import React from 'react';
import { RendererProps } from 'amis-core';
import { Schema } from 'amis-core';
import { BaseSchema, SchemaObject } from '../Schema';
export type HboxRow = SchemaObject & {
    rowClassName?: string;
    cellClassName?: string;
};
/**
 * 垂直布局控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/vbox
 */
export interface VBoxSchema extends BaseSchema {
    type: 'vbox';
    /**
     * 行集合
     */
    rows?: Array<HboxRow>;
}
export interface HBoxProps extends RendererProps, Omit<VBoxSchema, 'className'> {
}
export default class VBox extends React.Component<HBoxProps, object> {
    static propsList: Array<string>;
    static defaultProps: Partial<HBoxProps>;
    renderChild(region: string, node: Schema): JSX.Element;
    renderCell(row: HboxRow, key: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class VBoxRenderer extends VBox {
}
