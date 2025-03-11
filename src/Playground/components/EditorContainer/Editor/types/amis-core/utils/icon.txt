/**
 * @file 图标支持的公共方法，主要是支持自动识别地址和 icon-font
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface IconCheckedSchema {
    id: string;
    name?: string;
    svg?: string;
}
interface IconCheckedSchemaNew {
    type: 'icon';
    icon: IconCheckedSchema;
}
/**
 * 废弃，不建议使用
 * 判断字符串来生成 i 或 img
 * @param icon icon 设置
 * @param className 内部用的 className
 * @param classNameProp amis 配置里设置的 className
 */
export declare const generateIcon: (cx: ClassNamesFn, icon?: string | IconCheckedSchema | React.ReactNode | IconCheckedSchemaNew, className?: string, classNameProp?: string) => React.JSX.Element | null | undefined;
export type CustomVendorFn = (icon: string, options: {
    [propName: string]: any;
}) => {
    icon: string;
    style: {
        [propName: string]: any;
    };
};
export declare function registerCustomVendor(vendor: string, fn: CustomVendorFn): void;
export declare function getCustomVendor(vendor?: string): CustomVendorFn | undefined;
export {};
