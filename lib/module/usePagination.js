/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useRef, useState } from 'react';
import { isSectionList, isVirtualizedList } from './utils';
const SCROLL_DURATION = 1000 * 0.8;
function getDataCountFromRef(ref) {
  var _props$getItemCount, _props, _ref$current$props$da;
  if (!ref.current) return 0;
  if (isVirtualizedList(ref)) return ((_props$getItemCount = (_props = ref.current.props).getItemCount) === null || _props$getItemCount === void 0 ? void 0 : _props$getItemCount.call(_props, null)) || 0;
  if (isSectionList(ref)) return ref.current.props.sections.reduce((count, item) => count + item.data.length, 0);
  return ((_ref$current$props$da = ref.current.props.data) === null || _ref$current$props$da === void 0 ? void 0 : _ref$current$props$da.length) || 0;
}
export function usePagination(_ref) {
  var _ref$current, _ref$current$props;
  let {
    ref,
    debugMode,
    loopPages
  } = _ref;
  const [pageIndex, setPageIndex] = useState(0);
  const [sectionItemIndex, setSectionItemIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  const isScrollFromPaging = useRef(false);
  const scrollFromPagingTimeout = useRef();
  function scrollToIndex(params) {
    if (!(ref !== null && ref !== void 0 && ref.current)) return console.warn('Pagination does not work without a ref to the list.');
    const dataCount = getDataCountFromRef(ref);
    if (debugMode && dataCount === 0) return console.warn('Pagination does not work on empty lists.');
    let index;
    if (typeof params === 'number') index = params;else index = params.index;
    if (index < 0 || index >= dataCount) {
      if (loopPages) {
        index = (index + dataCount) % dataCount; // loop around
      } else {
        if (debugMode) console.warn(`Page: ${index} is outside bounderies of 0 - ${dataCount}.`);
        return;
      }
    }
    isScrollFromPaging.current = true;
    if ('scrollToIndex' in ref.current) {
      setPageIndex(index);
      if (typeof params === 'number') ref.current.scrollToIndex({
        index
      });else ref.current.scrollToIndex({
        index,
        animated: params.animated,
        viewPosition: params.align
      });
    } else if ('scrollToLocation' in ref.current) {
      setPageIndex(index);
      let _index = index;
      let sectionIndex = 0;
      let itemIndex = 0;
      while (_index > 0) {
        var _ref$current$props$se;
        itemIndex++;
        const sectionICount = ((_ref$current$props$se = ref.current.props.sections[sectionIndex]) === null || _ref$current$props$se === void 0 ? void 0 : _ref$current$props$se.data.length) || 0;
        if (itemIndex >= sectionICount) {
          sectionIndex++;
          itemIndex = 0;
        }
        _index--;
      }
      ref.current.scrollToLocation({
        itemIndex,
        sectionIndex
      });
      setSectionItemIndex(itemIndex);
      setSectionIndex(sectionIndex);
    }
    if (scrollFromPagingTimeout.current) clearTimeout(scrollFromPagingTimeout.current);
    scrollFromPagingTimeout.current = setTimeout(() => {
      isScrollFromPaging.current = false;
    }, SCROLL_DURATION);
  }
  function nextPage(options) {
    scrollToIndex({
      index: pageIndex + 1,
      ...options
    });
  }
  function prevPage(options) {
    scrollToIndex({
      index: pageIndex - 1,
      ...options
    });
  }
  const isSectionSelected = useCallback(section => {
    if (!(ref !== null && ref !== void 0 && ref.current)) return false;
    if (!('sections' in ref.current.props)) return false;
    return ref.current.props.sections.indexOf(section) === sectionIndex;
  }, [ref, sectionIndex]);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true
  }).current;
  const onViewableItemsChanged = useCallback(_ref2 => {
    let {
      viewableItems
    } = _ref2;
    const item = viewableItems[0];
    if (!item || item.index === null) return;
    if (isScrollFromPaging.current) return;
    if ('section' in item && ref !== null && ref !== void 0 && ref.current && 'sections' in ref.current.props) {
      const sectionIndex = ref.current.props.sections.indexOf(item.section);
      setSectionItemIndex(item.index);
      setSectionIndex(sectionIndex);
      let count = 0;
      for (let i = 0; i < sectionIndex; i++) {
        var _ref$current$props$se2;
        count += ((_ref$current$props$se2 = ref.current.props.sections[i]) === null || _ref$current$props$se2 === void 0 ? void 0 : _ref$current$props$se2.data.length) || 0;
      }
      setPageIndex(count + item.index);
    } else {
      setPageIndex(item.index);
    }
  }, [ref]);
  const indexController = useRef({
    viewabilityConfig,
    onViewableItemsChanged
  }).current;
  if ((ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$props = _ref$current.props) === null || _ref$current$props === void 0 ? void 0 : _ref$current$props.numColumns) > 1) {
    console.warn('Pagination does not work for multiple columns');
  }
  return {
    pageIndex,
    sectionItemIndex,
    sectionIndex,
    isSectionSelected,
    nextPage,
    prevPage,
    goToPage: scrollToIndex,
    indexController
  };
}
//# sourceMappingURL=usePagination.js.map