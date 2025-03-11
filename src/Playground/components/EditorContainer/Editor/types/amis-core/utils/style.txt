/**
 * 处理样式相关的工具方法，不放 helper 里是为了避免循环依赖
 */
/**
 * 处理配置中的 style，主要做三件事：
 * 1. 变量解析
 * 2. 将 font-size 之类的错误写法转成 fontSize
 * 3. 针对 image 自动加 url
 */
export declare function buildStyle(style: any, data: any): any;
