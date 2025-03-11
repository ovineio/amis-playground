import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface ICopyAction extends ListenerAction {
    actionType: 'copy';
    args: {
        content: string;
        copyFormat?: string;
        [propName: string]: any;
    };
}
/**
 * 复制动作
 *
 * @export
 * @class CopyAction
 * @implements {Action}
 */
export declare class CopyAction implements RendererAction {
    run(action: ICopyAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
