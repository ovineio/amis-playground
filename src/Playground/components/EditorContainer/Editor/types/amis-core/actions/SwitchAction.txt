import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ILogicAction } from './Action';
export interface ISwitchAction extends ILogicAction {
    actionType: 'switch';
}
/**
 * 排他动作
 */
export declare class SwitchAction implements RendererAction {
    run(action: ISwitchAction, renderer: ListenerContext, event: RendererEvent<any>, mergeData: any): Promise<void>;
}
