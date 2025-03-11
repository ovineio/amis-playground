/**
 * 删减自 https://github.com/react-bootstrap/dom-helpers/blob/master/src/position.ts
 */
/**
 * Returns the relative position of a given element.
 *
 * @param node the element
 * @param offsetParent the offset parent
 */
export declare function position(node: HTMLElement, offsetParent?: HTMLElement): {
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
export default position;
