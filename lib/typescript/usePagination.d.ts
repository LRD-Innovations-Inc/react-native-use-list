import type { Options, ScrollToIndexOptions, ScrollToPageOptions } from './types';
import type { ViewToken } from 'react-native';
import type { ViewabilityConfig } from 'react-native';
export declare function usePagination({ ref, debugMode, loopPages }: Options): {
    pageIndex: number;
    sectionItemIndex: number;
    sectionIndex: number;
    isSectionSelected: (section: any) => boolean;
    nextPage: {
        (): void;
        (options: ScrollToPageOptions): void;
    };
    prevPage: {
        (): void;
        (options: ScrollToPageOptions): void;
    };
    goToPage: {
        (index: number): void;
        (options: ScrollToIndexOptions): void;
    };
    indexController: {
        viewabilityConfig: ViewabilityConfig;
        onViewableItemsChanged: ({ viewableItems, }: {
            changed: ViewToken[];
            viewableItems: ViewToken[];
        }) => void;
    };
};
//# sourceMappingURL=usePagination.d.ts.map