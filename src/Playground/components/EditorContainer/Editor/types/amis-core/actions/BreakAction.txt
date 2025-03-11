import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ILogicAction } from './Action';
export interface IBreakAction extends ILogicAction {
    actionType: 'break';
}
/**
 * breach
 *
 * @export
 * @class BreakAction
 * @implements {Action}
 */
export declare class BreakAction implements RendererAction {
    run(action: IBreakAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
