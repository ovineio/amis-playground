import React from 'react';
import { FormControlProps, IFormStore } from 'amis-core';
import { FormBaseControlSchema, SchemaCollection } from '../../Schema';
/**
 * InputGroup
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/input-group
 */
export interface InputGroupControlSchema extends FormBaseControlSchema {
    type: 'input-group';
    /**
     * FormItem 集合
     */
    body: SchemaCollection;
    /**
     * 校验提示信息配置
     */
    validationConfig?: {
        /**
         * 错误提示的展示模式, full为整体飘红, highlight为仅错误项飘红, 默认为full
         */
        errorMode?: 'full' | 'partial';
        /**
         * 单个子元素多条校验信息的分隔符
         */
        delimiter?: string;
    };
}
export interface InputGroupProps extends FormControlProps {
    body: Array<any>;
    formStore: IFormStore;
}
interface InputGroupState {
    isFocused: boolean;
}
export declare class InputGroup extends React.Component<InputGroupProps, InputGroupState> {
    static defaultProps: {
        validationConfig: {
            errorMode: string;
            delimiter: string;
        };
    };
    toDispose: Array<Function>;
    constructor(props: InputGroupProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<InputGroupProps>): void;
    componentWillUnmount(): void;
    getValidationConfig(): {
        errorMode: string;
        delimiter: any;
    };
    validateHook(): void;
    handleFocus(): void;
    handleBlur(): void;
    renderControl(control: any, index: any, otherProps?: any): JSX.Element | null;
    validate(): string[] | "";
    render(): React.JSX.Element;
}
export default class InputGroupRenderer extends InputGroup {
}
export {};
