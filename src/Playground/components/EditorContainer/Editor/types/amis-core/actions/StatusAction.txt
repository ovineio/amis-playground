import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IStatusAction extends ListenerAction {
    actionType: 'static' | 'nonstatic' | 'show' | 'visibility' | 'hidden' | 'enabled' | 'disabled' | 'usability';
}
/**
 * 状态更新动作
 *
 * @export
 * @class StatusAction
 * @implements {Action}
 */
export declare class StatusAction implements RendererAction {
    run(action: IStatusAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
