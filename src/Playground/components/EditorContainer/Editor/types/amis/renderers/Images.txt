import React from 'react';
import { RendererProps } from 'amis-core';
import { ImageThumbProps } from './Image';
import { BaseSchema, SchemaClassName, SchemaUrlPath } from '../Schema';
import type { ImageToolbarAction } from './Image';
/**
 * 图片集展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/images
 */
export interface ImagesSchema extends BaseSchema {
    /**
     * 指定为图片集渲染器
     */
    type: 'images' | 'static-images';
    /**
     * 默认图片地址
     */
    defaultImage?: SchemaUrlPath;
    /**
     * 列表为空时显示
     */
    placeholder?: string;
    /**
     * 配置值的连接符
     * @default ,
     */
    delimiter?: string;
    /**
     * 预览图模式
     */
    thumbMode?: 'w-full' | 'h-full' | 'contain' | 'cover';
    /**
     * 预览图比率
     */
    thumbRatio?: '1:1' | '4:3' | '16:9';
    /**
     * 关联字段名，也可以直接配置 src
     */
    name?: string;
    value?: any;
    source?: string;
    options?: Array<any>;
    /**
     * 图片地址，默认读取数据中的 image 属性，如果不是请配置 ,如  ${imageUrl}
     */
    src?: string;
    /**
     * 大图地址，不设置用 src 属性，如果不是请配置，如：${imageOriginUrl}
     */
    originalSrc?: string;
    /**
     * 是否启动放大功能。
     */
    enlargeAble?: boolean;
    /**
     * 放大时是否显示图片集
     */
    enlargetWithImages?: boolean;
    /**
     * 是否显示尺寸。
     */
    showDimensions?: boolean;
    /**
     * 外层 CSS 类名
     */
    className?: SchemaClassName;
    /**
     * 列表 CSS 类名
     */
    listClassName?: SchemaClassName;
    /**
     * 放大详情图 CSS 类名
     */
    imageGallaryClassName?: SchemaClassName;
    /**
     * 是否展示图片工具栏
     */
    showToolbar?: boolean;
    /**
     * 工具栏配置
     */
    toolbarActions?: ImageToolbarAction[];
    /**
     * 展示模式，支持缩略图模式（thumb）和大图模式（full）
     */
    displayMode?: 'thumb' | 'full';
    /**
     * 当前展示图片索引
     */
    currentIndex?: number;
    /**
     * 大图模式下的缩放模式
     */
    fullThumbMode?: 'cover' | 'contain';
    /**
     * 排列方式
     * 类命名方式按照上右下左四个边命名，l=2m，m=2s，最小单位为s
     * 每条边的顺序都是从上到下，从左到右。
     * */
    sortType?: 'sm-ss-sss-m' | 'sss-ss-ms-m' | 'sms-ss-sms-m' | 'sm-ss-sss-ss' | 'ms-ss-sss-ss' | 'sss-ss-sm-ss' | 'mss-ss-ssm-ss' | 'sss-ss-mm-ss' | 'even-${number}-${number}';
    /**
     * 宽度（有sortType时生效）
     * */
    width?: string;
    /**
     * 高度（有sortType时生效）
     * */
    height?: string;
    /**
     * 鼠标悬浮时的展示状态（对应AIpage的文字6，9，10不存在）
     * */
    hoverMode?: 'hover-slide' | 'pull-top' | 'scale-center' | 'scale-top' | 'text-style-1' | 'text-style-2' | 'text-style-3' | 'text-style-4' | 'text-style-5' | 'text-style-6' | 'text-style-7';
    /**
     * 描述文字样式
     * */
    fontStyle?: {
        fontSize?: string;
        fontWeight?: string;
        fontFamily?: string;
        color?: string;
    };
    /**
     *蒙层颜色
     * */
    maskColor?: string;
}
export interface ImagesProps extends RendererProps, Omit<ImagesSchema, 'type' | 'className'> {
    delimiter: string;
    onEnlarge?: (info: ImageThumbProps & {
        list?: Array<Pick<ImageThumbProps, 'src' | 'originalSrc' | 'title' | 'caption' | 'showToolbar'>>;
    }) => void;
}
interface ImagesState {
    defaultWidth: number;
    defaultHeight: number;
    currentIndex: number;
    nextAnimation: string;
}
interface ImagesFieldProps {
    className: string;
    delimiter: string;
    defaultImage: string;
    placehoder: string;
    thumbMode: string;
    thumbRatio: string;
    displayMode: string;
    fullThumbMode: string;
}
export declare class ImagesField extends React.Component<ImagesProps, ImagesState> {
    static defaultProps: ImagesFieldProps;
    containerRef: React.RefObject<HTMLDivElement>;
    resizeObserver: ResizeObserver | null;
    constructor(props: ImagesProps);
    private isSwiping;
    private startX;
    list: Array<any>;
    gap: number;
    evenReg: RegExp;
    wrapperRef: React.RefObject<HTMLDivElement>;
    getFrameId(pos?: string): number;
    transitFramesTowards(direction: string, nextAnimation: string): Promise<void>;
    private handleSwipe;
    handleTouchStart(e: React.TouchEvent): void;
    handleTouchEnd(e: React.TouchEvent): void;
    handleMouseDown(e: React.MouseEvent): void;
    handleMouseUp(e: MouseEvent): void;
    handleEnlarge(info: ImageThumbProps): void;
    /**
     * 计算照片子元素高度
     * */
    generateHeight: (sortType: string | undefined, index: number) => number;
    /**
     * 计算照片子元素宽度
     * */
    generateWidth: (sortType: string | undefined, index: number) => number;
    /**
     * 计算网格布局
     * */
    generateEvenTranslate(sortType: string | undefined, index: number): string;
    /**
     * 计算照片子元素平移位置
     * */
    generateTranslate: (sortType: string | undefined, index: number) => any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    observeParentSize(): void;
    render(): React.JSX.Element;
}
export declare class ImagesFieldRenderer extends ImagesField {
}
export {};
