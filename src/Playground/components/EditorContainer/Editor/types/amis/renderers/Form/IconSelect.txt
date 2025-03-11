import React from 'react';
import { FormControlProps } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { FormBaseControlSchema } from '../../Schema';
import * as IconSelectStore from './IconSelectStore';
export interface IconSelectControlSchema extends FormBaseControlSchema {
    type: 'icon-select';
    placeholder?: string;
    disabled?: boolean;
    noDataTip?: string;
    clearable?: boolean;
    returnSvg?: boolean;
    noSize?: boolean;
}
export interface IconSelectProps extends FormControlProps, SpinnerExtraProps {
    placeholder?: string;
    disabled?: boolean;
    noDataTip?: string;
    returnSvg?: boolean;
    noSize?: boolean;
}
export interface IconChecked {
    id: string;
    name?: string;
    svg?: string;
}
export interface IconSelectState {
    showModal: boolean;
    tmpCheckIconId: IconChecked | null;
    searchValue: string;
    activeTypeIndex: number;
    isRefreshLoading?: boolean;
}
/**
 * 新图标选择器
 */
export default class IconSelectControl extends React.PureComponent<IconSelectProps, IconSelectState> {
    input?: HTMLInputElement;
    static defaultProps: Pick<IconSelectProps, 'noDataTip' | 'clearable'>;
    state: IconSelectState;
    constructor(props: IconSelectProps);
    getSvgName(value: IconChecked | string): string;
    getSvgId(value: IconChecked | string): string;
    getValueBySvg(svg: string | IconSelectStore.SvgIcon): IconSelectStore.SvgIcon | null;
    handleClick(): void;
    handleClear(e: React.MouseEvent): void;
    renderInputArea(): React.JSX.Element;
    handleIconTypeClick(item: any, index: number): void;
    renderIconTypes(): React.JSX.Element;
    handleConfirm(): void;
    handleLocalUpload(icon: string): Promise<void>;
    handleClickIconInModal(icon: IconChecked): void;
    renderIconList(icons: IconSelectStore.SvgIcon[]): React.JSX.Element;
    handleSearchValueChange(e: string): void;
    handleRefreshIconList(): Promise<void>;
    renderModalContent(): React.JSX.Element;
    getIconsByType(): IconSelectStore.SvgIcon[];
    toggleModel(isShow?: boolean): void;
    render(): React.JSX.Element;
}
export declare class IconSelectControlRenderer extends IconSelectControl {
}
