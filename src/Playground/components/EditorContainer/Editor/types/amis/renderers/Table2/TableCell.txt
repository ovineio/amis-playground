import { TableCell } from '../Table';
export declare class CellFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    readonly propsNeedRemove: string[];
}
