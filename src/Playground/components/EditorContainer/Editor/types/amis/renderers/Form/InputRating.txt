import React from 'react';
import { FormControlProps } from 'amis-core';
import { ActionObject } from 'amis-core';
import type { textPositionType } from 'amis-ui/lib/components/Rating';
import { FormBaseControlSchema } from '../../Schema';
/**
 * Rating
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/rating
 */
export interface RatingControlSchema extends FormBaseControlSchema {
    type: 'input-rating';
    /**
     * 分数
     */
    count?: number;
    /**
     * 允许半颗星
     */
    half?: boolean;
    /**
     * 是否允许再次点击后清除
     */
    allowClear?: boolean;
    /**
     * 是否只读
     */
    readonly?: boolean;
    /**
     * 星星被选中的颜色
     */
    colors?: string | {
        [propName: string]: string;
    };
    /**
     * 未被选中的星星的颜色
     */
    inactiveColor?: string;
    /**
     * 星星被选中时的提示文字
     */
    texts?: {
        [propName: string]: string;
    };
    /**
     * 文字的位置
     */
    textPosition?: textPositionType;
    /**
     * 自定义字符
     */
    char?: string;
    /**
     * 自定义字符类名
     */
    charClassName?: string;
    /**
     * 自定义文字类名
     */
    textClassName?: string;
}
export interface RatingProps extends FormControlProps {
    value: number;
    count: number;
    half: boolean;
    readOnly: boolean;
}
export default class RatingControl extends React.Component<RatingProps, any> {
    static defaultProps: Partial<RatingProps>;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    handleChange(value: any): Promise<void>;
    renderStatic(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class RatingControlRenderer extends RatingControl {
}
