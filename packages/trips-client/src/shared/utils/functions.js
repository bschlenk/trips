export function noop() {}

export function callEach(...fns) {
  return function(...args) {
    fns.forEach((fn) => {
      if (fn) {
        fn(...args);
      }
    });
  };
}
