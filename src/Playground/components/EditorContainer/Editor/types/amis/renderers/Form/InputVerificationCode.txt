import React from 'react';
import { FormControlProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
export interface VerificationCodeSchema extends FormBaseControlSchema {
    value?: string;
    length?: number;
    /**
     * is密码模式
     */
    masked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * 分隔符
     */
    separator?: string;
}
export interface VerificationCodeProps extends FormControlProps {
}
export default class VerificationCodeControl extends React.Component<VerificationCodeProps> {
    /**
     * actions finish
     * @date 2024-06-04 星期二
     * @function
     * @param {}
     * @return {}
     */
    onFinish(value: string): Promise<void>;
    /**
     * actions change
     * @date 2024-06-04 星期二
     * @function
     * @param {}
     * @return {}
     */
    onChange(value: string): Promise<void>;
    render(): React.JSX.Element;
}
export declare class VerificationCodeControlRenderer extends VerificationCodeControl {
}
