import { OptionsControlProps } from 'amis-core';
import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseTabsTransferRenderer } from './TabsTransfer';
import { TabsTransferControlSchema } from './TabsTransfer';
import { ActionObject } from 'amis-core';
import type { ItemRenderStates } from 'amis-ui/lib/components/Selection';
/**
 * TabsTransferPicker 穿梭器的弹框形态
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/tabs-transfer-picker
 */
export interface TabsTransferPickerControlSchema extends Omit<TabsTransferControlSchema, 'type'>, SpinnerExtraProps {
    type: 'tabs-transfer-picker';
}
export interface TabsTransferProps extends OptionsControlProps, Omit<TabsTransferPickerControlSchema, 'type' | 'options' | 'inputClassName' | 'className' | 'descriptionClassName'>, SpinnerExtraProps {
}
interface BaseTransferState {
    activeKey: number;
}
export declare class TabsTransferPickerRenderer extends BaseTabsTransferRenderer<TabsTransferProps> {
    state: BaseTransferState;
    dispatchEvent(name: string): void;
    optionItemRender(option: any, states: ItemRenderStates): React.JSX.Element;
    doAction(action: ActionObject): void;
    render(): React.JSX.Element;
}
export {};
