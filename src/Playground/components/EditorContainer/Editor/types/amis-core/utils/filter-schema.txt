import { PlainObject } from '../types';
import type { ClassValue } from '../theme';
/**
 * 计算下发给子组件的className，处理对象类型的className，将其中的表达式计算出来，避免被classnames识别为true
 *
 * @param value - CSS类名值
 * @param ctx - 数据域
 */
export declare function filterClassNameObject(classValue: ClassValue, ctx?: Record<string, any>): ClassValue;
/**
 * 处理 Props 数据，所有带 On 结束的做一次
 *
 * xxxOn
 * xxxExpr
 *
 *
 * @param schema
 * @param data
 */
export declare function getExprProperties(schema: PlainObject, data?: object, ignoreList?: Array<string>, props?: any): PlainObject;
export declare function hasExprPropertiesChanged(schema: PlainObject, prevSchema: PlainObject): boolean;
export default getExprProperties;
