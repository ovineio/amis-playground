import React from 'react';
import { BaseSchema } from '../Schema';
import { FormControlProps } from 'amis-core';
/**
 * 自定义组件
 */
export interface CustomSchema extends BaseSchema {
    /**
     * 实现自定义功能的渲染器，主要给 JS SDK 和可视化编辑器里使用。
     *
     * 文档：https://baidu.gitee.io/amis/components/custom
     */
    type: 'custom';
    onMount?: Function | string;
    onUpdate?: Function | string;
    onUnmount?: Function | string;
    inline?: boolean;
    id?: string;
    html?: string;
}
export interface CustomProps extends FormControlProps, CustomSchema {
    className?: string;
    value?: any;
    wrapperComponent?: any;
    inline?: boolean;
}
export declare class Custom extends React.Component<CustomProps, object> {
    static defaultProps: Partial<CustomProps>;
    dom: any;
    onUpdate: Function;
    onMount: Function;
    onUnmount: Function;
    childElemArr: HTMLElement[];
    constructor(props: CustomProps);
    initOnMount(props: CustomProps): void;
    initOnUpdate(props: CustomProps): void;
    initOnUnmount(props: CustomProps): void;
    componentDidUpdate(prevProps: CustomProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    recordChildElem(insertElem: HTMLElement): void;
    unmountChildElem(): void;
    /**
     * 渲染子元素
     * 备注：现有custom组件通过props.render生成的子元素是react虚拟dom对象，需要使用ReactDOM.render渲染，不能直接插入到当前dom中。
     **/
    renderChild(schemaPosition: string, childSchema: any, insertElemDom: HTMLElement | string): void | null;
    render(): React.JSX.Element;
}
export declare class CustomRenderer extends Custom {
}
