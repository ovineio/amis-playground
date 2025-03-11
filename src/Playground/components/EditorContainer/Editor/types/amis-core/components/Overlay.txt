/**
 * @file Overlay
 * @description
 * @author fex
 */
import React from 'react';
import { EnvContext } from '../env';
export declare const SubPopoverDisplayedID = "data-sub-popover-displayed";
interface OverlayProps {
    placement?: string;
    show?: boolean;
    transition?: React.ElementType;
    containerPadding?: number;
    children?: any;
    shouldUpdatePosition?: boolean;
    rootClose?: boolean;
    onHide?(props: any, ...args: any[]): any;
    container?: HTMLElement | React.ReactNode | (() => HTMLElement | React.ReactNode | null | undefined);
    containerSelector?: string;
    target?: React.ReactNode | HTMLElement | Function;
    watchTargetSizeChange?: boolean;
    offset?: [number, number];
    onEnter?(node: HTMLElement): any;
    onEntering?(node: HTMLElement): any;
    onEntered?(node: HTMLElement): any;
    onExit?(node: HTMLElement): any;
    onExiting?(node: HTMLElement): any;
    onExited?(node: HTMLElement): any;
}
interface OverlayState {
    exited: boolean;
}
export default class Overlay extends React.Component<OverlayProps, OverlayState> {
    static defaultProps: {
        placement: string;
    };
    static contextType: React.Context<void | import("../env").RendererEnv>;
    context: React.ContextType<typeof EnvContext>;
    constructor(props: OverlayProps);
    position: any;
    positionRef: (position: any) => void;
    updatePosition(): void;
    componentDidUpdate(prevProps: OverlayProps, prevState: OverlayState): void;
    onHiddenListener(node: HTMLElement): void;
    getContainerSelector(): Element | null;
    render(): React.JSX.Element | null;
}
export {};
