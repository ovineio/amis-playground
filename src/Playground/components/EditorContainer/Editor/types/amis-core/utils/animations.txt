export interface AnimationsProps {
    enter?: {
        type: string;
        duration?: number;
        delay?: number;
        repeat?: boolean;
        inView?: boolean;
    };
    attention?: {
        type: string;
        duration?: number;
        repeat?: string;
        delay?: number;
    };
    hover?: {
        type: string;
        duration?: number;
        delay?: number;
        repeat?: string;
    };
    exit?: {
        type: string;
        duration?: number;
        delay?: number;
        repeat?: boolean;
        outView?: boolean;
    };
}
export declare function createAnimationStyle(id: string, animationsConfig: AnimationsProps): void;
