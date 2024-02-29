/// <reference types="react" />
import type { Options } from './types';
export declare function useList(options?: Options): {
    isRefreshing: boolean;
    refreshController: {
        refreshControl: JSX.Element;
    };
    pageIndex: number;
    sectionItemIndex: number;
    sectionIndex: number;
    isSectionSelected: (section: any) => boolean;
    nextPage: {
        (): void;
        (options: import("./types").ScrollToPageOptions): void;
    };
    prevPage: {
        (): void;
        (options: import("./types").ScrollToPageOptions): void;
    };
    goToPage: {
        (index: number): void;
        (options: import("./types").ScrollToIndexOptions): void;
    };
    indexController: {
        viewabilityConfig: import("react-native").ViewabilityConfig;
        onViewableItemsChanged: ({ viewableItems, }: {
            changed: import("react-native").ViewToken[];
            viewableItems: import("react-native").ViewToken[];
        }) => void;
    };
};
//# sourceMappingURL=index.d.ts.map