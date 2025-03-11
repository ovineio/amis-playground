import React from 'react';
import { IStatusStore } from './store/status';
export interface StatusScopedProps {
    statusStore: IStatusStore;
}
export interface StatusScopedWrapperProps {
    children: (props: {
        statusStore: IStatusStore;
    }) => JSX.Element;
}
export declare function StatusScopedWrapper({ children }: StatusScopedWrapperProps): JSX.Element;
export declare function StatusScoped<T extends React.ComponentType<React.ComponentProps<T> & StatusScopedProps>>(ComposedComponent: T): (props: JSX.LibraryManagedAttributes<T, Omit<React.ComponentProps<T>, keyof StatusScopedProps>> & {}, ref: any) => React.JSX.Element;
