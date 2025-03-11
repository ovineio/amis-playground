import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaTpl } from '../Schema';
import { BadgeObject, IconCheckedSchema } from 'amis-ui';
/**
 * Icon 图标渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/icon
 */
export interface IconSchema extends BaseSchema {
    type: 'icon';
    /**
     * 按钮类型
     */
    icon: SchemaTpl | IconCheckedSchema;
    vendor?: 'iconfont' | 'fa' | '';
    /**
     * 角标
     */
    badge?: BadgeObject;
}
export interface IconProps extends RendererProps, Omit<IconSchema, 'type' | 'className'> {
}
export declare class Icon extends React.Component<IconProps, object> {
    static defaultProps: Partial<IconProps>;
    handleClick(e: React.MouseEvent<any>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    render(): React.JSX.Element;
}
export declare class IconRenderer extends Icon {
}
