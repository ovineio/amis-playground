import React from 'react';
import { ClassNamesFn, RendererEvent } from 'amis-core';
import { SchemaNode, ActionObject } from 'amis-core';
import { LocaleProps } from 'amis-core';
import { ActionSchema } from '../Action';
import type { IColumn, IRow, ITableStore, TestIdBuilder } from 'amis-core';
export interface TableBodyProps extends LocaleProps {
    store: ITableStore;
    className?: string;
    rowsProps?: any;
    tableClassName?: string;
    classnames: ClassNamesFn;
    columns: Array<IColumn>;
    rows: Array<IRow>;
    render: (region: string, node: SchemaNode, props?: any) => JSX.Element;
    renderCell: (region: string, column: IColumn, item: IRow, props: any) => React.ReactNode;
    onCheck: (item: IRow, value: boolean, shift?: boolean) => void;
    onRowClick: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowDbClick: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowMouseEnter: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowMouseLeave: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onQuickChange?: (item: IRow, values: object, saveImmediately?: boolean | any, savePristine?: boolean) => void;
    footable?: boolean;
    ignoreFootableContent?: boolean;
    footableColumns: Array<IColumn>;
    checkOnItemClick?: boolean;
    buildItemProps?: (item: IRow, index: number) => any;
    onAction?: (e: React.UIEvent<any>, action: ActionObject, ctx: object) => void;
    rowClassNameExpr?: string;
    rowClassName?: string;
    affixRowClassName?: string;
    prefixRowClassName?: string;
    data?: any;
    prefixRow?: Array<any>;
    affixRow?: Array<any>;
    itemAction?: ActionSchema;
    testIdBuilder?: TestIdBuilder;
}
export declare class TableBody<T extends TableBodyProps = TableBodyProps> extends React.Component<T> {
    componentDidMount(): void;
    testIdBuilder(rowPath: string): TestIdBuilder | undefined;
    renderRows(rows: Array<any>, columns?: T["columns"], rowProps?: any, indexPath?: string): any;
    renderSummaryRow(position: 'prefix' | 'affix', items: Array<any>, rowIndex?: number): React.JSX.Element | null;
    renderSummary(position: 'prefix' | 'affix', items?: Array<any>): React.JSX.Element | (React.JSX.Element | null)[] | null;
    render(): React.JSX.Element;
}
