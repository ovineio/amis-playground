declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
    toRGBString(): string;
    toRGBAString(): string;
    toHexString(): string;
}
export declare class ColorScale {
    private min;
    private max;
    private alpha;
    private colorStops;
    constructor(min: number, max: number, colorStops: string[], alpha?: number);
    getColor(value: number): Color;
}
export default ColorScale;
