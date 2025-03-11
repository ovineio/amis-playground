/**
 * @file filter
 * @author fex
 */
import React from 'react';
import { FormControlProps } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { ActionObject } from 'amis-core';
import { FormBaseControlSchema, SchemaApi } from '../../Schema';
import type { TestIdBuilder } from 'amis-core';
/**
 * Matrix 选择控件。适合做权限勾选。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/matrix
 */
export interface MatrixControlSchema extends FormBaseControlSchema {
    type: 'matrix-checkboxes';
    /**
     * 配置singleSelectMode时设置为false
     */
    multiple?: boolean;
    /**
     * 设置单选模式，multiple为false时有效
     */
    singleSelectMode?: boolean;
    /**
     * 可用来通过 API 拉取 options。
     */
    source?: SchemaApi;
    columns?: Array<{
        label: string;
        [propName: string]: any;
    }>;
    rows?: Array<{
        label: string;
        [propName: string]: any;
    }>;
    /**
     * 行标题说明
     */
    rowLabel?: string;
}
export interface Column {
    label: string;
    [propName: string]: any;
}
export interface Row {
    label: string;
    [propName: string]: any;
}
export interface ValueItem extends Column, Row {
    checked: boolean;
}
export interface MatrixProps extends FormControlProps, SpinnerExtraProps {
    columns: Array<Column>;
    rows: Array<Row>;
    multiple: boolean;
    /**
     * 内容布局方式，left/center/right/justify
     */
    textAlign?: string;
    /**
     * 纵向选择所有能力
     */
    yCheckAll?: boolean;
    /**
     * 横向选择所有能力
     */
    xCheckAll?: boolean;
    testIdBuilder?: TestIdBuilder;
}
export interface MatrixState {
    columns: Array<Column>;
    rows: Array<Row>;
    loading: boolean;
    error?: string;
    singleSelectMode?: 'cell' | 'row' | 'column';
}
export default class MatrixCheckbox extends React.Component<MatrixProps, MatrixState> {
    static defaultProps: Partial<MatrixProps>;
    state: MatrixState;
    mounted: boolean;
    toDispose: Array<() => void>;
    constructor(props: MatrixProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: MatrixProps): void;
    componentWillUnmount(): void;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    initOptions(data: any): Promise<void>;
    reload(): Promise<void>;
    toggleItem(checked: boolean, x: number, y: number): Promise<void>;
    /**
     * 检查列是否有选中
     *
     * @param value
     * @param columnIndex
     */
    isColumChecked(value: any, columnIndex: any): any;
    /**
     * 检查列是全选还是部分选择
     * @param value
     * @param columnIndex
     */
    isColumnPartialChecked(value: any, columnIndex: any): any;
    /**
     * 切换整列的选择
     * @param checked
     * @param value
     * @param columnIndex
     */
    toggleColumnCheckAll(checked: any, value: any, columnIndex: any): Promise<void>;
    /**
     * 检查行是否有选中项
     *
     * @param value
     * @param rowIndex
     */
    isRowChecked(value: any, rowIndex: any): any;
    /**
     * 检查行是全选还是部分选中
     * @param value
     * @param rowIndex
     */
    isRowPartialChecked(value: any, rowIndex: any): any;
    /**
     * 切换行的选中状态
     *
     * @param checked
     * @param value
     * @param rowIndex
     */
    toggleRowCheckAll(checked: any, value: any, rowIndex: any): Promise<void>;
    renderInput(forceDisabled?: boolean): React.JSX.Element;
    renderStatic(displayValue?: string): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class MatrixRenderer extends MatrixCheckbox {
}
