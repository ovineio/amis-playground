import React from 'react';
import type { RendererProps, Option } from 'amis-core';
export interface QuickFilterConfig {
    options: Array<any>;
    /** 数据源：API或上下文变量 */
    source: any;
    multiple: boolean;
    strictMode?: boolean;
    [propName: string]: any;
    refreshOnOpen?: boolean;
}
export interface HeadCellFilterProps extends RendererProps {
    /** 所在的CRUD的Query数据 */
    data: any;
    /** 所在的CRUD的数据以及上层数据 */
    superData: Record<string, any>;
    name: string;
    filterable: QuickFilterConfig;
    onQuery: (values: object, forceReload?: boolean, replace?: boolean, resetPage?: boolean) => void;
}
export declare class HeadCellFilterDropDown extends React.Component<HeadCellFilterProps, any> {
    state: {
        isOpened: boolean;
        keyword: string;
        filterOptions: never[];
    };
    sourceInvalid: boolean;
    constructor(props: HeadCellFilterProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: HeadCellFilterProps, prevState: any): void;
    fetchOptions(): Promise<void>;
    alterOptions(options: Array<any>, keyword?: string): any[];
    optionComparator(option: Option, selected: any): boolean;
    handleClickOutside(): void;
    open(): Promise<void>;
    close(): void;
    handleClick(value: string): Promise<void>;
    handleCheck(value: string): Promise<void>;
    handleReset(): Promise<void>;
    handleSearch(keyword: string): void;
    render(): React.JSX.Element;
}
