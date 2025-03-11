import { Enginer } from './tpl';
import { getFilters, registerFilter, registerFunction } from 'amis-formula';
import { prettyBytes } from './prettyBytes';
import { escapeHtml } from './escapeHtml';
import { formatDuration } from './formatDuration';
import { filterDate, parseDuration, relativeValueRe } from './date';
import { pickValues } from './object';
import { isPureVariable } from './isPureVariable';
import { stripNumber } from './stripNumber';
import { tokenize } from './tokenize';
import { resolveVariable } from './resolveVariable';
import { resolveVariableAndFilter } from './resolveVariableAndFilter';
import { resolveVariableAndFilterForAsync } from './resolveVariableAndFilterForAsync';
import { dataMapping, resolveMapping, resolveMappingObject } from './dataMapping';
import './filter';
export { prettyBytes, escapeHtml, formatDuration, filterDate, relativeValueRe, parseDuration, getFilters, registerFilter, registerFunction, pickValues, isPureVariable, stripNumber, tokenize, resolveVariable, resolveVariableAndFilter, resolveVariableAndFilterForAsync, resolveMapping, resolveMappingObject, dataMapping };
export declare function register(): Enginer & {
    name: string;
};
