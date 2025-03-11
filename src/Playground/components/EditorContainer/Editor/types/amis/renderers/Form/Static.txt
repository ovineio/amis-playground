import React from 'react';
import { FormControlProps } from 'amis-core';
import { TableCell } from '../Table';
import { SchemaPopOver } from '../PopOver';
import { SchemaQuickEdit } from '../QuickEdit';
import { SchemaCopyable } from '../Copyable';
import { FormBaseControlSchema, SchemaTpl } from '../../Schema';
/**
 * Static
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/static
 */
export interface StaticExactControlSchema extends FormBaseControlSchema {
    type: 'static';
    /**
     * 内容模板， 支持 HTML
     */
    tpl?: SchemaTpl;
    /**
     * 内容模板，不支持 HTML
     */
    text?: SchemaTpl;
    /**
     * 配置查看详情功能
     */
    popOver?: SchemaPopOver;
    /**
     * 配置快速编辑功能
     */
    quickEdit?: SchemaQuickEdit;
    /**
     * 配置点击复制功能
     */
    copyable?: SchemaCopyable;
    /**
     * 边框模式，默认是无边框的
     */
    borderMode?: 'full' | 'half' | 'none';
}
export interface StaticProps extends FormControlProps {
    placeholder?: string;
    tpl?: string;
    text?: string;
    contentsOnly?: boolean;
}
export default class StaticControl extends React.Component<StaticProps, any> {
    static defaultProps: {
        placeholder: string;
    };
    constructor(props: StaticProps);
    handleQuickChange(values: any, saveImmediately: boolean | any, savePristine?: boolean, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): Promise<void>;
    render(): React.JSX.Element;
}
export declare class StaticControlRenderer extends StaticControl {
}
export declare class StaticFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    render(): React.JSX.Element;
}
