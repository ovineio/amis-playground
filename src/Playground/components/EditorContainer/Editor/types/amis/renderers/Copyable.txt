/**
 * @file scoped.jsx.
 * @author fex
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { SchemaIcon, SchemaTpl } from '../Schema';
export interface SchemaCopyableObject {
    /**
     * 可以配置图标
     */
    icon?: SchemaIcon;
    /**
     * 配置复制时的内容模板。
     */
    content?: SchemaTpl;
    /**
     * 提示文字内容
     */
    tooltip?: string;
}
export type SchemaCopyable = boolean | SchemaCopyableObject;
export interface CopyableProps extends RendererProps {
    name?: string;
    label?: string;
    copyable: SchemaCopyable;
    tooltipContainer?: any;
}
export declare const HocCopyable: () => (Component: React.ComponentType<any>) => any;
export default HocCopyable;
