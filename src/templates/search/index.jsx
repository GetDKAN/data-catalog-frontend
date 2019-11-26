import React, { useState, useEffect } from 'react';
import { PageHeader, useLunrSearch, useSearchData, useUrlParams } from '@civicactions/data-catalog-components';
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import SearchContext from './context/SearchContext';
import Layout from '../../components/Layout';
import Wrapper from './Wrapper';
import SearchContent from './components/SearchContent';
import SearchSidebar from './components/SearchSidebar';
import queryString from 'query-string';

const defaultFacets = {
  "Topics": {
    "label": "Topics",
    "field": "theme.0.title",
    "showAll": false
  },
  "Tags": {
    "label": "Tags",
    "field": "keyword.*.title",
    "showAll": false
  }
};

function buildInitialFacets(queryParams) {
  const facetKeys = Object.keys(defaultFacets);
  const paramFacetArray = Object.entries(queryParams).filter((obj) => {
    for (let i = 0; i < facetKeys.length; i += 1) {
      if (facetKeys[i] === obj[0]) {
        const capitalKey = obj[0].charAt(0).toUpperCase() + obj[0].slice(1);
        const newFacetArray = obj[1].split(',').map((param) => [capitalKey, param]);
        return newFacetArray;
      }
    }
    return false;
  });
  return paramFacetArray;
}

const Search = ({ path, location }) => {
  const initialParams = queryString.parse(location.search);
  const [hasWindow, setHasWindow] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialParams.q ? initialParams.q : '');
  const [searchSort, setSearchSort] = useState(initialParams.sort ? initialParams.sort : 'alpha');
  const [searchPage, setSearchPage] = useState(initialParams.page ? initialParams.page : 1);
  const [searchPageSize, setSearchPageSize] = useState(initialParams.pageSize ? parseInt(initialParams.pageSize) : 10);
  const [selectedFacets, setSelectedFacets] = useState(initialParams ? buildInitialFacets(initialParams) : []);
  const searchEngine = useLunrSearch(`${process.env.DYNAMIC_API_URL}/lunr/search-index.json`, defaultFacets)
  const [loading, items, facetResults, totalResults] = useSearchData(searchEngine, searchPage, searchQuery, searchSort, searchPageSize, selectedFacets)
  const searchUrl = useUrlParams('/search', defaultFacets, searchPage, searchQuery, searchSort, searchPageSize, selectedFacets);

  function handleFacetChange(event) {
    const facetType = event.target.name;
    const facetValue = event.target.value;
    const active = event.target.checked;
    let updatedFacets = selectedFacets;
    if (active === true) {
      setSelectedFacets([...updatedFacets, [facetType, facetValue]])
    } else {
      setSelectedFacets(() => selectedFacets.filter((facet) => (facet[1] !== facetValue)))
    }
    setSearchPage(1)
  }

  useEffect(() => {
    if(window !== undefined) {
      window.history.pushState({}, 'Search', `${searchUrl}`);
    }
  }, [searchUrl]);

  useEffect(() => {
    if(window !== undefined) {
      setHasWindow(true);
    }
  }, []);

  const searchState = {
    facets: {
      defaultFacets: defaultFacets,
      facetResults: facetResults,
      selectedFacets: selectedFacets,
    },
    handleFacetChange: handleFacetChange,
    handleSort: setSearchSort,
    handlePageSize: setSearchPageSize,
    handlePageChange: setSearchPage,
    handleQuery: setSearchQuery,
    isLoading: loading,
    items: items,
    searchParams: {
      sort: searchSort,
      pageSize: searchPageSize,
      page: searchPage,
      query: searchQuery,
    },
    totalResults: totalResults,
  }
  
  return (
    <Layout path={path} title="Search">
      <Wrapper className="search-page containter-fluid m-5">
      <SearchContext.Provider value={searchState}>
        <div className="row">
          <PageHeader title="Datasets" />
        </div>
        {hasWindow
          && (
            <Loader
              hideContentOnLoad
              backgroundStyle={{backgroundColor: "#f9fafb"}}
              foregroundStyle={{backgroundColor: "#f9fafb"}}
              show={loading}
              message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}
            >
              {items &&
                <div className="row">
                  <SearchContent />
                  <SearchSidebar />
                </div>
              }
            </Loader>
          )
        }
        </SearchContext.Provider>
      </Wrapper>
    </Layout>
  );
};

export default Search;
