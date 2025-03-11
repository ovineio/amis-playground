import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ListenerAction } from './Action';
export interface IWaitAction extends ListenerAction {
    actionType: 'wait';
    args: {
        time: number;
    };
}
/**
 * 事件本身相关动作
 *
 * @export
 * @class EventAction
 * @implements {Action}
 */
export declare class WaitAction implements RendererAction {
    run(action: IWaitAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
