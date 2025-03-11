import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ILogicAction } from './Action';
export interface ILoopAction extends ILogicAction {
    actionType: 'loop';
    args: {
        loopName: string;
        [propName: string]: any;
    };
}
/**
 * 循环动作
 *
 * @export
 * @class LoopAction
 * @implements {Action}
 */
export declare class LoopAction implements RendererAction {
    run(action: ILoopAction, renderer: ListenerContext, event: RendererEvent<any>, mergeData: any): Promise<void>;
}
