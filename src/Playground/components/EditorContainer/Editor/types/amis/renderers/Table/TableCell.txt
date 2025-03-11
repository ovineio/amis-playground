import React from 'react';
import { RendererProps } from 'amis-core';
import type { TestIdBuilder } from 'amis-core';
export interface TableCellProps extends RendererProps {
    wrapperComponent?: React.ElementType;
    column: any;
    contentsOnly?: boolean;
    testIdBuilder?: TestIdBuilder;
}
export declare class TableCell extends React.Component<TableCellProps> {
    static defaultProps: {
        wrapperComponent: string;
    };
    static propsList: Array<string>;
    readonly propsNeedRemove: string[];
    render(): React.JSX.Element;
}
export declare class TableCellRenderer extends TableCell {
    static propsList: string[];
}
export declare class FieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
}
