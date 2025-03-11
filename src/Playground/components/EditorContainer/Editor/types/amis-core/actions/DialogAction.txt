import { Schema, SchemaNode } from '../types';
import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IAlertAction extends ListenerAction {
    actionType: 'alert';
    dialog?: Schema;
    args: {
        msg: string;
        [propName: string]: any;
    };
}
export interface IConfirmAction extends ListenerAction {
    actionType: 'confirm';
    args: {
        title: string;
        msg: string;
        [propName: string]: any;
    };
}
export interface IDialogAction extends ListenerAction {
    actionType: 'dialog';
    args: {
        dialog: SchemaNode;
    };
    dialog?: SchemaNode;
    /**
     * 是否等待确认结果
     */
    waitForAction?: boolean;
    /**
     * 如果等待结果，将弹窗结果保存到此处变量
     */
    outputVar?: string;
}
export interface IConfirmDialogAction extends ListenerAction {
    actionType: 'confirmDialog';
    dialog?: Schema;
    args: {
        msg: string;
        title: string;
        body?: Schema;
        closeOnEsc?: boolean;
        size?: '' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
        confirmText?: string;
        cancelText?: string;
        confirmBtnLevel?: string;
        cancelBtnLevel?: string;
    };
}
/**
 * 打开弹窗动作
 *
 * @export
 * @class DialogAction
 * @implements {Action}
 */
export declare class DialogAction implements RendererAction {
    run(action: IDialogAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
export interface ICloseDialogAction extends ListenerAction {
    actionType: 'closeDialog';
}
/**
 * 关闭弹窗动作
 *
 * @export
 * @class CloseDialogAction
 * @implements {Action}
 */
export declare class CloseDialogAction implements RendererAction {
    run(action: ListenerAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
/**
 * alert提示动作
 */
export declare class AlertAction implements RendererAction {
    run(action: IAlertAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
/**
 * confirm确认提示动作
 */
export declare class ConfirmAction implements RendererAction {
    run(action: IConfirmDialogAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<any>;
}
