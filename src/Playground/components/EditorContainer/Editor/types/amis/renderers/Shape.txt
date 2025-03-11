/**
 * @file Shape.tsx 图形组件
 *
 * @author allenve(yupeng12@baidu.com)
 * @created: 2024/12/12
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { IShapeType } from 'amis-ui';
import { BaseSchema } from '../Schema';
export interface IShapeSchema extends BaseSchema {
    type: 'shape';
    /**
     * 图形类型
     */
    shapeType: IShapeType;
    /**
     * 图形宽度
     */
    width?: number;
    /**
     * 图形宽度
     */
    height?: number;
    /**
     * 圆角大小 1~10
     */
    radius: number;
    /**
     * 颜色
     */
    color?: string;
    /**
     * 自定义路径，仅 shapeType 为 custom 时有效
     */
    paths?: string[];
    /**
     * 边框颜色
     */
    stroke?: string;
    /**
     * 边框宽度
     */
    strokeWidth?: number;
    /**
     * 边框类型
     */
    strokeType?: 'line' | 'dash' | 'dot';
}
interface IShapeRenderProps extends RendererProps, Omit<IShapeSchema, 'className'> {
}
export declare class ShapeRenderer extends React.Component<IShapeRenderProps> {
    handleClick(): void;
    render(): React.JSX.Element;
}
export {};
