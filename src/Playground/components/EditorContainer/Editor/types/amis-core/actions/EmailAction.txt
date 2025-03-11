import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerContext, ListenerAction } from './Action';
export interface IEmailAction extends ListenerAction {
    actionType: 'email';
    args: {
        to: string;
        cc: string;
        bcc: string;
        subject: string;
        body: string;
        [propName: string]: any;
    };
}
/**
 * 邮件动作
 *
 * @export
 * @class EmailAction
 * @implements {Action}
 */
export declare class EmailAction implements RendererAction {
    run(action: IEmailAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
