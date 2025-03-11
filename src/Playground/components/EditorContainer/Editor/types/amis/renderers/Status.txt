import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
export interface StatusSource {
    [propName: string]: {
        icon?: string;
        label?: string;
        color?: string;
        className?: string;
    };
}
/**
 * 状态展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/status
 */
export interface StatusSchema extends BaseSchema {
    /**
     * 指定为状态展示控件
     */
    type: 'status';
    /**
     * 占位符
     * @default -
     */
    placeholder?: string;
    /**
     * 状态图标映射关系
     * @deprecated 已废弃，2.8.0 废弃，兼容中
     * @default {
     *    0: 'svg-fail',
     *    1: 'svg-success',
     *    success: 'svg-success',
     *    pending: 'rolling',
     *    fail: 'svg-fail',
     *    queue: 'svg-warning',
     *    schedule: 'svg-schedule'
     *  }
     */
    map?: {
        [propName: string]: string;
    };
    /**
     * 文字映射关系
     * @deprecated 已废弃，2.8.0 废弃，兼容中
     * @default {
     *     success: '成功',
     *     pending: '运行中',
     *     fail: '失败',
     *     queue: '排队中',
     *     schedule: '调度中'
     * }
     */
    labelMap?: {
        [propName: string]: string;
    };
    /**
     * 新版配置映射源的字段
     * 可以兼容新版icon并且配置颜色
     * 2.8.0 新增
     */
    source?: StatusSource;
}
export interface StatusProps extends RendererProps, Omit<StatusSchema, 'className'> {
}
export declare class StatusField extends React.Component<StatusProps, object> {
    static defaultProps: Partial<StatusProps>;
    render(): React.JSX.Element;
}
export declare class StatusFieldRenderer extends StatusField {
}
