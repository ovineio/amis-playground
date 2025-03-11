import { ActionObject } from '../types';
import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
type ScriptType = string | ((renderer: any, doAction: (action: ActionObject, data: Record<string, any>) => void, event: RendererEvent<any>, action: ListenerAction) => void);
export interface ICustomAction extends ListenerAction {
    actionType: 'custom';
    args: {
        script: ScriptType;
    };
    script?: ScriptType;
}
/**
 * 自定义动作，JS脚本
 *
 * @export
 * @class CustomAction
 * @implements {ActionObject}
 */
export declare class CustomAction implements RendererAction {
    run(action: ICustomAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
export {};
