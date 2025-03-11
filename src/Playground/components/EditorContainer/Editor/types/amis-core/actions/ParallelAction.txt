import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ILogicAction } from './Action';
export interface IParallelAction extends ILogicAction {
    actionType: 'parallel';
}
export declare class ParallelAction implements RendererAction {
    run(action: IParallelAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
