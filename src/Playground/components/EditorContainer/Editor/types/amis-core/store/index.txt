import { Instance } from 'mobx-state-tree';
import { iRendererStore } from './iRenderer';
import type { IIRendererStore } from './iRenderer';
import { ServiceStore } from './service';
import type { IServiceStore } from './service';
import { ComboStore } from './combo';
import type { IComboStore } from './combo';
import { FormStore } from './form';
import type { IFormStore } from './form';
import { CRUDStore } from './crud';
import type { ICRUDStore } from './crud';
import { TableStore } from './table';
import type { IColumn, IRow, ITableStore } from './table';
import { TableStore2 } from './table2';
import type { IColumn2, IRow2, ITableStore2 } from './table2';
import { ListStore } from './list';
import type { IListStore } from './list';
import { ModalStore } from './modal';
import type { IModalStore } from './modal';
import { TranslateFn } from '../locale';
import { StoreNode } from './node';
import type { IStoreNode } from './node';
import { FormItemStore } from './formItem';
import type { IFormItemStore } from './formItem';
import { PaginationStore } from './pagination';
import type { IPaginationStore } from './pagination';
import { AppStore } from './app';
import type { IAppStore } from './app';
export declare const RendererStore: import("mobx-state-tree").IModelType<{
    storeType: import("mobx-state-tree").IType<string | undefined, string, string>;
}, {
    readonly fetcher: any;
    readonly notify: any;
    readonly isCancel: (value: any) => boolean;
    readonly __: TranslateFn<any>;
    getStoreById(id: string): {
        id: string;
        path: string;
        storeType: string;
        disposed: boolean;
        parentId: string;
        childrenIds: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").ISimpleType<string>> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").ISimpleType<string>>, [undefined]>>;
    } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
        readonly parentStore: any;
        readonly __: any;
        readonly hasChildren: boolean;
        readonly children: any[];
    } & {
        onChildStoreDispose(child: any): void;
        syncProps(props: any, prevProps: any, list?: string[]): void;
        dispose: (callback?: (() => void) | undefined) => void;
        addChildId: (id: string) => void;
        removeChildId: (id: string) => void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        path: import("mobx-state-tree").IType<string | undefined, string, string>;
        storeType: import("mobx-state-tree").ISimpleType<string>;
        disposed: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
        childrenIds: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").ISimpleType<string>>, [undefined]>;
    }, {
        readonly parentStore: any;
        readonly __: any;
        readonly hasChildren: boolean;
        readonly children: any[];
    } & {
        onChildStoreDispose(child: any): void;
        syncProps(props: any, prevProps: any, list?: string[]): void;
        dispose: (callback?: (() => void) | undefined) => void;
        addChildId: (id: string) => void;
        removeChildId: (id: string) => void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    readonly stores: {
        [propName: string]: {
            id: string;
            path: string;
            storeType: string;
            disposed: boolean;
            parentId: string;
            childrenIds: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").ISimpleType<string>> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").ISimpleType<string>>, [undefined]>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            readonly parentStore: any;
            readonly __: any;
            readonly hasChildren: boolean;
            readonly children: any[];
        } & {
            onChildStoreDispose(child: any): void;
            syncProps(props: any, prevProps: any, list?: string[]): void;
            dispose: (callback?: (() => void) | undefined) => void;
            addChildId: (id: string) => void;
            removeChildId: (id: string) => void;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            id: import("mobx-state-tree").ISimpleType<string>;
            path: import("mobx-state-tree").IType<string | undefined, string, string>;
            storeType: import("mobx-state-tree").ISimpleType<string>;
            disposed: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
            childrenIds: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").ISimpleType<string>>, [undefined]>;
        }, {
            readonly parentStore: any;
            readonly __: any;
            readonly hasChildren: boolean;
            readonly children: any[];
        } & {
            onChildStoreDispose(child: any): void;
            syncProps(props: any, prevProps: any, list?: string[]): void;
            dispose: (callback?: (() => void) | undefined) => void;
            addChildId: (id: string) => void;
            removeChildId: (id: string) => void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    };
} & {
    addStore(store: {
        [propName: string]: any;
        storeType: string;
        id: string;
        path: string;
        parentId?: string | undefined;
    }): IStoreNode;
    removeStore(store: IStoreNode): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export type IRendererStore = Instance<typeof RendererStore>;
export { iRendererStore, IIRendererStore };
export declare const RegisterStore: (store: any) => void;
export declare const registerStore: (store: any) => void;
export { ServiceStore, IServiceStore, FormStore, IFormStore, ComboStore, IComboStore, CRUDStore, ICRUDStore, TableStore, IColumn, IRow, ITableStore, TableStore2, ITableStore2, IColumn2, IRow2, ListStore, IListStore, ModalStore, IModalStore, FormItemStore, IFormItemStore, PaginationStore, IPaginationStore, AppStore, IAppStore, StoreNode, IStoreNode };
