import React from 'react';
import { IScopedContext, RendererEvent } from 'amis-core';
import { RendererProps } from 'amis-core';
import { SchemaNode, ActionObject } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { IModalStore } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection, SchemaName } from '../Schema';
import { ActionSchema } from './Action';
/**
 * Drawer 抽出式弹框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/drawer
 */
export interface DrawerSchema extends BaseSchema {
    type: 'drawer';
    /**
     * 弹窗参数说明，值格式为 JSONSchema。
     */
    inputParams?: any;
    /**
     * 默认不用填写，自动会创建确认和取消按钮。
     */
    actions?: Array<ActionSchema>;
    /**
     * 内容区域
     */
    body?: SchemaCollection;
    /**
     * 配置 外层 className
     */
    className?: SchemaClassName;
    /**
     * 配置 Body 容器 className
     */
    bodyClassName?: SchemaClassName;
    /**
     * 配置 头部 容器 className
     */
    headerClassName?: SchemaClassName;
    /**
     * 配置 头部 容器 className
     */
    footerClassName?: SchemaClassName;
    /**
     * 是否支持按 ESC 关闭 Dialog
     */
    closeOnEsc?: boolean;
    name?: SchemaName;
    /**
     * Dialog 大小
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    /**
     * 请通过配置 title 设置标题
     */
    title?: SchemaCollection;
    /**
     * 从什么位置弹出
     */
    position?: 'left' | 'right' | 'top' | 'bottom';
    /**
     * 是否展示关闭按钮
     * 当值为false时，默认开启closeOnOutside
     */
    showCloseButton?: boolean;
    /**
     * 抽屉的宽度 （当position为left | right时生效）
     */
    width?: number | string;
    /**
     * 抽屉的高度 （当position为top | bottom时生效）
     */
    height?: number | string;
    /**
     * 头部
     */
    header?: SchemaCollection;
    /**
     * 底部
     */
    footer?: SchemaCollection;
    /**
     * 影响自动生成的按钮，如果自己配置了按钮这个配置无效。
     */
    confirm?: boolean;
    /**
     * 是否可以拖动弹窗大小
     */
    resizable?: boolean;
    /**
     * 是否显示蒙层
     */
    overlay?: boolean;
    /**
     * 点击外部的时候是否关闭弹框。
     */
    closeOnOutside?: boolean;
    /**
     * 是否显示错误信息
     */
    showErrorMsg?: boolean;
    /**
     * 数据映射
     */
    data?: {
        [propName: string]: any;
    };
}
export type DrawerSchemaBase = Omit<DrawerSchema, 'type'>;
export interface DrawerProps extends RendererProps, Omit<DrawerSchema, 'className' | 'data'>, SpinnerExtraProps {
    onClose: () => void;
    onConfirm: (values: Array<object>, action: ActionObject, ctx: object, targets: Array<any>) => void;
    children?: React.ReactNode | ((props?: any) => React.ReactNode);
    wrapperComponent: React.ElementType;
    lazySchema?: (props: DrawerProps) => SchemaCollection;
    store: IModalStore;
    show?: boolean;
    drawerContainer?: () => HTMLElement;
}
export interface DrawerState {
    entered: boolean;
    resizeCoord: number;
    [propName: string]: any;
}
export default class Drawer extends React.Component<DrawerProps> {
    static propsList: Array<string>;
    static defaultProps: Partial<DrawerProps>;
    reaction: any;
    $$id: string;
    drawer: any;
    clearErrorTimer: ReturnType<typeof setTimeout> | undefined;
    constructor(props: DrawerProps);
    componentWillUnmount(): void;
    buildActions(): Array<ActionSchema>;
    handleSelfClose(): Promise<void>;
    handleActionSensor(p: Promise<any>): void;
    handleAction(e: React.UIEvent<any>, action: ActionObject, data: object): void;
    handleDrawerConfirm(values: object[], action: ActionObject, ...args: Array<any>): void;
    handleDrawerClose(...args: Array<any>): void;
    handleDialogConfirm(values: object[], action: ActionObject, ...args: Array<any>): void;
    handleDialogClose(...args: Array<any>): void;
    handleChildFinished(value: any, action: ActionObject): void;
    handleFormInit(data: any): void;
    handleFormChange(data: any, name?: string): void;
    handleFormSaved(data: any, response: any): void;
    handleEntered(): void;
    handleExited(): void;
    getPopOverContainer(): Element | null;
    renderBody(body: SchemaNode, key?: any): React.ReactNode;
    renderFooter(): React.JSX.Element | null;
    openFeedback(dialog: any, ctx: any): Promise<unknown>;
    render(): React.JSX.Element;
}
export declare class DrawerRenderer extends Drawer {
    static contextType: React.Context<IScopedContext>;
    constructor(props: DrawerProps, context: IScopedContext);
    componentWillUnmount(): void;
    tryChildrenToHandle(action: ActionObject, ctx: object, rawAction?: ActionObject): boolean;
    doAction(action: ActionObject, data: object, throwErrors: boolean): any;
    handleAction(e: React.UIEvent<any> | void, action: ActionObject, data: object, throwErrors?: boolean, delegate?: IScopedContext, rendererEvent?: RendererEvent<any>): Promise<any>;
    handleChildFinished(value: any, action: ActionObject): void;
    handleDialogConfirm(values: object[], action: ActionObject, ...rest: Array<any>): void;
    handleDrawerConfirm(values: object[], action: ActionObject, ...rest: Array<any>): void;
    reloadTarget(target: string, data?: any): void;
    closeTarget(target: string): void;
    setData(values: object, replace?: boolean): void;
    getData(): any;
}
