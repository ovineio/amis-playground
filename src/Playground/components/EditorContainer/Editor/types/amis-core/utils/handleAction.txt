/**
 * 后续好多地方可能都要支持 action，所以提取公共功能
 */
/// <reference types="react" />
import { RendererProps } from '../factory';
export declare function handleAction(e: React.MouseEvent<any>, action: any, props: RendererProps, data?: any): void;
export default handleAction;
