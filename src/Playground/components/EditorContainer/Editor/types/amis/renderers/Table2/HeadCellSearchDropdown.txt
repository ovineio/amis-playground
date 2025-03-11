import React from 'react';
import { RendererProps, ActionObject, ClassNamesFn, ITableStore2 } from 'amis-core';
export interface QuickSearchConfig {
    type?: string;
    controls?: any;
    tabs?: any;
    fieldSet?: any;
    [propName: string]: any;
}
export interface HeadCellSearchProps extends RendererProps {
    name: string;
    searchable: boolean | QuickSearchConfig;
    onSearch?: Function;
    onAction?: Function;
    sortable?: boolean;
    label?: string;
    popOverContainer?: any;
    classnames: ClassNamesFn;
    classPrefix: string;
    store: ITableStore2;
}
export declare class HeadCellSearchDropDown extends React.Component<HeadCellSearchProps, any> {
    formItems: Array<string>;
    constructor(props: HeadCellSearchProps);
    buildSchema(): any;
    handleAction(e: any, action: ActionObject, ctx: object, confirm: Function): Promise<void>;
    handleReset(): Promise<void>;
    handleSubmit(values: any, confirm: Function): Promise<void>;
    isActive(): any;
    render(): React.JSX.Element;
}
declare const _default: (props: HeadCellSearchProps) => React.JSX.Element;
export default _default;
