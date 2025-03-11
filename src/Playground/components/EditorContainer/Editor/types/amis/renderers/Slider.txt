import { RendererProps } from 'amis-core';
import React from 'react';
import { BaseSchema } from '../Schema';
export interface SliderSchema extends BaseSchema {
    type: 'slider';
    body: BaseSchema;
    left?: BaseSchema;
    right?: BaseSchema;
    bodyWidth?: string;
}
interface SliderProps extends RendererProps, Omit<SliderSchema, 'className'> {
}
export declare class SliderRenderer extends React.Component<SliderProps> {
    state: {
        leftShow: boolean;
        rightShow: boolean;
    };
    handleLeftShow(): void;
    handleRightShow(): void;
    handleLeftHide(): void;
    handleRightHide(): void;
    showLeft(): void;
    hideLeft(): void;
    showRight(): void;
    hideRight(): void;
    render(): React.JSX.Element;
}
export {};
