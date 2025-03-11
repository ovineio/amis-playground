import React from 'react';
import { ClassNamesFn } from 'amis-core';
import { ColumnTogglerProps } from '../Table/ColumnToggler';
import { BaseSchema } from '../../Schema';
export interface ColumnTogglerSchema extends BaseSchema {
    label?: string;
    tooltip?: string;
    size?: string;
    icon?: string;
    draggable?: boolean;
    align?: string;
}
export interface ColumnTogglerRendererProps extends ColumnTogglerProps {
    toggleAllColumns?: Function;
    toggleToggle?: Function;
    cols: Array<any>;
    classnames: ClassNamesFn;
    classPrefix: string;
}
export declare class ColumnTogglerRenderer extends React.Component<ColumnTogglerRendererProps> {
    render(): React.JSX.Element | null;
}
