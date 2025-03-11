import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaCollection } from '../Schema';
import type { Trigger } from 'amis-ui/lib/components/TooltipWrapper';
export interface TooltipWrapperSchema extends BaseSchema {
    /**
     * 文字提示容器
     */
    type: 'tooltip-wrapper';
    /**
     * 文字提示标题
     */
    title?: string;
    /**
     * 文字提示内容，兼容 tooltip，但建议通过 content 来实现提示内容
     */
    content?: string;
    /**
     *  @deprecated 文字提示内容
     */
    tooltip?: string;
    /**
     * 文字提示浮层出现位置，默认为top
     */
    placement?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * 浮层位置相对偏移量
     */
    offset?: [number, number];
    /**
     * 是否展示浮层指向箭头
     */
    showArrow?: boolean;
    /**
     * 是否禁用提示
     */
    disabled?: boolean;
    /**
     * 浮层触发方式，默认为hover
     */
    trigger?: Trigger | Array<Trigger>;
    /**
     * 浮层延迟显示时间, 单位 ms
     */
    mouseEnterDelay?: number;
    /**
     * 浮层延迟隐藏时间, 单位 ms
     */
    mouseLeaveDelay?: number;
    /**
     * 是否点击非内容区域关闭提示，默认为true
     */
    rootClose?: boolean;
    /**
     * 内容区域
     */
    body?: SchemaCollection;
    /**
     * 内容区包裹标签
     */
    wrapperComponent: string;
    /**
     * 内容区是否内联显示，默认为false
     */
    inline?: boolean;
    /**
     * 主题样式， 默认为light
     */
    tooltipTheme?: 'light' | 'dark';
    /**
     * 内容区自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 是否可以移入浮层中, 默认true
     */
    enterable?: boolean;
    /**
     * 自定义提示浮层样式
     */
    tooltipStyle?: {
        [propName: string]: any;
    };
    /**
     * 内容区CSS类名
     */
    className?: string;
    /**
     * 箭头CSS类名
     */
    tooltipArrowClassName?: string;
    /**
     * 文字提示浮层CSS类名
     */
    tooltipClassName?: string;
}
export interface TooltipWrapperProps extends RendererProps {
    /**
     * 文字提示标题
     */
    title?: string;
    /**
     * 文字提示
     */
    content?: string;
    tooltip?: string;
    /**
     * 文字提示位置
     */
    placement: 'top' | 'right' | 'bottom' | 'left';
    inline?: boolean;
    trigger: Trigger | Array<Trigger>;
    rootClose?: boolean;
    showArrow?: boolean;
    offset?: [number, number];
    disabled?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    container?: HTMLElement | (() => HTMLElement);
    style?: React.CSSProperties;
    tooltipStyle?: React.CSSProperties;
    wrapperComponent?: string;
    tooltipTheme?: 'light' | 'dark';
}
interface TooltipWrapperState {
}
export default class TooltipWrapper extends React.Component<TooltipWrapperProps, TooltipWrapperState> {
    static defaultProps: Pick<TooltipWrapperProps, 'placement' | 'trigger' | 'rootClose' | 'mouseEnterDelay' | 'mouseLeaveDelay' | 'inline' | 'wrap' | 'tooltipTheme'>;
    constructor(props: TooltipWrapperProps);
    renderBody(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class TooltipWrapperRenderer extends TooltipWrapper {
}
export {};
