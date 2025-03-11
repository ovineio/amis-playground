/**
 * @description 缓存值的单元
 */
export type CacheEntry<V> = {
    value: V;
    visitCount: number;
};
/**
 * 自动清理访问次数最少key的Map，次数相同时优先淘汰旧项
 * 每次触发清理的计数基于容量的百分比
 * @class VisitedCache
 * @template K - 缓存key的类型
 * @template V - 缓存value的类型
 */
export default class VisitedCache<K, V> {
    private capacity;
    private cache;
    private visitCountOrder;
    private keyOrderMatrixForByCount;
    private releaseCount;
    /**
     *
     * @param capacity 容量
     * @param releasePercent 清理数量占容量百分比
     */
    constructor(capacity: number, releasePercent?: number);
    /**
     * 更新现存项目的缓存顺序
     * @param key
     * @param entry
     */
    private updateCacheEntryOrder;
    /**
     *
     * @param {K} key
     * @returns {(V | undefined)}
     */
    get(key: K): V | undefined;
    /**
     *
     * @param {K} key
     * @param {V} value
     */
    set(key: K, value: V): void;
    has(key: K): boolean;
}
