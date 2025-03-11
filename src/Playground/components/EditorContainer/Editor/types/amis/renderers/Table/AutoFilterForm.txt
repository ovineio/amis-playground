import { IColumn, ITableStore, RendererProps } from 'amis-core';
import React from 'react';
export interface AutoFilterFormProps extends RendererProps {
    searchFormExpanded: boolean;
    autoGenerateFilter: any;
    activedSearchableColumns: Array<IColumn>;
    searchableColumns: Array<IColumn>;
    columnsNum: number;
    onItemToggleExpanded?: (column: IColumn, value: boolean) => void;
    onToggleExpanded?: () => void;
    query?: any;
    canAccessSuperData?: boolean;
    popOverContainer?: any;
    onSearchableFromReset?: any;
    onSearchableFromSubmit?: any;
    onSearchableFromInit?: any;
}
export declare function AutoFilterForm({ autoGenerateFilter, searchFormExpanded, activedSearchableColumns, searchableColumns, onItemToggleExpanded, onToggleExpanded, classnames: cx, translate: __, render, data, onSearchableFromReset, onSearchableFromSubmit, onSearchableFromInit, popOverContainer, testIdBuilder, canAccessSuperData }: AutoFilterFormProps): JSX.Element;
declare const _default: ({ store, query, data, ...rest }: Omit<AutoFilterFormProps, "searchFormExpanded" | "searchableColumns" | "activedSearchableColumns" | "onItemToggleExpanded" | "onToggleExpanded"> & {
    store: ITableStore;
    query: any;
}) => React.JSX.Element;
export default _default;
