type Fn = Function;
export declare function bind(fn: Fn, thisArg: any): Fn;
export declare function autobindMethod(target: Object, key: string, { value: fn, configurable, enumerable }: TypedPropertyDescriptor<Fn>): {
    configurable: boolean | undefined;
    enumerable: boolean | undefined;
    get(): any;
    set: (this: any, newValue: any) => any;
};
export {};
