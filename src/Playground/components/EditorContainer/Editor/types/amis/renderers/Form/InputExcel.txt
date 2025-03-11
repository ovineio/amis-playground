import React from 'react';
import { FormControlProps, TestIdBuilder } from 'amis-core';
import { FormBaseControlSchema, SchemaTokenizeableString } from '../../Schema';
import type { CellRichTextValue } from 'exceljs';
/**
 * Excel 解析
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/input-excel
 */
export interface InputExcelControlSchema extends FormBaseControlSchema {
    /**
     * 指定为 Excel 解析
     */
    type: 'input-excel';
    /**
     * 是否解析所有 sheet，默认情况下只解析第一个
     */
    allSheets?: boolean;
    /**
     * 解析模式，array 是解析成二维数组，object 是将第一列作为字段名，解析为对象数组
     */
    parseMode?: 'array' | 'object';
    /**
     * 是否包含空内容，主要用于二维数组模式
     */
    includeEmpty?: boolean;
    /**
     * 纯文本模式
     */
    plainText?: boolean;
    /**
     * 解析图片
     */
    parseImage?: boolean;
    /** 图片解析结果使用 data URI 格式 */
    imageDataURI?: boolean;
    /**
     * 占位文本提示
     */
    placeholder?: string;
    /**
     * 文件解析完成后将字段同步到表单内部
     */
    autoFill?: {
        [propName: string]: SchemaTokenizeableString;
    };
    testIdBuilder?: TestIdBuilder;
}
export interface ExcelProps extends FormControlProps, Omit<InputExcelControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export interface ExcelControlState {
    filename: string;
}
export type InputExcelRendererEvent = 'change';
export type InputExcelRendererAction = 'clear';
export default class ExcelControl extends React.PureComponent<ExcelProps, ExcelControlState> {
    static defaultProps: Partial<ExcelProps>;
    state: ExcelControlState;
    ExcelJS: any;
    componentDidUpdate(prevProps: ExcelProps): void;
    syncAutoFill(filename: string): void;
    handleDrop(files: File[]): void;
    processExcelFile(excelData: ArrayBuffer | string, fileName: string): void;
    /** 读取工作表里的图片 */
    readImages(worksheet: any, workbook: any): string[];
    /** 将 buffer 转成 base64 */
    encodeBase64Bytes(bytes: Uint8Array): string;
    dispatchEvent(eventName: string, eventData?: Record<string, any>): Promise<import("amis-core").RendererEvent<any, any>>;
    /**
     * 检查当前单元格数据是否为富文本
     *
     * @reference https://github.com/exceljs/exceljs#rich-text
     */
    isRichTextValue(value: any): boolean;
    /**
     * 将富文本类型的单元格内容转化为Plain Text
     *
     * @param {CellRichTextValue} cellValue 单元格值
     * @param {Boolean} html 是否输出为html格式
     */
    richText2PlainString(cellValue: CellRichTextValue, html?: boolean): string;
    /**
     * 读取单个 sheet 的内容
     */
    readWorksheet(worksheet: any): any[];
    doAction(action: any, data: object, throwErrors: boolean): void;
    render(): React.JSX.Element;
}
export declare class ExcelControlRenderer extends ExcelControl {
}
