/**
 * @file LazyComponent
 * @description
 * @author fex
 */
/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { ThemeProps } from '../theme';
export interface LazyComponentProps extends ThemeProps {
    component?: React.ElementType;
    getComponent?: () => Promise<React.ElementType>;
    placeholder?: React.ReactNode;
    unMountOnHidden?: boolean;
    childProps?: object;
    defaultVisible?: boolean;
    className?: string;
    [propName: string]: any;
}
export interface LazyComponentState {
    visible: boolean;
    component?: React.ElementType;
}
export declare class LazyComponent extends React.Component<LazyComponentProps, LazyComponentState> {
    static defaultProps: {
        placeholder: React.JSX.Element;
        unMountOnHidden: boolean;
        partialVisibility: boolean;
    };
    mounted: boolean;
    constructor(props: LazyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleVisibleChange(visible: boolean, entry?: any): void;
    render(): React.ReactNode;
}
declare const themedLazyComponent: {
    new (props: Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<LazyComponentProps, keyof ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<typeof LazyComponent>;
} & import("hoist-non-react-statics").NonReactStatics<typeof LazyComponent, {}> & {
    ComposedComponent: typeof LazyComponent;
};
export default themedLazyComponent;
