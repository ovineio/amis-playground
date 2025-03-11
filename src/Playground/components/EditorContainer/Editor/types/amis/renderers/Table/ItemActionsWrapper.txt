import React from 'react';
import { ITableStore } from 'amis-core';
import { ClassNamesFn } from 'amis-core';
export interface ItemActionsProps {
    classnames: ClassNamesFn;
    children: React.ReactNode | Array<React.ReactNode>;
    store: ITableStore;
}
declare function ItemActionsWrapper(props: ItemActionsProps): React.JSX.Element;
declare const _default: typeof ItemActionsWrapper;
export default _default;
