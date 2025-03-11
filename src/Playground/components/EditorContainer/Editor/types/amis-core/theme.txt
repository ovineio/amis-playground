import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
export type ClassValue = ClassValue[] | Record<string, any> | string | number | boolean | null | undefined;
export type ClassNamesFn = (...classes: ClassValue[]) => string;
interface ThemeConfig {
    classPrefix?: string;
    renderers?: {
        [propName: string]: any;
    };
    components?: {
        [propName: string]: any;
    };
    [propName: string]: any;
}
export declare function theme(name: string, config: Partial<ThemeConfig>): void;
export declare function makeClassnames(ns?: string): (...classes: ClassValue[]) => string;
export interface ThemeInstance extends ThemeConfig {
    getRendererConfig: (name?: string) => any;
    getComponentConfig: (name?: string) => any;
    classnames: ClassNamesFn;
}
export declare function hasTheme(theme: string): boolean;
export declare function setDefaultTheme(theme: string): void;
export declare function classnames(...classes: ClassValue[]): any;
export declare function getClassPrefix(): string | undefined;
export declare function getTheme(theme: string): ThemeInstance;
export interface ThemeProps {
    classnames: ClassNamesFn;
    classPrefix: string;
    className?: string;
    theme?: string;
    mobileUI?: boolean;
    style?: {
        [propName: string]: any;
    };
}
export interface ThemeOuterProps extends Partial<ThemeProps> {
}
export declare let defaultTheme: string;
export declare const ThemeContext: React.Context<string>;
export declare function themeable<T extends React.ComponentType<React.ComponentProps<T> & ThemeProps> & {
    themeKey?: string;
}>(ComposedComponent: T, methods?: Array<string>): {
    new (props: JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof ThemeProps>> & ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<T>;
} & hoistNonReactStatic.NonReactStatics<T, {}> & {
    ComposedComponent: T;
};
export {};
