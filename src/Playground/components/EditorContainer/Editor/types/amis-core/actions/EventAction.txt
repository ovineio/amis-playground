import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ListenerAction } from './Action';
export interface IEventAction extends ListenerAction {
    actionType: 'setEventData' | 'preventDefault' | 'stopPropagation';
    args: {
        key?: string;
        value?: any;
        [propName: string]: any;
    };
}
/**
 * 事件本身相关动作
 *
 * @export
 * @class EventAction
 * @implements {Action}
 */
export declare class EventAction implements RendererAction {
    run(action: IEventAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
