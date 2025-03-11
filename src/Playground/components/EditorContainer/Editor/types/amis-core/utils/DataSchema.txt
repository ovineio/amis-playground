import { JSONSchema } from '../types';
import { DataScope } from './DataScope';
/**
 * 用来定义数据本身的数据结构，比如有类型是什么，有哪些属性。
 */
export declare class DataSchema {
    readonly root: DataScope;
    readonly idMap: {
        [propName: string]: DataScope;
    };
    current: DataScope;
    constructor(schema: JSONSchema | Array<JSONSchema>);
    setSchema(schemas: Array<JSONSchema>): this;
    addSchema(schema: JSONSchema): this;
    removeSchema(id: string): this;
    getSchemas(): JSONSchema[];
    addScope(schema?: JSONSchema | Array<JSONSchema>, id?: string): this;
    removeScope(idOrScope: string | DataScope): this;
    hasScope(idOrScope: string | DataScope): idOrScope is string | DataScope;
    getScope(idOrScope: string | DataScope): DataScope;
    switchToRoot(): this;
    switchTo(idOrScope: string | DataScope): this;
    pushVariable(current: DataScope, variables: any[]): void;
    getDataPropsAsOptions(): any[];
    getSchemaByPath(path: string): JSONSchema | null;
}
