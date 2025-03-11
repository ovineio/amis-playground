import React from 'react';
import { RendererEnv } from './env';
import { RendererProps } from './factory';
import { TranslateFn } from './locale';
import { IRendererStore } from './store';
import { SchemaNode } from './types';
import { StatusScopedProps } from './StatusScoped';
import { GlobalVariableItem } from './globalVar';
export interface RootRenderProps {
    globalVars?: Array<GlobalVariableItem>;
    location?: Location;
    theme?: string;
    data?: Record<string, any>;
    context?: Record<string, any>;
    locale?: string;
    [propName: string]: any;
}
export interface RootProps extends StatusScopedProps {
    schema: SchemaNode;
    rootStore: IRendererStore;
    env: RendererEnv;
    theme: string;
    pathPrefix?: string;
    locale?: string;
    translate?: TranslateFn;
    [propName: string]: any;
}
export interface RootWrapperProps {
    env: RendererEnv;
    children: React.ReactNode | Array<React.ReactNode>;
    schema: SchemaNode;
    rootStore: IRendererStore;
    theme: string;
    data?: Record<string, any>;
    context?: Record<string, any>;
    [propName: string]: any;
}
export declare function addRootWrapper(fn: (props: RootWrapperProps) => React.ReactNode): void;
export declare class Root extends React.Component<RootProps> {
    resolveDefinitions(name: string): {} | undefined;
    render(): React.JSX.Element;
}
export interface renderChildProps extends Partial<Omit<RendererProps, 'statusStore'>>, StatusScopedProps {
    env: RendererEnv;
}
export type ReactElement = React.ReactNode[] | JSX.Element | null | false;
export declare function renderChildren(prefix: string, node: SchemaNode, props: renderChildProps): ReactElement;
export declare function renderChild(prefix: string, node: SchemaNode, props: renderChildProps): ReactElement;
declare const _default: (props: Omit<RootProps & {
    scopeRef?: ((ref: any) => void) | undefined;
}, "statusStore">, ref: any) => React.JSX.Element;
export default _default;
