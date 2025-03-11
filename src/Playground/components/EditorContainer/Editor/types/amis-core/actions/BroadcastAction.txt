import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IBroadcastAction extends ListenerAction {
    actionType: 'broadcast';
    args: {
        eventName: string;
    };
    eventName?: string;
}
/**
 * broadcast
 *
 * @export
 * @class BroadcastAction
 * @implements {Action}
 */
export declare class BroadcastAction implements RendererAction {
    run(action: IBroadcastAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
