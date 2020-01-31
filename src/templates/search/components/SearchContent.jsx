import React, { useContext } from 'react';
import Loader from 'react-loader-advanced';
import LoadingSpin from 'react-loading-spin';
import {
  SearchResultsMessage,
  SearchListItem,
  SearchInput,
  SearchPaginationResults,
  SearchPageSizer,
  SearchDispatch
} from '@civicactions/data-catalog-components';
import Pagination from 'react-js-pagination';
import StyledPagination from '../../../theme/pagination';

const SearchContentArea = () => {
  const { searchState, dispatch, defaultFacets } = useContext(SearchDispatch);
  const { items, fulltext, totalItems, selectedFacets, loading } = searchState;
  const facetTypes = Object.keys(defaultFacets)

  return (
    <div className="results-list col-md-8 col-sm-12 p-5">
      {items
      && (
        <div>
          <SearchInput
            placeholder="Type your search term here"
            showSubmit={false}
            srOnly={true}
            value={fulltext}
            onChangeFunction={dispatch}
            onResetFunction={() => dispatch({type: 'RESET_FULLTEXT'})}
            resetContent={"Clear text"}
          />
          <SearchResultsMessage
            searchTerm={fulltext}
            total={parseInt(totalItems, 10)}
            selectedFacets={selectedFacets}
            facetTypes={facetTypes}
            defaultFacets={defaultFacets}
            facetLimit={100}
            facetDelimiter={', '}
            facetSeparator={' & '}
          />
          <Loader
            hideContentOnLoad
            backgroundStyle={{ backgroundColor: '#f9fafb' }}
            foregroundStyle={{ backgroundColor: '#f9fafb' }}
            show={loading}
            message={<LoadingSpin width="3px" primaryColor="#007BBC" />}
          >
            <ol>
              {items.map(item => (
                <SearchListItem key={item.identifier} item={item} />
              ))}
            </ol>
          </Loader>
          
          <StyledPagination className="pagination-container">
            <SearchPaginationResults
              total={totalItems}
              pageSize={searchState.pageSize}
              currentPage={parseInt(searchState.page)}
            />
            <SearchPageSizer
              currentValue={parseInt(searchState.pageSize)}
              resizeFunc={e =>
                dispatch({
                  type: "UPDATE_PAGE_SIZE",
                  data: { pageSize: e.target.value }
                })
              }
            />
            <Pagination
              hideDisabled
              activePage={searchState.page}
              itemsCountPerPage={searchState.pageSize}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              onChange={event =>
                dispatch({ type: "UPDATE_CURRENT_PAGE", data: { page: event } })
              }
            />
          </StyledPagination>
        </div>
      )}
    </div>
  );
};

export default SearchContentArea;
