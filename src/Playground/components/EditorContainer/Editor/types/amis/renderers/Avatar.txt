/**
 * @file 用来展示用户头像
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BadgeObject } from 'amis-ui';
import { BaseSchema, SchemaClassName } from '../Schema';
export interface AvatarSchema extends BaseSchema {
    type: 'avatar';
    /**
     * 类名
     */
    className?: SchemaClassName;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 角标
     */
    badge?: BadgeObject;
    /**
     * 图片地址
     */
    src?: string;
    /**
     * 默认头像
     */
    defaultAvatar?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 图片相对于容器的缩放方式
     */
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    /**
     * 形状
     */
    shape?: 'circle' | 'square' | 'rounded';
    /**
     * 大小
     */
    size?: number | 'small' | 'default' | 'large';
    /**
     * 文本
     */
    text?: string;
    /**
     * 字符类型距离左右两侧边界单位像素
     */
    gap?: number;
    /**
     * 图片无法显示时的替换文字地址
     */
    alt?: string;
    /**
     * 图片是否允许拖动
     */
    draggable?: boolean;
    /**
     * 图片CORS属性
     */
    crossOrigin: 'anonymous' | 'use-credentials' | '';
    /**
     * 图片加载失败的是否默认处理，字符串函数
     */
    onError?: string;
}
export interface AvatarProps extends RendererProps, Omit<AvatarSchema, 'type' | 'className'> {
}
export declare class AvatarField extends React.Component<AvatarProps> {
    handleClick(e: React.MouseEvent<any>): void;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    render(): React.JSX.Element;
}
export declare class AvatarFieldRenderer extends AvatarField {
}
