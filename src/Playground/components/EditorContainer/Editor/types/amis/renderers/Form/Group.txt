import React from 'react';
import { RendererProps } from 'amis-core';
import { FormBaseControlSchema, SchemaClassName, SchemaObject } from '../../Schema';
import { FormHorizontal } from 'amis-core';
export type GroupSubControl = SchemaObject & {
    /**
     * 列类名
     */
    columnClassName?: SchemaClassName;
    /**
     * 宽度占用比率。在某些容器里面有用比如 group
     */
    columnRatio?: number | 'auto';
    /**
     * 列名称
     */
    name?: string;
};
/**
 * Group 表单集合渲染器，能让多个表单在一行显示
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/group
 */
export interface GroupControlSchema extends FormBaseControlSchema {
    type: 'group';
    /**
     * FormItem 集合
     */
    body: Array<GroupSubControl>;
    /**
     * 间隔
     */
    gap?: 'xs' | 'sm' | 'normal';
    /**
     * 配置时垂直摆放还是左右摆放。
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * 配置子表单项默认的展示方式。
     */
    subFormMode?: 'normal' | 'inline' | 'horizontal';
    /**
     * 如果是水平排版，这个属性可以细化水平排版的左右宽度占比。
     */
    subFormHorizontal?: FormHorizontal;
}
export interface InputGroupProps extends RendererProps, Omit<GroupControlSchema, 'type' | 'className'> {
}
export declare class ControlGroupRenderer extends React.Component<InputGroupProps> {
    reaction: any;
    constructor(props: InputGroupProps);
    componentWillUnmount(): void;
    renderControl(control: any, index: any, otherProps?: any): JSX.Element | null;
    renderVertical(props?: Readonly<InputGroupProps>): React.JSX.Element | null;
    renderHorizontal(props?: Readonly<InputGroupProps>): React.JSX.Element | null;
    renderInput(props?: Readonly<InputGroupProps>): React.JSX.Element | null;
    render(): React.JSX.Element | null;
}
