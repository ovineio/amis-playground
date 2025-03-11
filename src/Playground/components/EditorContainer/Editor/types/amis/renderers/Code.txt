/**
 * @file 代码高亮
 */
import React from 'react';
import { BaseSchema } from '../Schema';
import { RendererProps } from 'amis-core';
import type { editor as EditorNamespace } from 'monaco-editor';
export type MonacoEditor = typeof EditorNamespace;
export type CodeBuiltinTheme = EditorNamespace.BuiltinTheme;
export type IMonaco = {
    editor: MonacoEditor;
    [propName: string]: any;
};
export interface Token {
    /**
     * token 的正则
     */
    regex: string;
    /**
     * 正则的 flag
     */
    regexFlags?: string;
    /**
     * token 名称
     */
    name: string;
    /**
     * 文字颜色
     */
    color?: string;
    /**
     * 背景色，不过不知道为何没效果
     */
    background?: string;
    /**
     * 文字样式
     */
    fontStyle?: string;
}
export interface CustomLang {
    /**
     * 语言名字
     */
    name: string;
    /**
     * token
     */
    tokens: Token[];
    /**
     * 编辑器颜色相关配置，不传使用内置默认值
     */
    colors?: EditorNamespace.IColors;
}
/**
 * 代码高亮组件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/code
 */
export interface CodeSchema extends BaseSchema {
    type: 'code';
    /**
     * 语言类型
     */
    language?: 'bat' | 'c' | 'coffeescript' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'handlebars' | 'html' | 'ini' | 'java' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'msdax' | 'objective-c' | 'php' | 'plaintext' | 'postiats' | 'powershell' | 'pug' | 'python' | 'r' | 'razor' | 'ruby' | 'sb' | 'scss' | 'shell' | 'sol' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml' | string;
    editorTheme?: CodeBuiltinTheme;
    /**
     * tab 大小
     */
    tabSize?: number;
    /**
     * 是否折行
     */
    wordWrap?: boolean;
    /**
     * 自定义语言
     */
    customLang?: CustomLang;
    /**
     * 使用的标签，默认多行使用pre，单行使用code
     */
    wrapperComponent?: string;
    /**
     * 最大高度，单位为px
     */
    maxHeight?: number;
}
export interface CodeProps extends RendererProps, Omit<CodeSchema, 'type' | 'className' | 'wrapperComponent'> {
    wrapperComponent?: any;
}
export default class Code extends React.Component<CodeProps> {
    static propsList: string[];
    static defaultProps: Partial<CodeProps>;
    monaco: IMonaco;
    toDispose: Array<Function>;
    codeRef: React.RefObject<HTMLElement>;
    customLang: CustomLang;
    sourceCode: string;
    constructor(props: CodeProps);
    shouldComponentUpdate(nextProps: CodeProps): boolean;
    componentDidMount(): void;
    componentDidUpdate(preProps: CodeProps): Promise<void>;
    handleMonaco(monaco: any): Promise<void>;
    resolveLanguage(props?: CodeProps): string;
    /** 注册并返回当前主题名称，如果未自定义主题，则范围editorTheme值，默认为'vs' */
    registerAndGetTheme(): string;
    render(): React.JSX.Element;
}
export declare class CodeRenderer extends Code {
}
