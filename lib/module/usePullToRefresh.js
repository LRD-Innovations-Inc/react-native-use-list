import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
export function usePullToRefresh(_ref) {
  let {
    onRefresh,
    debugMode
  } = _ref;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const _onRefresh = useCallback(async () => {
    if (!onRefresh) {
      if (debugMode) console.warn('onRefresh function is missing from the options.');
      return;
    }
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  }, [debugMode, onRefresh]);
  const refreshController = {
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      refreshing: isRefreshing,
      onRefresh: _onRefresh
    })
  };
  return {
    isRefreshing,
    refreshController
  };
}
//# sourceMappingURL=usePullToRefresh.js.map