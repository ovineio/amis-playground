export declare function scrollPosition(dom: HTMLElement): {
    top: number;
    left: number;
    width: number;
    height: number;
} | {
    top: number;
    left: number;
    height: number;
    width: number;
    x: number;
    y: number;
    bottom: number;
    right: number;
    toJSON(): any;
};
