import { OptionsControlProps } from 'amis-core';
import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseTransferRenderer, TransferControlSchema } from './Transfer';
import { Option } from 'amis-core';
import { ActionObject } from 'amis-core';
import type { ItemRenderStates } from 'amis-ui/lib/components/Selection';
/**
 * TabsTransfer
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/tabs-transfer
 */
export interface TabsTransferControlSchema extends Omit<TransferControlSchema, 'type'>, SpinnerExtraProps {
    type: 'tabs-transfer';
}
export interface TabsTransferProps extends OptionsControlProps, Omit<TabsTransferControlSchema, 'type' | 'options' | 'inputClassName' | 'className' | 'descriptionClassName'>, SpinnerExtraProps {
}
interface BaseTransferState {
    activeKey: number;
}
export declare class BaseTabsTransferRenderer<T extends OptionsControlProps = TabsTransferProps> extends BaseTransferRenderer<T> {
    state: BaseTransferState;
    onTabChange(key: number): Promise<void>;
    handleTabSearch(term: string, option: Option, cancelExecutor: Function): Promise<any[]>;
    handleChange(value: Array<Option> | Option, optionModified?: boolean): Promise<void>;
}
export declare class TabsTransferRenderer extends BaseTabsTransferRenderer<TabsTransferProps> {
    static defaultProps: {
        multiple: boolean;
    };
    optionItemRender(option: any, states: ItemRenderStates): React.JSX.Element;
    doAction(action: ActionObject, data: any, throwErrors?: boolean, args?: any): void;
    render(): React.JSX.Element;
}
export {};
