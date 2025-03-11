/**
 * @file Tag
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaIcon } from '../Schema';
/**
 * Tag
 */
export interface TagSchema extends BaseSchema {
    type: 'tag';
    /**
     * 类名
     */
    className?: SchemaClassName;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 标签颜色
     */
    color?: string;
    /**
     * 标签文本内容
     */
    label: string;
    /**
     * normal: 面性标签，对应color的背景色
     * rounded: 线性标签， 对应color的边框
     * status: 带图标的标签， 图标可以自定义
     */
    displayMode?: 'normal' | 'rounded' | 'status';
    /**
     * status模式时候设置的前置图标
     */
    icon?: SchemaIcon;
    /**
     * 是否展示关闭按钮
     */
    closable?: boolean;
    /**
     * 关闭图标
     */
    closeIcon: SchemaIcon;
    /**
     * 是否是可选的标签
     */
    checkable?: boolean;
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}
export interface TagProps extends RendererProps, Omit<TagSchema, 'type' | 'className'> {
    onClick?: (params: {
        [propName: string]: any;
    }) => void;
    onClose?: (params: {
        [propName: string]: any;
    }) => void;
}
export declare class TagField extends React.Component<TagProps, object> {
    static defaultProps: Partial<TagProps>;
    handleClick(nativeEvent: React.MouseEvent<any>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    handleClose(nativeEvent: React.MouseEvent<HTMLElement>): void;
    render(): React.JSX.Element;
    private resolveLabel;
    private getResolvedEventParams;
}
export declare class TagFieldRenderer extends TagField {
}
