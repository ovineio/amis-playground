import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface ICmptAction extends ListenerAction {
    actionType: string;
    args: {
        resetPage?: boolean;
        path?: string;
        value?: string | {
            [key: string]: string;
        };
        index?: number;
        condition?: any;
    };
}
/**
 * 组件动作
 *
 * @export
 * @class CmptAction
 * @implements {Action}
 */
export declare class CmptAction implements RendererAction {
    run(action: ICmptAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<any>;
}
