import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";
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
  // const {
  //   facets,
  //   handleFacetChange,
  //   handleSort,
  //   isLoading,
  //   searchParams
  // } = useContext(SearchContext)
  return (
    <div className="search-sidebar col-md-4 col-sm-12 p-5">
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
        <SearchFacetBlocks
          facets={defaultFacets}
          facetChangeFunc={e =>
            dispatch(setSelectedFacets(e.target, searchState.selectedFacets))
          }
        />
        {/* } */}
      </div>
    </div>
  );
};

export default SearchSidebar;
