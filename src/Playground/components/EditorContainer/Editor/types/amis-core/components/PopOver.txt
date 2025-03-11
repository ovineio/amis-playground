/**
 * @file PopOver
 * @description
 * @author fex
 */
/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { ClassNamesFn } from '../theme';
import { TestIdBuilder } from '../utils';
export interface Offset {
    x: number;
    y: number;
}
export interface PopOverProps {
    className?: string;
    placement?: string;
    positionTop?: number;
    positionLeft?: number;
    arrowOffsetLeft?: number;
    arrowOffsetTop?: number;
    offset?: ((clip: object, offset: object) => Offset) | Offset;
    style?: object;
    overlay?: boolean;
    onHide?: () => void;
    onClick?: (e: React.MouseEvent<any>) => void;
    classPrefix: string;
    classnames: ClassNamesFn;
    testIdBuilder?: TestIdBuilder;
    [propName: string]: any;
}
interface PopOverState {
    xOffset: number;
    yOffset: number;
}
export declare class PopOver extends React.PureComponent<PopOverProps, PopOverState> {
    static defaultProps: {
        className: string;
        offset: {
            x: number;
            y: number;
        };
        overlay: boolean;
        placement: string;
    };
    state: {
        xOffset: number;
        yOffset: number;
    };
    parent: HTMLElement;
    wrapperRef: React.RefObject<HTMLDivElement>;
    isRootClosed: boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    handleRootMouseDownCapture(e: MouseEvent): void;
    handleRootMouseUpCapture(e: MouseEvent): void;
    handleRootMouseUp(e: MouseEvent): void;
    mayUpdateOffset(): void;
    handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void;
    render(): React.JSX.Element;
}
declare const _default: {
    new (props: Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<PopOverProps, keyof import("../theme").ThemeProps> & import("../theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<typeof PopOver>;
} & import("hoist-non-react-statics").NonReactStatics<typeof PopOver, {}> & {
    ComposedComponent: typeof PopOver;
};
export default _default;
