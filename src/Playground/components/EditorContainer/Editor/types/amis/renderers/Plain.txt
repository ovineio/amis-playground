import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaTpl } from '../Schema';
/**
 * Plain 纯文本渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/plain
 */
export interface PlainSchema extends BaseSchema {
    /**
     * 指定为模板渲染器。
     *
     * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/template
     */
    type: 'plain' | 'text';
    tpl?: SchemaTpl;
    text?: SchemaTpl;
    /**
     * 是否内联显示？
     */
    inline?: boolean;
    /**
     * 占位符
     * @deprecated -
     */
    placeholder?: string;
}
export interface PlainProps extends RendererProps, Omit<PlainSchema, 'type' | 'className'> {
    wrapperComponent?: any;
}
export declare class Plain extends React.Component<PlainProps, object> {
    static defaultProps: Partial<PlainProps>;
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    render(): React.JSX.Element;
}
export declare class PlainRenderer extends Plain {
}
