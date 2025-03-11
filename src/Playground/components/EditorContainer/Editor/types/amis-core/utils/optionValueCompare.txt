import { OptionValue, Option } from '../types';
export declare function getOptionValue(value: OptionValue, valueField?: string): any;
export declare function getOptionValueBindField(valueField?: string): (value: OptionValue) => any;
export declare function matchOptionValue(a: OptionValue, b: Option, valueField?: string): boolean;
export declare function optionValueCompare(a: OptionValue, valueField?: string): (b: Option) => boolean;
