import { RendererEvent } from '../utils/renderer-event';
import { RendererAction, ListenerAction, ListenerContext } from './Action';
export interface IPageGoAction extends ListenerAction {
    actionType: 'goBack' | 'refresh' | 'goPage';
    args: {
        delta?: number;
        [propName: string]: any;
    };
}
/**
 * 返回上个页面
 *
 * @export
 * @class PageGoBackAction
 * @implements {Action}
 */
export declare class PageGoBackAction implements RendererAction {
    run(action: IPageGoAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
/**
 * 到指定页面
 *
 * @export
 * @class PageGoAction
 * @implements {Action}
 */
export declare class PageGoAction implements RendererAction {
    run(action: IPageGoAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
/**
 * 浏览器刷新
 *
 * @export
 * @class PageRefreshAction
 * @implements {Action}
 */
export declare class PageRefreshAction implements RendererAction {
    run(action: IPageGoAction, renderer: ListenerContext, event: RendererEvent<any>): Promise<void>;
}
