import React, { useContext } from "react";
import {
  SearchSort,
  SearchFacetBlocks
} from "@civicactions/data-catalog-components";

import {
  SearchDispatch,
  defaultSearchState,
  searchReducer,
  getLunrSearch,
  fetchSearchData,
  setSearchURLParams,
  buildInitialFacets,
  setSelectedFacets,
  resetSelectedFacets,
  filterFacets
} from "@civicactions/data-catalog-components";

const SearchSidebar = () => {
  const { searchState, dispatch, totalFacetsList, defaultFacets } = useContext(
    SearchDispatch
  );

  return (
    <div className="search-sidebar col-md-4 col-sm-12">
      <div className="search-sidebar-options ds-u-radius">
        <SearchSort
          sortFunc={e =>
            dispatch({ type: "UPDATE_SORT", data: { sort: e.target.value } })
          }
          currentValue={searchState.sort}
        />
      </div>
      <div className="search-sidebar-options ds-u-radius">
        {/* {!isLoading && */}

        {/* } */}
      </div>
    </div>
  );
};

export default SearchSidebar;

/*
<SearchFacetBlocks
          facets={defaultFacets}
          facetChangeFunc={e =>
            dispatch(setSelectedFacets(e.target, searchState.selectedFacets))
          }
        />
*/
