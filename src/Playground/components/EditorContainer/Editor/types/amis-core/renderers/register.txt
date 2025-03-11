/**
 * 提供两种特殊的注册渲染器的方式
 * 1、自动加载预先注册的自定义渲染器：自动加载并注册 window.AmisCustomRenderers 中的渲染器
 * 2、通过 postMessage 告知 amis 注册一个新的渲染器：间接注册渲染器，无需直接依赖 amis。
 */
export declare function autoPreRegisterAmisCustomRenderers(): void;
