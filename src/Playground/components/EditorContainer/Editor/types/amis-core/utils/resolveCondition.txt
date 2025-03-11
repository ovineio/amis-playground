export declare function resolveConditionAsync(conditions: any, data: any, defaultResult?: boolean): Promise<boolean>;
export declare function resolveCondition(conditions: any, data: any, defaultResult?: boolean): boolean | Promise<boolean>;
export declare function registerConditionComputer(op: string, func: (left: any, right: any, fieldType?: string) => boolean, fieldType?: string): void;
export declare function getConditionComputers(): {
    [op: string]: (left: any, right: any, fieldType?: string | undefined) => boolean;
};
export declare function setConditionComputeErrorHandler(fn: (conditions: any, data: any, defaultResult: boolean) => boolean | Promise<boolean>): void;
