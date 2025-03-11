import React from 'react';
export declare function getContainer(container: any, defaultContainer: any): any;
export declare function ownerDocument(componentOrElement: any): Document;
export declare function calculatePosition(placement: any, overlayNode: any, target: HTMLElement, container: any, padding?: any, customOffset?: [number, number]): {
    positionLeft: number;
    positionTop: number;
    arrowOffsetLeft: any;
    arrowOffsetTop: any;
    activePlacement: string;
};
/**
 * 专门用来获取样式的像素值，默认返回 0
 */
export declare function getStyleNumber(element: HTMLElement, styleName: string): number;
/** 根据关键字高亮显示文本内容 */
export declare function renderTextByKeyword(rendererText: string, curKeyword: string): string | React.JSX.Element;
export declare function calculateHeight(element: HTMLElement, excludeElement: HTMLElement): number;
