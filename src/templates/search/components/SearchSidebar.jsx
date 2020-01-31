import React, { useContext } from "react";
import { Label, Input } from 'reactstrap';

import { SearchFacets, SearchDispatch } from "@civicactions/data-catalog-components";
import { sortOptions } from '../../../config/search';

const SearchSidebar = () => {
  const {
    searchState, dispatch, defaultFacets
  } = useContext(SearchDispatch);
  const {
    facetsResults, selectedFacets, totalItems, fulltext
  } = searchState;
  return (
    <div className="search-sidebar col-md-4 col-sm-12 p-5">
      <div className="search-sidebar-options ds-u-radius">
        <Label for="search-list-sort">Sort by:</Label>
        <Input
          type="select"
          name="search-list-sort"
          id="search-list-sort"
          onChange={(e) => {dispatch({type: 'UPDATE_SORT', data: {sort: e.target.value}});}}
        >
          {sortOptions.map((sortOpt) => (
            <option
              key={sortOpt.field}
              value={sortOpt.field}
            >
              {sortOpt.label}
            </option>
          ))}
        </Input>
      </div>
      <div className="search-sidebar-options ds-u-radius">
        {facetsResults && facetsResults.length
          && (
            <SearchFacets
              defaultFacets={defaultFacets}
              toggleClasses="ds-c-label"
              facetsResults={facetsResults}
              selectedFacets={selectedFacets}
              dispatch={dispatch}
              totalItems={totalItems}
              fulltext={fulltext}
            />
          )}
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
