import NodeCache from "node-cache";

class CacheService {
  private cache: NodeCache;

  constructor(ttlSeconds = 300) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds / 2 });
  }

  /**
   * Store data in cache
   * @param key Cache key
   * @param value Data to store
   * @param ttl (optional) Time-to-live in seconds
   */
  public set<T>(key: string, value: T, ttl: number = 300): void {
    this.cache.set(key, value, ttl);
  }

  /**
   * Retrieve data from cache
   * @param key Cache key
   * @returns Cached data or `undefined` if not found
   */
  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  /**
   * Delete an item from cache
   * @param key Cache key
   */
  public del(key: string): void {
    this.cache.del(key);
  }

  /**
   * Flush all cache data
   */
  public flush(): void {
    this.cache.flushAll();
  }

  /**
   * Check if a key exists in cache
   * @param key Cache key
   * @returns `true` if key exists, `false` otherwise
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }
}

// Export a singleton instance for global use
const cacheService = new CacheService();
export default cacheService;
