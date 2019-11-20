import React, { useEffect, useState } from 'react';
import { Select, FormLabel } from "@cmsgov/design-system-core";
import { withSearch, SearchInput, PageHeader, SearchList, SearchListItem, Pagination } from '@civicactions/data-catalog-components';
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import Layout from "../../../components/Layout";
import Wrapper from "../Wrapper";
import StyledPagination from "../../../theme/pagination.js"
import StyledResultsMessage from './StyledResultsMessage';
import StyledSearchList from './StyledSearchList';
import FacetBlocks from '../../../components/FacetList/FacetBlocks';

const DatasetSearch = ({
  path,
  facets,
  items,
  location,
  searchParams,
  searchFunctions,
  searchLink,
  facetsResults,
  selectedFacets,
  total,
  options,
  totalFacets
}) => {
  const [hasWindow, checkForWindow] = useState(false);
  const [show, toggleShow] = useState(true);
  useEffect(() => {
    if(window !== undefined) {
      checkForWindow(true);
    }
    if(items !== undefined) {
      toggleShow(false);
    }
  }, [items]);

  let facetTypes = [];
  for(let facet in facets) {
    facetTypes.push(facet);
  }

  return (
    <Layout path={path} title="Search">
      <Wrapper className="search-page containter-fluid m-5">
        <div className="row">
          <PageHeader title="Datasets" />
        </div>
        <div className="row">
          <div className="results-list col-md-8 col-sm-12 p-5">
            <SearchInput
              placeholder="Type your search term here..."
              showSubmit={false}
              srOnly={true}
              value={searchParams.q}
              onChangeFunction={(event) => searchFunctions.termChange(event)}
              onResetFunction={(event) => searchFunctions.termChange(event, true)}
            />
            {hasWindow &&
              <Loader hideContentOnLoad backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                {/* <SearchList items={items} message={message} /> */}
                {items &&
                  <StyledPagination className="pagination-container">
                  <StyledSearchList message={
                    <StyledResultsMessage
                      searchTerm={searchParams.q}
                      total={total}
                      selectedFacets={selectedFacets}
                      facetTypes={facetTypes}
                      facetLimit={100}
                      facetDelimiter={', '}
                      facetSeparator={' & '}
                    />
                  }>
                    {items.map((item, index) => {
                      return(
                        <SearchListItem
                          item={item}
                          key={`${item.modified}-${index}`}
                          location={location}
                          title={item.title}
                          url={item.ref}
                          theme={item.theme}
                          description={item.description}
                          modifiedDate={item.modified}
                          downloadTitle={'Download CSV'}
                          // downloadURL={item.format ? item.format[0].downloadURL : null}
                          // downloadIcon={<FAPIcon icon="arrow-to-bottom"/>}
                          searchTerm={searchParams.q}
                          searchLink={searchLink}
                        />
                      )
                    })}
                  </StyledSearchList>
                    {/* {this.currentPageResults()} */}
                    {/* <Select
                      aria-label="Results per page"
                      defaultValue={"10"}
                      size="medium"
                      name="results_per_page"
                      onChange={searchFunctions.pageSizeChange}
                    >
                      {[5,10,15,20,25,30,35,40,45,50].map(el => (
                        <option key={el} value={el}>{`${el} per page`}</option>
                      ))
                      }
                    </Select>
                    <Pagination
                      hideDisabled
                      activePage={parseInt(searchParams.page)}
                      itemsCountPerPage={parseInt(searchParams.pageSize)}
                      totalItemsCount={total}
                      pageRangeDisplayed={'5'}
                      onChange={searchFunctions.pageChange}
                    /> */}
                  </StyledPagination>
                }
              </Loader>
            }
          </div>
          <div className="search-sidebar col-md-4 col-sm-12 p-5">
            <div className="search-sidebar-options ds-u-radius">
              <FormLabel className="search-sidebar-label" for="search_sort_change">Sort by</FormLabel>
              <Select
                aria-label="Search Sort Change"
                defaultValue="1"
                name="search_sort_change"
                className="form-control input-sm"
                onChange={searchFunctions.sort}
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="alpha">Alphabetical</option>
              </Select>
            </div>
            <div className="search-sidebar-options ds-u-radius">
              {items &&
                <FacetBlocks
                  facetTypes={facetTypes}
                  facets={facets}
                  searchFunctions={searchFunctions}
                  searchParams={searchParams}
                  total={total}
                  selectedFacets={selectedFacets}
                  totalFacets={totalFacets}
                />
              }
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default withSearch(DatasetSearch, `${process.env.DYNAMIC_API_URL}/lunr/search-index.json`);
