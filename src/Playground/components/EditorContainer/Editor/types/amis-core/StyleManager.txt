interface Style {
    [id: string]: {
        [className: string]: {
            [propName: string]: string | number;
        };
    };
}
declare class StyleManager {
    styles: Style;
    styleDom: HTMLStyleElement;
    styleText: string;
    constructor();
    updateStyle(style: Style): void;
    removeStyles(id: string): void;
    updateStyleDom(): void;
}
declare const _default: StyleManager;
export default _default;
