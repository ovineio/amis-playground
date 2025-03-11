/// <reference types="react" />
export declare function uncontrollable<T extends React.ComponentType<any>, P extends {
    [propName: string]: any;
}>(arg: T, config: P, mapping?: Array<string>): T;
