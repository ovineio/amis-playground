import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ListenerAction } from './Action';
export interface ILinkAction extends ListenerAction {
    actionType: 'link' | 'url' | 'jump';
    args: {
        link?: string;
        url?: string;
        blank?: boolean;
        params?: {
            [key: string]: string;
        };
        [propName: string]: any;
    };
}
/**
 * 打开页面动作
 *
 * @export
 * @class LinkAction
 * @implements {Action}
 */
export declare class LinkAction implements RendererAction {
    run(action: ILinkAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
