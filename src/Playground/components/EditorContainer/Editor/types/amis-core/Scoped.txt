/**
 * @file 用来创建一个域，在这个域里面会把里面的运行时实例注册进来，方便组件之间的通信。
 * @author fex
 */
import React from 'react';
import { RendererEnv, RendererProps } from './factory';
import { RendererData, ActionObject } from './types';
import { ListenerAction } from './actions';
/**
 * target 里面可能包含 ?xxx=xxx，这种情况下，需要把 ?xxx=xxx 保留下来，然后对前面的部分进行 filter
 * 因为后面会对 query 部分做不一样的处理。会保留原始的值。而不是会转成字符串。
 * @param target
 * @param data
 * @returns
 */
export declare function filterTarget(target: string, data: Record<string, any>): string;
/**
 * 分割目标，如果里面有表达式，不要跟表达式里面的逗号冲突。
 * @param target
 * @returns
 */
export declare function splitTarget(target: string): Array<string>;
export interface ScopedComponentType extends React.Component<RendererProps> {
    focus?: () => void;
    doAction?: (action: ActionObject, data: RendererData, throwErrors?: boolean, args?: any) => void;
    receive?: (values: RendererData, subPath?: string, replace?: boolean) => void;
    reload?: (subpath?: string, query?: any, ctx?: RendererData, silent?: boolean, replace?: boolean, args?: any) => void;
    context: any;
    setData?: (value?: object, replace?: boolean, index?: number) => void;
}
export interface IScopedContext {
    rendererType?: string;
    component?: ScopedComponentType;
    parent?: AliasIScopedContext;
    children?: AliasIScopedContext[];
    registerComponent: (component: ScopedComponentType) => void;
    unRegisterComponent: (component: ScopedComponentType) => void;
    getComponentByName: (name: string) => ScopedComponentType;
    getComponentById: (id: string) => ScopedComponentType | undefined;
    getComponentByIdUnderCurrentScope: (id: string, ignoreScope?: IScopedContext) => ScopedComponentType | undefined;
    getComponents: () => Array<ScopedComponentType>;
    reload: (target: string, ctx: RendererData) => void | Promise<void>;
    send: (target: string, ctx: RendererData) => void;
    close: (target: string) => void;
    closeById: (target: string) => void;
    getComponentsByRefPath: (session: string, path: string) => ScopedComponentType[];
    doAction: (actions: ListenerAction | ListenerAction[], ctx: any) => void;
}
type AliasIScopedContext = IScopedContext;
export declare const ScopedContext: React.Context<IScopedContext>;
export declare function HocScoped<T extends {
    $path?: string;
    env: RendererEnv;
}>(ComposedComponent: React.ComponentType<T>, rendererType?: string): React.ComponentType<T & {
    scopeRef?: (ref: any) => void;
}> & {
    ComposedComponent: React.ComponentType<T>;
};
export default HocScoped;
