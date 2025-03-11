export interface SvgIcon {
    name: string;
    id: string;
    svg?: string;
}
export interface SvgIconGroup {
    name: string;
    groupId: string;
    children: SvgIcon[];
}
export declare let svgIcons: SvgIconGroup[];
export declare function mountIconSpriteToDom(sprite: string, nodeId?: string): void;
type refreshIconListFunc = null | (() => any);
export declare let refreshIconList: refreshIconListFunc;
export declare function setRefreshSvgListAction(func: ({ setSvgIconList, mountIconSpriteToDom }: {
    setSvgIconList: (arr: SvgIconGroup[]) => void;
    mountIconSpriteToDom: (str: string) => void;
}) => any): void;
export declare function setSvgIconList(groups: SvgIconGroup[], combine?: boolean, local?: string): void;
export {};
