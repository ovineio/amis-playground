/**
 * @file Password
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
/**
 * Password
 */
export interface PasswordSchema extends BaseSchema {
    type: 'password';
    /**
    * 打码模式的文本
    */
    mosaicText?: string;
}
export interface PasswordProps extends RendererProps, Omit<PasswordSchema, 'type' | 'className'> {
}
export interface PasswordState {
    visible: boolean;
}
export declare class PasswordField extends React.Component<PasswordProps, PasswordState> {
    state: {
        visible: boolean;
    };
    toggleVisible(): void;
    render(): React.JSX.Element;
}
export declare class PasswordFieldRenderer extends PasswordField {
}
