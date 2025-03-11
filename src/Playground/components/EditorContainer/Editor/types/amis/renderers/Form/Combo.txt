/// <reference types="lodash" />
import React from 'react';
import { FormControlProps, FormHorizontal } from 'amis-core';
import { ActionObject } from 'amis-core';
import { IComboStore } from 'amis-core';
import Sortable from 'sortablejs';
import { FormBaseControlSchema, SchemaApi, SchemaClassName, SchemaObject, SchemaTpl } from '../../Schema';
import { ListenerAction } from 'amis-core';
import type { SchemaTokenizeableString } from '../../Schema';
import type { TestIdBuilder } from 'amis-core';
export type ComboCondition = {
    test: string;
    items: Array<ComboSubControl>;
    label: string;
    scaffold?: any;
    mode?: string;
};
export type ComboSubControl = SchemaObject & {
    /**
     * 是否唯一, 只有在 combo 里面才有用
     */
    unique?: boolean;
    /**
     * 列类名，可以用来修改这类宽度。
     */
    columnClassName?: SchemaClassName;
    testid?: string;
};
/**
 * Combo 组合输入框类型
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/combo
 */
export interface ComboControlSchema extends FormBaseControlSchema {
    /**
     * 指定为组合输入框类型
     */
    type: 'combo';
    /**
     * 单组表单项初始值。默认为 `{}`
     *
     * @default {}
     */
    scaffold?: any;
    /**
     * 是否含有边框
     */
    noBorder?: boolean;
    /**
     * 确认删除时的提示
     */
    deleteConfirmText?: string;
    /**
     * 删除时调用的api
     */
    deleteApi?: SchemaApi;
    /**
     * 是否可切换条件，配合`conditions`使用
     */
    typeSwitchable?: boolean;
    /**
     * 符合某类条件后才渲染的schema
     */
    conditions?: Array<ComboCondition>;
    /**
     * 内部单组表单项的类名
     */
    formClassName?: SchemaClassName;
    /**
     * 新增按钮CSS类名
     */
    addButtonClassName?: SchemaClassName;
    /**
     * 新增按钮文字
     * @default 新增
     */
    addButtonText?: string;
    /**
     * 是否可新增
     */
    addable?: boolean;
    /**
     * Add at top
     */
    addattop?: boolean;
    /**
     * 数组输入框的子项
     */
    items?: Array<ComboSubControl>;
    /**
     * 是否可拖拽排序
     */
    draggable?: boolean;
    /**
     * 可拖拽排序的提示信息。
     *
     * @default 可拖拽排序
     */
    draggableTip?: string;
    /**
     * 是否将结果扁平化(去掉name),只有当controls的length为1且multiple为true的时候才有效
     */
    flat?: boolean;
    /**
     * 当扁平化开启并且joinValues为true时，用什么分隔符
     *
     * @deprecated
     */
    delimiter?: string;
    /**
     * 当扁平化开启的时候，是否用分隔符的形式发送给后端，否则采用array的方式
     * @deprecated
     */
    joinValues?: boolean;
    /**
     * 限制最大个数
     */
    maxLength?: number | SchemaTokenizeableString;
    /**
     * 限制最小个数
     */
    minLength?: number | SchemaTokenizeableString;
    /**
     * 是否多行模式，默认一行展示完
     */
    multiLine?: boolean;
    /**
     * 是否可多选
     */
    multiple?: boolean;
    /**
     * 是否可删除
     */
    removable?: boolean;
    /**
     * 子表单的模式。
     */
    subFormMode?: 'normal' | 'horizontal' | 'inline';
    /**
     * 如果是水平排版，这个属性可以细化水平排版的左右宽度占比。
     */
    subFormHorizontal?: FormHorizontal;
    /**
     * 没有成员时显示。
     * @default empty
     */
    placeholder?: string;
    /**
     * 是否可以访问父级数据，正常 combo 已经关联到数组成员，是不能访问父级数据的。
     */
    canAccessSuperData?: boolean;
    /**
     * 采用 Tabs 展示方式？
     */
    tabsMode?: boolean;
    /**
     * Tabs 的展示模式。
     */
    tabsStyle?: '' | 'line' | 'card' | 'radio';
    /**
     * 选项卡标题的生成模板。
     */
    tabsLabelTpl?: SchemaTpl;
    /**
     * 数据比较多，比较卡时，可以试试开启。
     */
    lazyLoad?: boolean;
    /**
     * 严格模式，为了性能默认不开的。
     */
    strictMode?: boolean;
    /**
     * 配置同步字段。只有 `strictMode` 为 `false` 时有效。
     * 如果 Combo 层级比较深，底层的获取外层的数据可能不同步。
     * 但是给 combo 配置这个属性就能同步下来。输入格式：`["os"]`
     */
    syncFields?: string[];
    /**
     * 允许为空，如果子表单项里面配置验证器，且又是单条模式。可以允许用户选择清空（不填）。
     */
    nullable?: boolean;
    /**
     * 提示信息
     */
    messages?: {
        /**
         * 验证错误提示
         */
        validateFailed?: string;
        /**
         * 最小值验证错误提示
         */
        minLengthValidateFailed?: string;
        /**
         * 最大值验证错误提示
         */
        maxLengthValidateFailed?: string;
    };
    updatePristineAfterStoreDataReInit?: boolean;
    testIdBuilder?: TestIdBuilder;
}
export type ComboRendererEvent = 'add' | 'delete' | 'tabsChange' | 'dragEnd';
export interface ComboProps extends FormControlProps, Omit<ComboControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
    store: IComboStore;
    changeImmediately?: boolean;
}
export default class ComboControl extends React.Component<ComboProps> {
    static defaultProps: Pick<ComboProps, 'minLength' | 'maxLength' | 'multiple' | 'multiLine' | 'addButtonClassName' | 'formClassName' | 'subFormMode' | 'draggableTip' | 'addButtonText' | 'canAccessSuperData' | 'addIcon' | 'dragIcon' | 'deleteIcon' | 'tabsMode' | 'tabsStyle' | 'placeholder' | 'itemClassName' | 'itemsWrapperClassName'>;
    static propsList: Array<string>;
    subFormDefaultValues: Array<{
        index: number;
        values: any;
        setted: boolean;
    }>;
    keys: Array<string>;
    dragTip?: HTMLElement;
    sortable?: Sortable;
    defaultValue?: any;
    toDispose: Array<Function>;
    id: string;
    constructor(props: ComboProps);
    componentDidUpdate(prevProps: ComboProps): void;
    componentWillUnmount(): void;
    /** 解析props中的变量，目前支持'minLength' | 'maxLength' */
    resolveVariableProps(props: ComboProps, key: 'minLength' | 'maxLength'): number;
    doAction(action: ListenerAction, data: any, throwErrors?: boolean, args?: any): void;
    addItemValue(itemValue: any): void;
    getValueAsArray(props?: Readonly<ComboProps>): any;
    addItemWith(condition: ComboCondition): void;
    addItem(): Promise<void>;
    deleteItem(key: number): Promise<void>;
    handleChange(values: any, diff: any, { index }: any): void;
    handleRadioChange(ctx: any, { index, name, trueValue, falseValue }: any): false | undefined;
    handleSingleFormChange(values: object): void;
    handleSubFormValid(valid: boolean, { index }: any): void;
    handleFormInit(values: any, { index }: any): void;
    handleSingleFormInit(values: any): void;
    handleAction(e: React.UIEvent<any> | undefined, action: ActionObject): any;
    validate(): any;
    flush(): Promise<void>;
    dragTipRef(ref: any): void;
    initDragging(): void;
    destroyDragging(): void;
    refsMap: {
        [propName: string]: any;
    };
    makeFormRef: ((index: number) => (ref: any) => void) & import("lodash").MemoizedFunction;
    get subForms(): any[];
    formRef(ref: any, index?: number): void;
    memoizedFormatValue: ((strictMode: boolean, syncFields: Array<string> | void, value: any, index: number, data: any) => object) & import("lodash").MemoizedFunction;
    formatValue(value: any, index?: number): object;
    pickCondition(value: any): ComboCondition | null;
    handleComboTypeChange(index: number, selection: any): void;
    handleTabSelect(key: number): Promise<void>;
    setNull(e: React.MouseEvent): void;
    renderPlaceholder(): React.JSX.Element;
    renderTabsMode(): React.JSX.Element;
    renderDelBtn(value: any, index: number): React.JSX.Element | null;
    renderAddBtn(): React.JSX.Element | null;
    renderMultipe(): React.JSX.Element;
    renderSingle(): React.JSX.Element;
    renderItems(finnalControls: ComboSubControl[], data: object, index?: number, originData?: any): React.JSX.Element;
    renderStatic(displayValue?: string): JSX.Element;
    render(): React.JSX.Element | null;
}
export declare class ComboControlRenderer extends ComboControl {
    setData(value: any, replace?: boolean, index?: number | string, condition?: any): Promise<void>;
}
export declare class KVControlRenderer extends ComboControl {
}
export declare class KVSControlRenderer extends ComboControl {
}
