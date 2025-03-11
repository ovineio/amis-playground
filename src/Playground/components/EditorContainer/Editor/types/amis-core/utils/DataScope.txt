import { JSONSchema } from '../types';
export declare const DATASCHEMA_TYPE_MAP: {
    [type: string]: string;
};
export declare class DataScope {
    parent?: DataScope;
    readonly children: Array<DataScope>;
    readonly id: string;
    ref?: string;
    name?: string;
    tag?: string;
    group?: string;
    description?: string;
    readonly schemas: Array<JSONSchema>;
    constructor(schemas: JSONSchema | Array<JSONSchema>, id: string);
    addChild(id: string, schema?: JSONSchema | Array<JSONSchema>): DataScope;
    removeChild(idOrScope: string | DataScope): void;
    setSchemas(schemas: Array<JSONSchema>): this;
    addSchema(schema: JSONSchema): this;
    removeSchema(id: string): this;
    contains(scope: DataScope): boolean;
    assignSchema(target: any, schema: any): any;
    getMergedSchema(): any;
    protected buildOptions(options: Array<any>, schema: JSONSchema, path?: {
        label: string;
        value: string;
    }, key?: string, isMember?: boolean): void;
    getDataPropsAsOptions(): any;
    getSchemaByPath(path: string): JSONSchema | null;
    getSchemaById(id: string): JSONSchema | undefined;
}
