import { Api } from '../types';
import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IAjaxAction extends ListenerAction {
    action: 'ajax';
    api: Api;
    messages?: {
        success: string;
        failed: string;
    };
    options?: Record<string, any>;
    [propName: string]: any;
}
/**
 * 发送请求动作
 *
 * @export
 * @class AjaxAction
 * @implements {Action}
 */
export declare class AjaxAction implements RendererAction {
    fetcherType: string;
    constructor(fetcherType?: string);
    run(action: IAjaxAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<any>;
}
