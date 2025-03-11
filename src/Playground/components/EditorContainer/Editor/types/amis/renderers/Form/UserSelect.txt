import React from 'react';
import { OptionsControlProps, Option } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { PlainObject } from 'amis-core';
import { FormOptionsSchema } from '../../Schema';
/**
 * UserSelect 移动端人员选择。
 */
export interface UserSelectControlSchema extends FormOptionsSchema {
    type: 'users-select';
}
export interface UserSelectProps extends OptionsControlProps, SpinnerExtraProps {
    /**
     * 部门可选
     */
    isDep?: boolean;
    /**
     * 人员可选
     */
    isRef?: boolean;
    /**
     *
     */
    showNav?: boolean;
    /**
     * 导航头标题
     */
    navTitle?: string;
    /**
     * 选项卡模式
     */
    tabMode?: boolean;
    tabOptions?: Array<any>;
    /**
     * 搜索字段
     */
    searchTerm?: string;
    /**
     * 搜索携带的额外参数
     */
    searchParam?: PlainObject;
}
export default class UserSelectControl extends React.Component<UserSelectProps, any> {
    static defaultProps: Partial<UserSelectProps>;
    input?: HTMLInputElement;
    unHook: Function;
    lazyloadRemote: Function;
    constructor(props: UserSelectProps);
    componentWillUnmount(): void;
    onSearch(input: string, cancelExecutor: Function, param?: PlainObject): Promise<any>;
    deferLoad(data?: Object, isRef?: boolean, param?: PlainObject): Promise<any>;
    changeValue(value: Option | Array<Option> | string | void): Promise<void>;
    renderStatic(): string | React.JSX.Element[];
    render(): React.JSX.Element;
}
export declare class UserSelectControlRenderer extends UserSelectControl {
}
