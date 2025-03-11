/**
 * @file scoped.jsx.
 * @author fex
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { SchemaCollection, SchemaObject } from '../Schema';
export type SchemaQuickEditObject = 
/**
 * 直接就是个表单项
 */
({
    /**
     * 是否立即保存
     */
    saveImmediately?: boolean;
    /**
     * 接口保存失败后，是否重置组件编辑状态
     */
    resetOnFailed?: boolean;
    /**
     * 配置刷新目标，默认就会刷新所属 crud 组件，
     * 如果不需要，请配置为 "none"
     */
    reload?: string;
    /**
     * 是否直接内嵌
     */
    mode?: 'inline';
    /**
     * 配置按钮图标
     */
    icon?: string;
} & SchemaObject)
/**
 * 表单项集合
 */
 | {
    /**
     * 是否立即保存
     */
    saveImmediately?: boolean;
    /**
     * 接口保存失败后，是否重置组件编辑状态
     */
    resetOnFailed?: boolean;
    /**
     * 配置刷新目标，默认就会刷新所属 crud 组件，
     * 如果不需要，请配置为 "none"
     */
    reload?: string;
    /**
     * 是否直接内嵌
     */
    mode?: 'inline';
    /**
     * 配置按钮图标
     */
    icon?: string;
    body: SchemaCollection;
};
export type SchemaQuickEdit = boolean | SchemaQuickEditObject;
export interface QuickEditConfig {
    saveImmediately?: boolean;
    resetOnFailed?: boolean;
    reload?: string;
    mode?: 'inline' | 'dialog' | 'popOver' | 'append';
    type?: string;
    body?: any;
    focusable?: boolean;
    popOverClassName?: string;
    isFormMode?: boolean;
    icon?: string;
    [propName: string]: any;
}
export interface QuickEditProps extends RendererProps {
    name?: string;
    label?: string;
    quickEdit: boolean | QuickEditConfig;
    quickEditEnabled?: boolean;
}
export interface QuickEditState {
    isOpened: boolean;
}
export declare const HocQuickEdit: (config?: Partial<QuickEditConfig>) => (Component: React.ComponentType<any>) => any;
export default HocQuickEdit;
export declare function InlineFormItem(props: RendererProps & {
    schema: any;
    onChange: Function;
    onBulkChange: Function;
    formItemRef: Function;
}): JSX.Element;
