import { Instance } from 'mobx-state-tree';
export declare const StatusStore: import("mobx-state-tree").IModelType<{
    visibleState: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    disableState: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    staticState: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
}, {
    setVisible(key: string, value?: boolean): void;
    setDisable(key: string, value?: boolean): void;
    setStatic(key: string, value?: boolean): void;
    resetAll(): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export type IStatusStore = Instance<typeof StatusStore>;
