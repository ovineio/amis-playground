import React from 'react';
import { RendererProps } from 'amis-core';
import { TestIdBuilder } from 'amis-core';
import { BaseSchema, SchemaTpl } from '../Schema';
import { BadgeObject } from 'amis-ui';
/**
 * tpl 渲染器
 */
export interface TplSchema extends BaseSchema {
    /**
     * 指定为模板渲染器。
     *
     * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/template
     */
    type: 'tpl' | 'html';
    tpl?: SchemaTpl;
    html?: SchemaTpl;
    text?: SchemaTpl;
    raw?: string;
    /**
     * 是否内联显示？
     */
    inline?: boolean;
    /**
     * 标签类型
     */
    wrapperComponent?: any;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 角标
     */
    badge?: BadgeObject;
    testidBuilder?: TestIdBuilder;
}
export interface TplProps extends RendererProps, TplSchema {
    className?: string;
    value?: string;
}
interface TplState {
    content: string;
}
export declare class Tpl extends React.Component<TplProps, TplState> {
    static defaultProps: Partial<TplProps>;
    dom: any;
    mounted: boolean;
    sn: number;
    constructor(props: TplProps);
    componentDidUpdate(prevProps: Readonly<TplProps>): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateContent(): Promise<void>;
    getContent(): string;
    getAsyncContent(): Promise<string>;
    /**
     * 过滤掉HTML标签, 仅提取文本内容, 用于HTML标签的title属性
     */
    getTitle(content: string): string;
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    render(): React.JSX.Element;
}
export declare class TplRenderer extends Tpl {
}
export {};
