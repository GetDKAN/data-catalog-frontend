import React, { useContext } from 'react';
import {
  SearchResultsMessage,
  SearchListItem,
  SearchInput,
  SearchPaginationResults,
  SearchPageSizer,
  useFacetTypes,
 } from '@civicactions/data-catalog-components';
import Pagination from "react-js-pagination";
import SearchContext from '../context/SearchContext';
import StyledPagination from '../../../theme/pagination';

import {
  SearchDispatch,
  defaultSearchState,
  searchReducer,
  getLunrSearch,
  fetchSearchData,
  setSearchURLParams,
  buildInitialFacets,
} from '@civicactions/data-catalog-components';

const SearchContentArea = () => {
  const {searchState, dispatch, defaultFacets} = useContext(SearchDispatch)
  const { items, query, totalItems, selectedFacets } = searchState;
  const facetTypes = useFacetTypes(defaultFacets);
  return(
    <div className="results-list col-md-8 col-sm-12 p-5">
      {/* {!isLoading && */}
        <>
          <SearchInput
            onChangeFunction={((e) => dispatch({type: 'UPDATE_QUERY', data: {query: e.target.value}}))}
            onResetFunction={() => dispatch({type: 'RESET_QUERY'})}
            showSubmit={false}
            value={query}
            resetContent={'Clear text'}
          />
          <SearchResultsMessage
            facetTypes={facetTypes}
            searchTerm={query}
            selectedFacets={selectedFacets}
            total={totalItems}
          />
          <ol>
            {items.map((item) => (
              <SearchListItem
                key={item.identifier}
                item={item}
              />
            ))}
          </ol>
          <StyledPagination className="pagination-container">
            <SearchPaginationResults
              total={totalItems}
              pageSize={searchState.pageSize}
              currentPage={parseInt(searchState.page)}
            />
            <SearchPageSizer
              currentValue={parseInt(searchState.pageSize)}
              resizeFunc={(e) => dispatch({type: "UPDATE_PAGE_SIZE", data: {pageSize: e.target.value}})}
            /> 
            <Pagination
              hideDisabled
              activePage={searchState.page}
              itemsCountPerPage={searchState.pageSize}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              onChange={(event) => (dispatch({type: 'UPDATE_CURRENT_PAGE', data: {page: event}}))}
            />
          </StyledPagination>
        </>
      {/* } */}
    </div>
  );
}

export default SearchContentArea;
