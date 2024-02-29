"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSectionList = isSectionList;
exports.isVirtualizedList = isVirtualizedList;
function isVirtualizedList(x) {
  return x.current && 'getItemCount' in x.current.props;
}
function isSectionList(x) {
  return x.current && 'sections' in x.current.props;
}
//# sourceMappingURL=utils.js.map