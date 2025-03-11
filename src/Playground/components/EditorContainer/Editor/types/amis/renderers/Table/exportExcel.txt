/**
 * 导出 Excel 功能
 */
import './ColumnToggler';
import type { TableProps, ExportExcelToolbar } from './index';
/**
 * 导出 Excel
 * @param ExcelJS ExcelJS 对象
 * @param props Table 组件的 props
 * @param toolbar 导出 Excel 的 toolbar 配置
 * @param withoutData 如果为 true 就不导出数据，只导出表头
 */
export declare function exportExcel(ExcelJS: any, props: TableProps, toolbar: ExportExcelToolbar, withoutData?: boolean): Promise<void>;
