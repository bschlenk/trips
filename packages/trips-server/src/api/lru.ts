import * as LRU from 'lru-cache';

export function lruCacheDecorator(options: LRU.Options | number) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const { value } = descriptor;
    if (typeof value !== 'function') {
      throw new Error('lruCache expected to decorate a function');
    }

    const fn: (...args: any[]) => any = value;

    const wrapped = lruCache(options, fn);

    descriptor.value = wrapped;
    return descriptor;
  };
}

export type Func = (...args: any[]) => any;

export function lruCache<T extends Func>(
  opts: LRU.Options | number,
  func: T,
): T {

  const cache = new LRU(opts as LRU.Options);

  const wrapped = (...args: any[]): any => {
    const existing = cache.get(args);
    if (existing !== undefined) {
      return existing;
    }
    const result = func(...args);
    cache.set(args, result);
    return result;
  };

  return wrapped as T;
}
