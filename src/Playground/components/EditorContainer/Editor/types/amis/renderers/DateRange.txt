import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
/**
 * DateRange 展示渲染器。
 */
export interface DateRangeSchema extends BaseSchema {
    /**
     * 指定为日期展示类型
     */
    type: 'date-range';
    /**
     * 值的时间格式，参考 moment 中的格式说明。
     */
    valueFormat?: string;
    /**
     * 展示的时间格式，参考 moment 中的格式说明。
     */
    format?: string;
    /**
     * 展示的时间格式，参考 moment 中的格式说明。（新：同format）
     */
    displayFormat?: string;
    /**
     * 分割符
     */
    delimiter?: string;
    /**
     * 连接符
     */
    connector?: string;
}
export interface DateRangeProps extends RendererProps, Omit<DateRangeSchema, 'type' | 'className'> {
}
export declare class DateRangeField extends React.Component<DateRangeProps, Object> {
    refreshInterval: ReturnType<typeof setTimeout>;
    static defaultProps: Pick<DateRangeProps, 'valueFormat' | 'format' | 'connector' | 'displayFormat'>;
    render(): React.JSX.Element | null;
}
export declare class DateRangeFieldRenderer extends DateRangeField {
}
