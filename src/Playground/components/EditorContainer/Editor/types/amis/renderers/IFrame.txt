import React from 'react';
import { OnEventProps, RendererProps } from 'amis-core';
import { IScopedContext } from 'amis-core';
import { BaseSchema, SchemaUrlPath } from '../Schema';
import { ActionSchema } from './Action';
/**
 * IFrame 渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/iframe
 */
export interface IFrameSchema extends BaseSchema {
    type: 'iframe';
    /**
     * 页面地址
     */
    src: SchemaUrlPath;
    /**
     * 事件相应，配置后当 iframe 通过 postMessage 发送事件时，可以触发 AMIS 内部的动作。
     */
    events?: {
        [eventName: string]: ActionSchema;
    };
    onEvent?: OnEventProps['onEvent'];
    width?: number | string;
    height?: number | string;
    allow?: string;
    name?: string;
    referrerpolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    sandbox?: string;
}
export interface IFrameProps extends RendererProps, Omit<IFrameSchema, 'type' | 'className'> {
}
export default class IFrame extends React.Component<IFrameProps, object> {
    IFrameRef: React.RefObject<HTMLIFrameElement>;
    static propsList: Array<string>;
    static defaultProps: Partial<IFrameProps>;
    state: {
        width: string | number;
        height: string | number;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: IFrameProps): void;
    componentWillUnmount(): void;
    /** 校验URL是否合法 */
    validateURL(url: any): boolean;
    onMessage(e: MessageEvent): Promise<void>;
    onLoad(): void;
    reload(subpath?: any, query?: any): void;
    receive(values: object): void;
    postMessage(type: string, data: any): void;
    render(): React.JSX.Element;
}
export declare class IFrameRenderer extends IFrame {
    static contextType: React.Context<IScopedContext>;
    constructor(props: IFrameProps, context: IScopedContext);
    componentWillUnmount(): void;
}
