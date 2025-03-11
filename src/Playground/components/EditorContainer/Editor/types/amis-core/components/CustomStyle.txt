import { type InsertCustomStyle } from '../utils/style-helper';
interface CustomStyleProps {
    config: {
        wrapperCustomStyle?: any;
        componentId?: string;
    } & InsertCustomStyle;
    [propName: string]: any;
}
export declare const styleIdCount: Map<any, any>;
export default function (props: CustomStyleProps): null;
export {};
