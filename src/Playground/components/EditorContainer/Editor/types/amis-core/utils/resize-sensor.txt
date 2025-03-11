/**
 * @file resize-sensor.js.
 * @author fex
 */
type EventType = 'both' | 'width' | 'height';
export declare function getComputedStyle(element: HTMLElement, prop: string): any;
export declare function resizeSensor(element: HTMLElement, callback: () => void, once?: boolean, type?: EventType): () => void;
export {};
