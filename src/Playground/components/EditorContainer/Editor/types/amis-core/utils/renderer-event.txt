/// <reference types="react" />
import { ListenerAction } from '../actions/Action';
import { RendererProps } from '../factory';
import { IScopedContext } from '../Scoped';
import { TreeItem } from './helper';
import type { PlainObject } from '../types';
export interface debounceConfig {
    maxWait?: number;
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}
export interface trackConfig {
    id: string;
    name: string;
}
export interface EventListeners {
    [propName: string]: {
        debounce?: debounceConfig;
        track?: trackConfig;
        weight?: number;
        actions: ListenerAction[];
    };
}
export interface OnEventProps {
    onEvent?: {
        [propName: string]: {
            weight?: number;
            actions: ListenerAction[];
            debounce?: debounceConfig;
            track?: trackConfig;
        };
    };
}
export interface RendererEventListener {
    renderer: React.Component<RendererProps>;
    type: string;
    weight: number;
    debounce: debounceConfig | null;
    track: trackConfig | null;
    actions: ListenerAction[];
    executing?: boolean;
    debounceInstance?: any;
}
export type RendererEvent<T, P = any> = {
    context: T;
    type: string;
    prevented?: boolean;
    stoped?: boolean;
    data?: P;
    preventDefault: () => void;
    stopPropagation: () => void;
    setData: (data: P) => void;
    pendingPromise: Promise<any>[];
    allDone: () => Promise<any>;
};
export interface RendererEventContext {
    data?: any;
    [propName: string]: any;
}
export declare function createRendererEvent<T extends RendererEventContext>(type: string, context: T): RendererEvent<T>;
export declare const bindEvent: (renderer: any) => ((eventName?: string) => void) | undefined;
export declare const bindGlobalEventForRenderer: (renderer: any) => (() => void) | undefined;
export declare const bindGlobalEvent: (eventName: string, callback: (data: PlainObject) => void) => (() => void) | undefined;
export declare function dispatchEvent(e: string | React.MouseEvent<any>, renderer: React.Component<RendererProps>, scoped: IScopedContext, data: any, broadcast?: RendererEvent<any>): Promise<RendererEvent<any> | void>;
export declare function dispatchGlobalEventForRenderer(eventName: string, renderer: React.Component<RendererProps>, scoped: IScopedContext, data: any, broadcast: RendererEvent<any>): Promise<void>;
export declare function dispatchGlobalEvent(eventName: string, data: any): Promise<void>;
export declare const getRendererEventListeners: () => RendererEventListener[];
/**
 * 兼容历史配置，追加对应name的值
 * @param props
 * @param data
 * @param valueKey
 */
export declare const resolveEventData: (props: any, data: any, valueKey?: string) => object;
/**
 * 基于 index、condition、oldCondition 获取匹配的事件目标
 * @param tree
 * @param ctx
 * @param index
 * @param condition
 * @param oldCondition
 * @returns
 */
export declare function getMatchedEventTargets<T extends TreeItem>(tree: Array<T>, ctx: any, index?: string | number, condition?: string, oldCondition?: string): Promise<T[]>;
declare const _default: {};
export default _default;
