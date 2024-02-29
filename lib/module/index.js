import { usePagination } from './usePagination';
import { usePullToRefresh } from './usePullToRefresh';
export function useList() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const defaultOptions = {
    ref: null,
    loopPages: false,
    debugMode: false,
    onRefresh: undefined
  };
  options = Object.assign({
    ...defaultOptions
  }, options);
  const pagination = usePagination(options);
  const pullToRefresh = usePullToRefresh(options);
  return {
    ...pagination,
    ...pullToRefresh
  };
}
//# sourceMappingURL=index.js.map