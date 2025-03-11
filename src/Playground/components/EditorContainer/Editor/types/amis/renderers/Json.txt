import React from 'react';
import { RendererProps } from 'amis-core';
import type { InteractionProps } from 'react-json-view';
import { BaseSchema } from '../Schema';
export declare const JsonView: React.LazyExoticComponent<React.ComponentType<any>>;
/**
 * JSON 数据展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/json
 */
export interface JsonSchema extends BaseSchema {
    /**
     * 指定为Json展示类型
     */
    type: 'json' | 'static-json';
    /**
     * 要展示的 JSON 数据
     */
    value?: Record<string, any> | any[];
    /**
     * 默认展开的级别
     */
    levelExpand?: number;
    /**
     * 支持从数据链取值
     */
    source?: string;
    /**
     * 是否可修改
     */
    mutable?: boolean;
    /**
     * 是否显示数据类型
     */
    displayDataTypes?: boolean;
    /**
     * 是否可复制
     */
    enableClipboard?: boolean;
    /**
     * 图标风格
     */
    iconStyle?: 'square' | 'circle' | 'triangle';
    /**
     * 是否显示键的引号
     */
    quotesOnKeys?: boolean;
    /**
     * 是否为键排序
     */
    sortKeys?: boolean;
    /**
     * 设置字符串的最大展示长度，超出长度阈值的字符串将被截断，点击value可切换字符串展示方式，默认为false
     */
    ellipsisThreshold?: number | false;
}
export interface JSONProps extends RendererProps, JsonSchema {
    levelExpand: number;
    className?: string;
    placeholder?: string;
    jsonTheme: string;
    hideRoot?: boolean;
    source?: string;
}
export declare class JSONField extends React.Component<JSONProps, object> {
    static defaultProps: Partial<JSONProps>;
    emitChange(e: InteractionProps): boolean;
    shouldExpandNode({ namespace }: {
        namespace: Array<string | null>;
    }): boolean;
    render(): React.JSX.Element;
}
export declare class JSONFieldRenderer extends JSONField {
}
