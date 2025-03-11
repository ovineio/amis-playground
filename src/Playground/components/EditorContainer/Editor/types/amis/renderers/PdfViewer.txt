/**
 * @file PdfViewer.tsx PDF 预览
 *
 * @created: 2024/02/26
 */
/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { IScopedContext, RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
export declare const PdfView: React.LazyExoticComponent<{
    new (props: Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<import("amis-ui/lib/components/PdfViewer").PdfViewerProps, keyof import("amis-core").ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<React.FC<import("amis-ui/lib/components/PdfViewer").PdfViewerProps>>;
} & import("hoist-non-react-statics").NonReactStatics<React.FC<import("amis-ui/lib/components/PdfViewer").PdfViewerProps>, {}> & {
    ComposedComponent: React.FC<import("amis-ui/lib/components/PdfViewer").PdfViewerProps>;
}>;
export interface PdfViewerSchema extends BaseSchema {
    type: 'pdf-viewer';
    /**
     * 文件地址
     */
    src?: string;
    /**
     * 文件取值，一般配合表单使用
     */
    name?: string;
    width?: number;
    height?: number;
    background?: string;
}
export interface PdfViewerProps extends RendererProps {
}
interface PdfViewerState {
    loading: boolean;
    inited: boolean;
    width?: number;
    error: boolean;
}
export default class PdfViewer extends React.Component<PdfViewerProps, PdfViewerState> {
    file?: ArrayBuffer;
    reader?: FileReader;
    fetchCancel?: Function;
    wrapper: React.RefObject<HTMLDivElement>;
    constructor(props: PdfViewerProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: PdfViewerProps): void;
    componentWillUnmount(): void;
    abortLoad(): void;
    renderPdf(): Promise<void>;
    fetchPdf(): Promise<void>;
    renderFormFile(): Promise<void>;
    renderEmpty(): React.JSX.Element | null;
    renderError(): React.JSX.Element | null;
    renderTip(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class PdfViewerRenderer extends PdfViewer {
    static contextType: React.Context<IScopedContext>;
    constructor(props: PdfViewerProps, context: IScopedContext);
    componentWillUnmount(): void;
}
export {};
