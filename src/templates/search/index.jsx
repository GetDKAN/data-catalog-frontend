import React, { useState, useEffect, useReducer } from 'react';
import { PageHeader, useLunrSearch, useSearchData, useUrlParams } from '@civicactions/data-catalog-components';
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import SearchContext from './context/SearchContext';
import Layout from '../../components/Layout';
import Wrapper from './Wrapper';
import SearchContent from './components/SearchContent';
import SearchSidebar from './components/SearchSidebar';
import queryString from 'query-string';


import {
  SearchDispatch,
  defaultSearchState,
  searchReducer,
  getLunrSearch,
  fetchSearchData,
  setSearchURLParams,
  buildInitialFacets,
} from '@civicactions/data-catalog-components';

export function normalizeItems(resultItems) {
  return resultItems.map((x) => {
    let item = {};
    item = {
      identifier: x.identifier,
      modified: x.modified,
      description: x.description,
      theme: x.theme,
      format: x.distribution,
      title: x.title,
      ref: `/dataset/${x.identifier}`,
    };
    if (Object.prototype.hasOwnProperty.call(x, 'publisher') && Object.prototype.hasOwnProperty.call(x, 'name')) {
      item.publisher = x.publisher.name;
    } else {
      item.publisher = '';
    }
    return item;
  });
}


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

// function buildInitialFacets(queryParams) {
//   const facetKeys = Object.keys(defaultFacets);
//   const paramFacetArray = Object.entries(queryParams).filter((obj) => {
//     for (let i = 0; i < facetKeys.length; i += 1) {
//       if (facetKeys[i] === obj[0]) {
//         const capitalKey = obj[0].charAt(0).toUpperCase() + obj[0].slice(1);
//         const newFacetArray = obj[1].split(',').map((param) => [capitalKey, param]);
//         return newFacetArray;
//       }
//     }
//     return false;
//   });
//   return paramFacetArray;
// }

const Search = ({ path, location }) => {
  // const initialParams = queryString.parse(location.search);
  // const [hasWindow, setHasWindow] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(initialParams.q ? initialParams.q : '');
  // const [searchSort, setSearchSort] = useState(initialParams.sort ? initialParams.sort : 'alpha');
  // const [searchPage, setSearchPage] = useState(initialParams.page ? initialParams.page : 1);
  // const [searchPageSize, setSearchPageSize] = useState(initialParams.pageSize ? parseInt(initialParams.pageSize) : 10);
  // const [selectedFacets, setSelectedFacets] = useState(initialParams ? buildInitialFacets(initialParams) : []);
  // const searchEngine = useLunrSearch(`${process.env.DYNAMIC_API_URL}/lunr/search-index.json`, defaultFacets)
  // const [loading, items, facetResults, totalResults] = useSearchData(searchEngine, searchPage, searchQuery, searchSort, searchPageSize, selectedFacets)
  // const searchUrl = useUrlParams('/search', defaultFacets, searchPage, searchQuery, searchSort, searchPageSize, selectedFacets);

  // function handleFacetChange(event) {
  //   const facetType = event.target.name;
  //   const facetValue = event.target.value;
  //   const active = event.target.checked;
  //   let updatedFacets = selectedFacets;
  //   if (active === true) {
  //     setSelectedFacets([...updatedFacets, [facetType, facetValue]])
  //   } else {
  //     setSelectedFacets(() => selectedFacets.filter((facet) => (facet[1] !== facetValue)))
  //   }
  //   setSearchPage(1)
  // }

  // useEffect(() => {
  //   if(window !== undefined) {
  //     window.history.pushState({}, 'Search', `${searchUrl}`);
  //   }
  // }, [searchUrl]);

  // useEffect(() => {
  //   if(window !== undefined) {
  //     setHasWindow(true);
  //   }
  // }, []);

  // const searchState = {
  //   facets: {
  //     defaultFacets: defaultFacets,
  //     facetResults: facetResults,
  //     selectedFacets: selectedFacets,
  //   },
  //   handleFacetChange: handleFacetChange,
  //   handleSort: setSearchSort,
  //   handlePageSize: setSearchPageSize,
  //   handlePageChange: setSearchPage,
  //   handleQuery: setSearchQuery,
  //   isLoading: loading,
  //   items: items,
  //   searchParams: {
  //     sort: searchSort,
  //     pageSize: searchPageSize,
  //     page: searchPage,
  //     query: searchQuery,
  //   },
  //   totalResults: totalResults,
  // }
  const [totalFacetsList, setTotalFacetsList] = useState(null);
    const [hasWindow, setHasWindow] = useState(false);

    // Initialize the useReducer hook using the imported searchState and reducer.
    const [searchState, dispatch] = useReducer(
      searchReducer,
      defaultSearchState
    );
    const { loading, items, searchURL } = searchState;

    // This useEffect hook contains only the functions we want to run
    // when the component is mounted. It won't run on subsequent rerenders.
    useEffect(() => {
      // Set initial variables that aren't part of the our imported searchState.
      const initialParams = queryString.parse(location.search);
      if(window !== undefined) {
        setHasWindow(true);
      }
      dispatch({type: 'FETCH_DATA'})
      dispatch(buildInitialFacets(initialParams, defaultFacets))
      async function getSearchEngine() {
        dispatch(await getLunrSearch(`${process.env.DYNAMIC_API_URL}/lunr/search-index.json`, defaultFacets))
      }
      getSearchEngine();
    }, [location]);

    // This useEffect hook will run when the component mounts, but will also run
    // when any of the searchState values change, causing the component to rerender.
    useEffect(() => {
      // Sets loading to true
      dispatch({type: 'FETCH_DATA'});
      // This is needed to get a complete list of facets for the radio buttons.
      // If there are any parameters in the url bar, it would be the complete list,
      // so there is a default set of the searchParams to send to the Lunr endpoint.
      if (totalFacetsList === null && searchState.searchEngine !== null) {
        async function getAllFacets() {
          const fullSearchParams = {
            page: 1,
            pageSize: 20,
            query: '',
            sort: 'alpha',
            selectedFacets: [],
            searchEngine: searchState.searchEngine,
          }
          const results = await fetchSearchData(fullSearchParams);
          await setTotalFacetsList(results.data.facetsResults);
        }
        getAllFacets();
      }
      // This will fire on the initial mounting of the component,
      // but it won't do anything until after the searchEngine is set.
      if(searchState.searchEngine !== null) {
        async function getSearchItems() {
          // Build a small object of just the search parameters.
          // Using searchState as a dependency of this useEffect,
          // will cause an inifite loop.
          const searchParams = {
            sort: searchState.sort,
            page: searchState.page,
            pageSize: searchState.pageSize,
            query: searchState.query,
            selectedFacets: searchState.selectedFacets,
            searchEngine: searchState.searchEngine,
          }
          dispatch(await fetchSearchData(searchParams, normalizeItems));
          // After searching, update url with new parameters.
          dispatch(setSearchURLParams(path, defaultFacets, searchParams))
        }
        getSearchItems();
      }
    }, [
      path,
      totalFacetsList,
      searchState.searchEngine,
      searchState.query,
      searchState.sort,
      searchState.pageSize,
      searchState.page,
      searchState.selectedFacets
    ])

    // This one can probably be grouped in another useEffect hook,
    // but it also made since to just leave it here since it is doing
    // all the manipulation of the browser history.
    useEffect(() => {
      if(window !== undefined && searchURL !== undefined) {
        window.history.pushState({}, 'Search', `${searchURL}`);
      }
    }, [searchURL]);
  
  return (
    <Layout path={path} title="Search">
      <Wrapper className="search-page containter-fluid m-5">
      <SearchDispatch.Provider value={{searchState, dispatch, totalFacetsList, defaultFacets}}>
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
        </SearchDispatch.Provider>
      </Wrapper>
    </Layout>
  );
};

export default Search;
