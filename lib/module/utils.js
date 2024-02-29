export function isVirtualizedList(x) {
  return x.current && 'getItemCount' in x.current.props;
}
export function isSectionList(x) {
  return x.current && 'sections' in x.current.props;
}
//# sourceMappingURL=utils.js.map