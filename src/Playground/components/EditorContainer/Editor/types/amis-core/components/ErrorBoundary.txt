/**
 * @file ErrorBoundary
 * @description 捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误
 * @author wibetter
 */
import React from 'react';
interface ErrorBoundaryProps {
    customErrorMsg?: string;
    fallback?: () => void;
    children: any;
}
interface ErrorBoundaryStates {
    hasError: boolean;
}
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
    constructor(props: any);
    componentDidCatch(error: any, errorInfo: any): void;
    render(): any;
}
export {};
