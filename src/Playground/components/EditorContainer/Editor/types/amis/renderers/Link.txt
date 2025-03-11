import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaTpl } from '../Schema';
import { BadgeObject } from 'amis-ui';
/**
 * Link 链接展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/link
 */
export interface LinkSchema extends BaseSchema {
    /**
     * 指定为 link 链接展示控件
     */
    type: 'link';
    /**
     * 是否新窗口打开。
     */
    blank?: boolean;
    /**
     * 链接地址
     */
    href?: string;
    /**
     * 链接内容，如果不配置将显示链接地址。
     */
    body?: SchemaTpl;
    /**
     * 角标
     */
    badge?: BadgeObject;
    /**
     * a标签原生target属性
     */
    htmlTarget?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 右侧图标
     */
    rightIcon?: string;
}
export interface LinkProps extends RendererProps, Omit<LinkSchema, 'type' | 'className'> {
}
export declare class LinkCmpt extends React.Component<LinkProps, object> {
    static defaultProps: {
        blank: boolean;
        disabled: boolean;
        htmlTarget: string;
    };
    handleClick(e: React.MouseEvent<any>): void;
    getHref(): void;
    render(): React.JSX.Element;
}
export declare class LinkFieldRenderer extends LinkCmpt {
}
