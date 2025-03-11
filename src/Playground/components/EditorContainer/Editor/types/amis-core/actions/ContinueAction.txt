import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ILogicAction } from './Action';
export interface IContinueAction extends ILogicAction {
    actionType: 'continue';
}
/**
 * continue
 *
 * @export
 * @class ContinueAction
 * @implements {Action}
 */
export declare class ContinueAction implements RendererAction {
    run(action: IContinueAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
