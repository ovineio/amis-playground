import { SchemaNode } from '../types';
import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IDrawerAction extends ListenerAction {
    actionType: 'drawer';
    args: {
        drawer: SchemaNode;
    };
    drawer?: SchemaNode;
    /**
     * 是否等待确认结果
     */
    waitForAction?: boolean;
    outputVar?: string;
}
/**
 * 打开抽屉动作
 *
 * @export
 * @class DrawerAction
 * @implements {Action}
 */
export declare class DrawerAction implements RendererAction {
    run(action: IDrawerAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
export interface ICloseDrawerAction extends ListenerAction {
    actionType: 'closeDrawer';
}
/**
 * 关闭抽屉动作
 *
 * @export
 * @class CloseDrawerAction
 * @implements {Action}
 */
export declare class CloseDrawerAction implements RendererAction {
    run(action: ListenerAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
