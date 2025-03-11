import React from 'react';
import { FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * UUID 功能性组件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/uuid
 */
export interface UUIDControlSchema extends FormBaseControlSchema {
    type: 'uuid';
    /**
     * 长度，默认 uuid 的长度是 36，如果不需要那么长，可以设置这个来缩短
     */
    length?: number;
}
export default class UUIDControl extends React.Component<FormControlProps, any> {
    constructor(props: FormControlProps);
    componentDidUpdate(props: FormControlProps): void;
    setValue(): void;
    render(): null;
}
export declare class UUIDControlRenderer extends UUIDControl {
}
