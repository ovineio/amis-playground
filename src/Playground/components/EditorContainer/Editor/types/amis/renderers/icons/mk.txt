export declare function mk(icon: string, { colorScheme, borderRadius, borderWidth, borderColor, supportBorderRadius, width, height, shadow }: {
    colorScheme: any;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    supportBorderRadius: boolean;
    width: number;
    height: number;
    shadow?: {
        enable: boolean;
        color: string;
        blur: number;
        direction: number;
    };
}): {
    icon: string;
    style: any;
};
