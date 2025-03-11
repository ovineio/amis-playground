import React from 'react';
import { ThemeProps } from 'amis-core';
import { FormControlProps } from 'amis-core';
import { ActionObject } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * Location 选点组件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/location
 */
export interface LocationControlSchema extends FormBaseControlSchema {
    type: 'location-picker';
    /**
     * 选择地图类型
     */
    vendor?: 'baidu' | 'gaode' | 'tenxun';
    /**
     * 有的地图需要设置 ak 信息
     */
    ak?: string;
    /**
     * 是否自动选中当前地理位置
     */
    autoSelectCurrentLoc?: boolean;
    /**
     * 是否限制只能选中当前地理位置
     * 备注：可用于充当定位组件，只允许选择当前位置
     */
    onlySelectCurrentLoc?: boolean;
    /**
     * 开启只读模式后的占位提示，默认为“点击获取位置信息”
     * 备注：区分下现有的placeholder（“请选择位置”）
     */
    getLocationPlaceholder?: string;
    /**
     * 是否隐藏地图控制组件，默认为false
     */
    hideViewControl?: boolean;
}
export interface LocationControlProps extends FormControlProps, Omit<ThemeProps, 'className'>, Omit<LocationControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
    value: any;
    onChange: (value: any) => void;
    vendor: 'baidu' | 'gaode' | 'tenxun';
    ak: string;
    coordinatesType: 'bd09' | 'gcj02';
}
export declare class LocationControl extends React.Component<LocationControlProps> {
    static defaultProps: {
        vendor: string;
        coordinatesType: string;
    };
    domRef: React.RefObject<HTMLDivElement>;
    state: {
        isOpened: boolean;
    };
    close(): void;
    open(): void;
    handleClick(): void;
    handleChange(value: any): Promise<void>;
    getParent(): HTMLElement | null | undefined;
    getTarget(): HTMLDivElement | null;
    doAction(action: ActionObject, data: object, throwErrors: boolean): any;
    renderStatic(displayValue?: string): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class LocationRenderer extends LocationControl {
}
