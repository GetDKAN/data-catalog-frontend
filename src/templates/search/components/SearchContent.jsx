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

const SearchContentArea = () => {
  const {
    facets,
    isLoading,
    items,
    totalResults,
    handlePageChange,
    handlePageSize,
    handleQuery,
    searchParams,
  } = useContext(SearchContext);
  const facetTypes = useFacetTypes(facets.defaultFacets);
  return(
    <div className="results-list col-md-8 col-sm-12 p-5">
      {!isLoading &&
        <>
          <SearchInput
            onChangeFunction={(event) => handleQuery(event.target.value)}
            onResetFunction={() => handleQuery('')}
            showSubmit={false}
            value={searchParams.query}
            resetContent={'Clear text'}
          />
          <SearchResultsMessage
            facetTypes={facetTypes}
            searchTerm={searchParams.query}
            selectedFacets={facets.selectedFacets}
            total={totalResults}
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
              total={totalResults}
              pageSize={searchParams.pageSize}
              currentPage={parseInt(searchParams.page)}
            />
            <SearchPageSizer
              currentValue={parseInt(searchParams.pageSize)}
              resizeFunc={(event) => handlePageSize(event.target.value)}
            /> 
            <Pagination
              hideDisabled
              activePage={searchParams.page}
              itemsCountPerPage={searchParams.pageSize}
              totalItemsCount={totalResults}
              pageRangeDisplayed={5}
              onChange={(event) => handlePageChange(parseInt(event))}
            />
          </StyledPagination>
        </>
      }
    </div>
  );
}

export default SearchContentArea;
