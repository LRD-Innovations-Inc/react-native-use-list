"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useList = useList;
var _usePagination = require("./usePagination");
var _usePullToRefresh = require("./usePullToRefresh");
function useList() {
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
  const pagination = (0, _usePagination.usePagination)(options);
  const pullToRefresh = (0, _usePullToRefresh.usePullToRefresh)(options);
  return {
    ...pagination,
    ...pullToRefresh
  };
}
//# sourceMappingURL=index.js.map