import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import { SearchSort, SearchFacetBlocks } from '@civicactions/data-catalog-components';

const SearchSidebar = () => {
  const {
    facets,
    handleFacetChange,
    handleSort,
    isLoading,
    searchParams
  } = useContext(SearchContext)
  return(
    <div className="search-sidebar col-md-4 col-sm-12 p-5">
      <div className="search-sidebar-options ds-u-radius">
        <SearchSort
          sortFunc={(event) => handleSort(event.target.value)}
          currentValue={searchParams.sort}
        />
      </div>
      <div className="search-sidebar-options ds-u-radius">
        {!isLoading &&
          <SearchFacetBlocks
            facets={facets}
            facetChangeFunc={(event) => handleFacetChange(event)}
          />
        }
      </div>
    </div>
  );
}

export default SearchSidebar;
