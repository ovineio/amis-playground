import React from 'react';
import { RendererProps } from 'amis-core';
import { Schema } from 'amis-core';
import { BaseSchema, SchemaCollection } from '../Schema';
export interface EachExtraProps extends RendererProps {
    items: any;
    item: any;
    index: number;
    itemKeyName: string;
    indexKeyName: string;
    name: string;
}
/**
 * Each 循环功能渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/each
 */
export interface EachSchema extends BaseSchema {
    /**
     * 指定为each展示类型
     */
    type: 'each';
    /**
     * 关联字段名
     */
    name?: string;
    /**
     * 关联字段名 支持数据映射
     */
    source?: string;
    /**
     * 用来控制通过什么字段读取成员数据，考虑到可能多层嵌套
     * 如果名字一样会读取不到上层变量，所以这里可以指定一下
     * @default item
     */
    itemKeyName?: string;
    /**
     * 用来控制通过什么字段读取序号，考虑到可能多层嵌套
     * 如果名字一样会读取不到上层变量，所以这里可以指定一下
     * @default index
     */
    indexKeyName?: string;
    items?: SchemaCollection;
    placeholder?: string;
}
export interface EachProps extends RendererProps {
    name: string;
    items: Schema;
}
export default class Each extends React.Component<EachProps> {
    static propsList: Array<string>;
    static defaultProps: {
        className: string;
        placeholder: string;
    };
    render(): React.JSX.Element;
}
export declare class EachRenderer extends Each {
}
