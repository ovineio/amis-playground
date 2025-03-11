/**
 * @file 用于显示日志的组件，比如显示命令行的输出结果
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
export type LogOperation = 'stop' | 'restart' | 'showLineNumber' | 'clear' | 'filter';
/**
 * 日志展示组件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/log
 */
export interface LogSchema extends BaseSchema {
    /**
     * 指定为 log 链接展示控件
     */
    type: 'log';
    /**
     * 自定义 CSS 类名
     */
    className?: string;
    /**
     * 获取日志的地址
     */
    source: string;
    /**
     * 控件高度
     */
    height?: number;
    /**
     * 是否自动滚动到最底部
     */
    autoScroll?: boolean;
    /**
     * 返回内容字符编码
     */
    encoding?: string;
    /**
     * 限制最大日志数量
     */
    maxLength?: number;
    /**
     * 每行高度
     */
    rowHeight?: number;
    /**
     * 一些可操作选项
     */
    operation?: Array<LogOperation>;
    /**
     * credentials 配置
     */
    credentials?: string;
}
export interface LogProps extends RendererProps, Omit<LogSchema, 'type' | 'className'> {
}
export interface LogState {
    lastLine: string;
    logs: string[];
    originLastLine: string;
    originLogs: string[];
    refresh: boolean;
    showLineNumber: boolean;
    filterWord: string;
}
export declare class Log extends React.Component<LogProps, LogState> {
    static defaultProps: {
        height: number;
        autoScroll: boolean;
        placeholder: string;
        encoding: string;
    };
    isDone: boolean;
    autoScroll: boolean;
    logRef: React.RefObject<HTMLDivElement>;
    state: LogState;
    constructor(props: LogProps);
    componentWillUnmount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: LogProps): void;
    pauseOrResumeScrolling(): void;
    refresh: (e: React.MouseEvent<HTMLElement>) => void;
    clear: (e?: React.MouseEvent<HTMLElement>) => void;
    lastLine: string;
    logs: string[];
    filterWord: (logs: string[], lastLine: string, word: string) => void;
    addLines: (lines: string[]) => void;
    loadLogs(): Promise<void>;
    ansiColrToHtml(line: string): string | React.JSX.Element;
    renderHighlightWord(line: string): string | React.JSX.Element | (string | React.JSX.Element)[];
    /**
     * 渲染某一行
     */
    renderLine(index: number, line: string, showLineNumber: boolean): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class LogRenderer extends Log {
}
